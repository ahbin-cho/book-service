# 알라딘 API 연동 설계 (감정 기반 책 추천)

작성일: 2026-07-08

## 1. 목표

감정 선택 시 지금은 `lib/matching.ts`의 하드코딩된 더미 책 목록을 보여준다.
이를 **알라딘 상품 검색 API**로 실제 책 데이터(표지·가격·평점·구매 링크)로 대체하되,
방문할 때마다 **다양한 책**이 나오도록 하고, API 키가 없거나 실패해도 **더미로 자동 폴백**한다.

핵심 흐름:

```
감정 선택
  → 감정별 키워드 풀에서 랜덤 선택
  → 서버(Route Handler)가 알라딘 검색 API 호출 (넉넉히 20~30권)
  → ISBN 기준 중복 제거 + 셔플
  → 상위 N권을 앱 데이터 형식으로 변환해 반환
  → 실패/키 없음/결과 0건이면 기존 더미 목록 반환
```

## 2. 아키텍처

알라딘 TTBKey는 노출되면 안 되므로 **클라이언트가 아니라 서버에서** 호출한다.
Next.js App Router의 Route Handler를 사용한다.

```
.env.local
  ALADIN_TTB_KEY=ttbxxxxxxxxx001         # 서버 전용, 절대 클라이언트 노출 금지

app/api/books/route.ts                    # 서버: 알라딘 호출 + 변환 + 폴백
lib/aladin.ts                             # 알라딘 호출/응답 변환 순수 로직
lib/emotionKeywords.ts                    # 감정 → 키워드 풀 매핑
lib/matching.ts                           # (기존) 더미 데이터 = 폴백 소스
components/BookRecommender.tsx (client)   # fetch('/api/books?emotion=...') 로 변경
components/BookCard.tsx                    # 실제 표지 이미지 표시 추가
```

데이터 흐름:

```
BookRecommender (client)
   │  fetch(`/api/books?emotion=${emotion}`)
   ▼
app/api/books/route.ts (server)
   │  getKeywordPool(emotion) → 랜덤 키워드
   │  searchAladin(keyword) ── 성공 ──▶ 변환·dedupe·shuffle·slice ─▶ Book[]
   │            └─ 실패/0건/키없음 ─▶ getRecommendedBooks(emotion) (더미)
   ▼
JSON: { source: 'aladin' | 'fallback', books: Book[] }
```

## 3. 데이터 모델

앱 내부 통일 타입 (`lib/aladin.ts`에 정의):

```ts
export interface Book {
  title: string
  author: string
  rating: number        // 5점 만점
  price: number         // 원
  url: string           // 알라딘 상세/구매 링크
  description: string
  image?: string        // 표지 URL (없으면 이모지 폴백)
  theme?: string        // 감정 테마 (기존 호환)
  isbn?: string         // dedupe 및 추후 상세조회용
}
```

## 4. 감정 → 키워드 풀 (`lib/emotionKeywords.ts`)

감정마다 키워드 여러 개를 두고, 요청마다 하나를 랜덤 선택한다. (초안 — 자유 조정 가능)

```ts
export const emotionKeywords: Record<string, string[]> = {
  '자존감을 잃지 마':   ['자존감', '자기 사랑', '자신감', '나답게'],
  '혼자가 아니야':      ['인간관계', '관계', '외로움', '소통'],
  '작은 것도 감사해':   ['감사', '행복', '소확행', '마음챙김'],
  '내일은 내가 더 잘할 거야': ['습관', '자기계발', '성장', '루틴'],
  '마음이 무거워도 괜찮아':   ['마음 위로', '감정', '심리 에세이', '괜찮아'],
  '넌 충분해':          ['자기수용', '자존감', '위로', '있는 그대로'],
}
```

## 5. 알라딘 호출 (`lib/aladin.ts`)

- 엔드포인트: `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx`
- 주요 파라미터:
  - `ttbkey` = `process.env.ALADIN_TTB_KEY`
  - `Query` = 선택된 키워드
  - `QueryType` = `Keyword`
  - `SearchTarget` = `Book`
  - `MaxResults` = `30` (넉넉히 받아 셔플용)
  - `Sort` = 요청마다 번갈아: `SalesPoint` / `PublishTime` / `CustomerRating`
  - `Cover` = `Big` (표지 이미지)
  - `Output` = `JS`, `Version` = `20131101`
- 응답 필드 매핑:
  - `title` → `title`
  - `author` → `author`
  - `customerReviewRank`(0~10) → `rating = round(rank/2, 1)`
  - `priceSales` → `price`
  - `link` → `url`
  - `cover` → `image`
  - `description` → `description`
  - `isbn13` → `isbn`

## 6. 다양성 로직

1. **키워드 랜덤**: 감정별 풀에서 매 요청 하나 선택.
2. **정렬 로테이션**: `Sort` 값을 번갈아 사용해 베스트셀러 외 최신·평점 책도 노출.
3. **셔플**: 받은 20~30권을 섞어 상위 N권(기본 5)만 노출 → 재방문 시 다른 결과.
4. **중복 제거**: `isbn` 기준 dedupe.

> 주의: `Math.random()`은 서버 Route Handler 내에서 사용 (요청 시점 난수). 렌더 캐시가
> 다양성을 죽이지 않도록 이 라우트는 `dynamic` 처리하거나 짧은 revalidate만 적용.

## 7. 폴백 & 캐싱

- **폴백 조건**: `ALADIN_TTB_KEY` 미설정 / HTTP 오류 / 예외 / 결과 0건
  → `getRecommendedBooks(emotion)`(기존 더미) 반환, 응답에 `source: 'fallback'` 표시.
- **캐싱**: 알라딘 무료 한도(약 5,000건/일) 절약을 위해 `(키워드+Sort)` 조합 결과를
  서버에서 짧게(예: 수 분) 메모리 캐시하거나 fetch `revalidate` 사용. 단, 다양성을 위해
  최종 셔플·slice는 캐시 이후 단계에서 수행.

## 8. UI 변경 (`BookCard.tsx`)

- `image` prop이 있으면 표지 `<img>` 표시, 없으면 기존 이모지(📖) 폴백.
- 나머지(제목·저자·평점·가격·설명·"알라딘에서 보기" 버튼)는 기존 그대로 재사용.

## 9. 에러 처리

- Route Handler는 어떤 경우에도 200 + `{ source, books }` 형태로 응답 (클라이언트가 항상 목록을 받도록).
- 알라딘 호출은 타임아웃(예: 5초) 두고, 초과/실패 시 폴백.
- 서버 로그에만 실제 오류 기록, 클라이언트에는 키/오류 상세 노출 안 함.

## 10. 테스트 전략

- `lib/aladin.ts` 변환 함수: 알라딘 샘플 JSON → `Book[]` 매핑 단위 테스트 (rating 변환, isbn dedupe, 빈 결과 처리).
- `lib/emotionKeywords.ts`: 모든 감정 키가 존재하고 풀이 비어있지 않은지 검증.
- Route Handler: 키 없음 → `source: 'fallback'`, 정상 목응답 → `source: 'aladin'` (알라딘 호출은 목/스텁).
- 셔플/dedupe 로직: 고정 입력으로 중복 제거·개수 검증 (난수는 주입 가능하게 설계).

## 11. 범위 밖 (YAGNI)

- Claude API 추천 이유 생성 (기존 `getRecommendationReason` 유지).
- 사용자 로그인/DB 저장.
- 알라딘 상세조회(ItemLookUp), 베스트셀러 리스트(ItemList) — 추후 확장 여지만 남김(`isbn` 보관).
```