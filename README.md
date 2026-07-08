# 북큐 모모

오늘의 마음과 이어지는 질문 답변을 바탕으로 **알라딘 책장**에서 어울리는 책을 골라주는 감정 맞춤 책 추천 서비스입니다.

```
마음(감정) 한 문장 선택
    ↓
속도·장르·기대감 질문 답변
    ↓
감정별 키워드 풀 + 답변 맥락으로 검색어 구성
    ↓
알라딘 검색 API로 실제 책 조회 (베스트셀러·신간·평점 섞기)
    ↓
표지 중심 카드로 추천 + 알라딘에서 바로 보기
```

## 🛠️ 기술 스택

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18 + styled-components + Tailwind CSS
- **Language**: TypeScript
- **데이터**: 알라딘 상품 검색 Open API

## 📁 주요 구조

```
app/
  layout.tsx              # 루트 레이아웃 / 메타데이터
  page.tsx                # 메인 페이지 (감정 선택 → 추천)
  api/books/route.ts      # 서버 Route Handler (알라딘 호출, TTBKey 서버 전용)
components/
  EmotionSelector.tsx     # 감정 선택 UI
  BookRecommender.tsx     # 추천 목록 + 독서 목록
  BookCard.tsx            # 책 카드 (표지·평점·가격·구매 링크)
lib/
  aladin.ts               # 알라딘 검색·변환·dedupe·shuffle + Book 타입
  emotionKeywords.ts      # 감정별 키워드 풀 + 감정 상세 문구
  matching.ts             # 폴백용 더미 데이터
```

## 🚀 시작하기

```bash
npm install
npm run dev      # http://localhost:3000
```

### 알라딘 API 키 설정

프로젝트 루트에 `.env.local` 생성:

```
ALADIN_TTB_KEY=발급받은_TTBKey
```

- 키는 **서버(Route Handler)에서만** 사용되며 클라이언트에 노출되지 않습니다.
- 키가 없거나 호출에 실패하면 자동으로 더미 데이터로 폴백하므로, 키 없이도 개발이 가능합니다.
- TTBKey 발급: <https://www.aladin.co.kr/ttb/wblog_manage.aspx> (무료, 하루 약 5,000건 호출)

## 🌈 다양성 로직

- 감정마다 여러 검색어 중 하나를 **랜덤 선택**
- 알라딘 정렬(판매량·출간일·평점)을 **번갈아 사용**
- 넉넉히 받은 결과를 **중복 제거 + 셔플** → 같은 감정도 방문할 때마다 다른 책장

## 📦 배포

Vercel에 GitHub 저장소를 연결하고, 환경변수 `ALADIN_TTB_KEY`를 등록하면 됩니다.
(`NEXT_PUBLIC_` 접두사를 붙이지 마세요 — 서버 전용 비밀입니다.)
