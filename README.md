# 1234 Book Service 🎯

당신의 감정에 맞는 책을 AI가 추천해드리는 서비스입니다.

## 🚀 프로젝트 개요

```
"오늘의 한마디"에서 받은 감정
    ↓
1234 Book에서 맞춤 책 추천
    ↓
알라딘 링크로 직접 구매
    ↓
독서 목록에 추가 및 성장 추적
```

## 📁 프로젝트 구조

```
1234-book-service/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 루트 레이아웃
│   ├── page.tsx                 # 메인 페이지
│   └── styles/
│       └── globals.css          # 전역 스타일
│
├── components/                  # React 컴포넌트들
│   ├── EmotionSelector.tsx      # 감정 선택 UI
│   ├── BookCard.tsx             # 책 카드 컴포넌트
│   └── BookRecommender.tsx      # 책 추천 엔진
│
├── lib/                         # 유틸리티 함수들
│   └── matching.ts              # 감정 매칭 로직 (현재)
│
├── data/                        # 데이터 저장소
├── public/                      # 정적 파일
│
├── package.json                 # 의존성
├── tsconfig.json               # TypeScript 설정
├── tailwind.config.js          # Tailwind CSS 설정
├── postcss.config.js           # PostCSS 설정
└── next.config.js              # Next.js 설정
```

## 🛠️ 기술 스택

- **Frontend Framework**: Next.js 14+
- **UI Library**: React 18+
- **Styling**: Tailwind CSS + Styled Components
- **Language**: TypeScript

## 📋 현재 구현 상태

### ✅ 완료됨
- [x] Next.js + Tailwind + Styled Components 프로젝트 셋업
- [x] 기본 페이지 레이아웃
- [x] 감정 선택 UI (EmotionSelector)
- [x] 책 카드 컴포넌트 (BookCard)
- [x] 책 추천 엔진 (더미 데이터)
- [x] 독서 목록 기능
- [x] 반응형 디자인

### 🔄 진행 중
- [ ] 알라딘 API 연동 (필요할 때)
- [ ] Claude API로 추천 이유 생성 (필요할 때)
- [ ] 사용자 로그인 및 데이터 저장

## 🚀 시작하기

### 1. 환경 셋업

```bash
cd ~/Documents/projects/1234-book-service
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

### 3. 빌드

```bash
npm run build
npm start
```

## 📚 감정별 책 추천 매핑

현재 6개의 감정에 각각 5권씩의 책이 매핑되어 있습니다:

1. **자존감을 잃지 마** → 자존감/자신감 관련 책
2. **혼자가 아니야** → 관계/소통 관련 책
3. **작은 것도 감사해** → 감사/행복 관련 책
4. **내일은 내가 더 잘할 거야** → 성장/습관 관련 책
5. **마음이 무거워도 괜찮아** → 위로/감정 관련 책
6. **넌 충분해** → 자기수용/가치 관련 책

## 🎨 UI/UX 특징

- 🌈 Gradient 배경 (보라색 계열)
- 💫 Smooth 트랜지션 및 호버 효과
- 📱 완전 반응형 디자인
- ♿ 접근성 고려한 색상 대비
- 🎯 직관적인 사용자 흐름

## 🔄 데이터 흐름

```
사용자 입력
  ↓
감정 선택 (EmotionSelector)
  ↓
매칭 함수 호출 (matching.ts)
  ↓
더미 데이터에서 책 조회
  ↓
북 카드로 표시 (BookCard)
  ↓
알라딘 링크로 구매
```

## 🐛 개발 팁

### 스타일 추가하기
Tailwind CSS 클래스 + Styled Components 조합:

```tsx
const Container = styled.div`
  @apply p-4 bg-white rounded-lg;
`
```

### 새 감정 추가하기
1. `components/EmotionSelector.tsx`에 감정 추가
2. `lib/matching.ts`의 `booksDatabase` 객체에 책들 추가
3. 완료!

## 📞 Cowork에서 작업하기

이 프로젝트는 Cowork 환경에서 작업하기 좋습니다:

1. **파일 수정**: 각 컴포넌트를 직접 수정 가능
2. **라이브 미리보기**: `npm run dev` 실행하면 브라우저에서 실시간 확인
3. **터미널 접근**: `npm install`, 테스트 등 즉시 실행 가능
4. **Claude와 협업**: 코드 리뷰 및 개선 제안 받기

## 🎯 다음 단계

나중에 필요하면 말씀해주세요!

- **알라딘 API 연동** → Python 크롤링 또는 JS API Route
- **Claude API 연동** → 스마트한 추천 이유 생성
- **데이터베이스** → 사용자 데이터 저장 및 분석

---

**Made with 💜 for 1234 Project**

Cowork에서 이어서 개발합니다! 🚀
