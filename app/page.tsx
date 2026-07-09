"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import EmotionSelector from "@/components/EmotionSelector";
import BookRecommender from "@/components/BookRecommender";
import FollowUpQuestions, {
  type ReadingContext
} from "@/components/FollowUpQuestions";
import BookShelf from "@/components/BookShelf";
import type { Book } from "@/lib/aladin";
import { getMomoTheme } from "@/lib/momoThemes";

const PageContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  color: var(--ink);
`;

const ContentWrapper = styled.div`
  width: min(100%, 1040px);
  margin: 0 auto;
  padding: 24px clamp(18px, 4vw, 36px) 52px;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 4px 0 22px;

  h1 {
    max-width: 620px;
    font-family: var(--font-display);
    font-size: clamp(1.82rem, 3.8vw, 3.2rem);
    font-weight: 700;
    line-height: 1.18;
    margin-bottom: 0.7rem;
    letter-spacing: 0;
    color: #171411;
  }

  p {
    max-width: 560px;
    font-size: clamp(0.98rem, 1.6vw, 1.12rem);
    line-height: 1.72;
    color: #67625b;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.15rem;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.35rem;
    padding: 0 0.85rem;
    border-radius: 7px;
    text-decoration: none;
    font-size: 0.92rem;
    font-weight: 700;
    background: #2d2924;
    color: #fffdf8;
    box-shadow: none;
  }

  a::before {
    content: '책';
    display: inline-grid;
    place-items: center;
    width: 1.35rem;
    height: 1.35rem;
    margin-right: 0.45rem;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.14);
    font-size: 0.7rem;
    font-weight: 800;
  }

  a.secondary {
    display: inline-flex;
    align-items: center;
    min-height: 2.35rem;
    padding: 0 0.85rem;
    border-radius: 7px;
    background: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(25, 23, 20, 0.1);
    color: #3f3a34;
    font-size: 0.92rem;
    font-weight: 700;
    box-shadow: none;
  }

  a.secondary::before {
    content: '순위';
    background: rgba(25, 23, 20, 0.06);
    color: #5c554d;
  }
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.8rem;
  color: #615c54;
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0;
  background: rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(25, 23, 20, 0.08);
  padding: 0.42rem 0.72rem;
  border-radius: 8px;

  &::before {
    content: "";
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: #7b8a72;
  }
`;

const CuratorCard = styled.aside`
  width: fit-content;
  margin-top: 1rem;
  border: 0;
  border-radius: 0;
  background: transparent;
  padding: 0;
  box-shadow: none;

  .shelf {
    display: grid;
    grid-template-columns: 4.5rem minmax(0, 22rem);
    gap: 0.85rem;
    align-items: center;
  }

  img {
    width: 4.5rem;
    aspect-ratio: 1;
    object-fit: contain;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.58);
  }

  .note {
    color: #625c55;
    line-height: 1.5;
    font-size: 0.88rem;
  }

  strong {
    display: block;
    color: #191714;
    font-size: 0.9rem;
    margin-bottom: 0.15rem;
  }

  @media (max-width: 420px) {
    .shelf {
      grid-template-columns: 6.5rem 1fr;
    }

    img {
      width: 6.5rem;
    }
  }
`;

const MainContent = styled.div`
  display: grid;
  gap: 0.9rem;
`;

const KitSection = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 0.74fr);
  gap: 1rem;
  align-items: stretch;
  background: #171b2d;
  border-radius: 14px;
  padding: clamp(1.2rem, 3vw, 1.7rem);
  color: white;
  box-shadow: 0 24px 60px rgba(23, 27, 45, 0.16);
  overflow: hidden;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }

  .eyebrow {
    display: inline-flex;
    width: fit-content;
    border-radius: 8px;
    padding: 0.42rem 0.72rem;
    background: rgba(255, 255, 255, 0.1);
    color: #cfd7ff;
    font-size: 0.8rem;
    font-weight: 900;
    margin-bottom: 0.9rem;
  }

  h2 {
    max-width: 620px;
    font-family: var(--font-display);
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    line-height: 1.25;
    font-weight: 700;
    margin-bottom: 0.75rem;
  }

  p {
    color: #cfd4e6;
    line-height: 1.7;
    max-width: 650px;
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-top: 1rem;
  }

  .item {
    border-radius: 8px;
    padding: 0.55rem 0.78rem;
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    font-size: 0.88rem;
    font-weight: 800;
  }

  .kit-card {
    min-width: 0;
    display: grid;
    gap: 0.7rem;
    align-content: center;
    border-radius: 12px;
    padding: 1rem;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.94),
      rgba(245, 247, 255, 0.92)
    );
    color: #171b2d;
  }

  .mock {
    display: grid;
    grid-template-columns: 0.8fr 1fr;
    gap: 0.55rem;
    min-height: 138px;
  }

  .bookmark,
  .postcard,
  .quote {
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(28, 37, 74, 0.14);
  }

  .bookmark {
    background: linear-gradient(180deg, #6674ff, #ff80ab);
  }

  .postcard {
    background: #ffffff;
    border: 1px solid #e4e9ff;
  }

  .quote {
    grid-column: 1 / -1;
    background: #fff4d9;
    padding: 0.85rem;
    color: #171b2d;
    font-size: 0.88rem;
    font-weight: 900;
  }

  .price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    font-weight: 900;
  }

  button {
    border: 0;
    border-radius: 10px;
    background: #6674ff;
    color: white;
    padding: 0.72rem 1rem;
    font-weight: 900;
    cursor: pointer;
  }
`;

const FeatureGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .mini {
    min-height: 92px;
    border-radius: 12px;
    padding: 1rem;
    background: rgba(252, 244, 231, 0.9);
    border: 1px solid rgba(58, 43, 31, 0.16);
    box-shadow: 0 12px 22px rgba(46, 32, 22, 0.1);
  }

  .icon {
    width: 2rem;
    height: 2rem;
    border-radius: 8px;
    display: grid;
    place-items: center;
    margin-bottom: 0.55rem;
    font-weight: 900;
  }

  strong {
    display: block;
    color: var(--wood-900);
    font-size: 0.94rem;
    margin-bottom: 0.2rem;
  }

  span {
    color: #6f5946;
    font-size: 0.84rem;
    line-height: 1.45;
  }
`;

export default function Home() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [readingContext, setReadingContext] = useState<ReadingContext | null>(
    null
  );
  const [bestSellers, setBestSellers] = useState<Book[]>([]);
  const heroMomo = getMomoTheme(selectedEmotion);

  useEffect(() => {
    const fetchBestSellers = async () => {
      const res = await fetch("/api/books?type=bestseller&count=10");
      if (!res.ok) return;
      const data: { books?: Book[] } = await res.json();
      setBestSellers(data.books ?? []);
    };

    fetchBestSellers().catch(() => setBestSellers([]));
  }, []);

  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
    setReadingContext(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleComplete = (context: ReadingContext) => {
    setReadingContext(context);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setSelectedEmotion(null);
    setReadingContext(null);
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <Header>
          <div>
            <Eyebrow>Book curation</Eyebrow>
            <h1>오늘 펼칠 책을 고르는 시간</h1>
            <p>
              지금 기분과 읽을 여유를 고르면,
              모모가 표지와 문장을 기준으로 어울리는 책을 좁혀드릴게요.
            </p>
            <CuratorCard>
              <div className="shelf">
                <img src={heroMomo.image} alt="책 큐레이터 모모" />
                <p className="note">
                  <strong>{heroMomo.name}</strong>
                  {heroMomo.line} 오늘 펼칠 책의 방향을 같이 잡아볼게요.
                </p>
              </div>
            </CuratorCard>
            <HeroActions>
              <a href="#mood-shelf">내 책 고르기</a>
              <a className="secondary" href="#bestseller-shelf">요즘 읽는 책</a>
            </HeroActions>
          </div>
        </Header>

        {!selectedEmotion ? (
          <MainContent>
            <div id="bestseller-shelf">
              {bestSellers.length > 0 && (
                <BookShelf
                  title="요즘 많이 읽는 책"
                  subtitle="바로 고르기 전, 가볍게 둘러보세요."
                  books={bestSellers}
                />
              )}
            </div>
            {/* <KitSection>
              <div>
                <div className="eyebrow">Mood Curation Kit</div>
                <h2>마음에 맞는 책과 함께, 작은 굿즈 키트까지 받아보는 경험</h2>
                <p>
                  추천받은 감정에 맞춰 책갈피, 엽서, 명언 카드, 모모 스티커를 한 세트로 구성하는 유료 북키트예요.
                  단순 추천을 넘어 선물하고 싶은 큐레이션으로 확장할 수 있어요.
                </p>
                <div className="items">
                  <span className="item">감정 책갈피</span>
                  <span className="item">문장 엽서</span>
                  <span className="item">명언 카드</span>
                  <span className="item">모모 스티커</span>
                </div>
              </div>
              <div className="kit-card">
                <div className="mock">
                  <div className="bookmark" />
                  <div className="postcard" />
                  <div className="quote">오늘의 문장까지 담아 배송되는 북키트</div>
                </div>
                <div className="price">
                  <span>월 9,900원부터</span>
                  <button>키트 미리보기</button>
                </div>
              </div>
            </KitSection> */}
            <div id="mood-shelf">
              <EmotionSelector onSelect={handleEmotionSelect} />
            </div>
            {/* <FeatureGrid>
              <div className="mini">
                <div
                  className="icon"
                  style={{ background: "#f0dfc5", color: "#6c3f21" }}
                >
                  A
                </div>
                <strong>알라딘 검색</strong>
                <span>실제 책 결과를 불러와요</span>
              </div>
              <div className="mini">
                <div
                  className="icon"
                  style={{ background: "#ead5af", color: "#7b4d2d" }}
                >
                  12
                </div>
                <strong>다양한 선택지</strong>
                <span>기분을 더 촘촘하게 골라요</span>
              </div>
              <div className="mini">
                <div
                  className="icon"
                  style={{ background: "#f6e8cf", color: "#8b5b35" }}
                >
                  Q
                </div>
                <strong>이어지는 질문</strong>
                <span>취향과 상황을 좁혀요</span>
              </div>
              <div className="mini">
                <div
                  className="icon"
                  style={{ background: "#e5c79e", color: "#5d351b" }}
                >
                  ★
                </div>
                <strong>추천 이유</strong>
                <span>왜 어울리는지 알려줘요</span>
              </div>
            </FeatureGrid> */}
          </MainContent>
        ) : !readingContext ? (
          <FollowUpQuestions
            emotion={selectedEmotion}
            onBack={handleReset}
            onComplete={handleComplete}
          />
        ) : (
          <div>
            <button
              onClick={handleReset}
              className="mb-4 px-4 py-2 bg-[#fff8ec] text-[#5d351b] rounded-md hover:bg-[#f0dfc5] transition-colors font-bold border border-[#8b5b35]/30"
            >
              다시 고르기
            </button>
            <BookRecommender
              emotion={selectedEmotion}
              context={readingContext}
            />
          </div>
        )}
      </ContentWrapper>
    </PageContainer>
  );
}
