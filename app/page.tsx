"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import EmotionSelector from "@/components/EmotionSelector";
import BookRecommender from "@/components/BookRecommender";
import FollowUpQuestions, {
  type ReadingContext,
} from "@/components/FollowUpQuestions";
import BookShelf from "@/components/BookShelf";
import type { Book } from "@/lib/aladin";

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f6f6f3;
  color: #172033;
`;

const ContentWrapper = styled.div`
  width: min(100%, 980px);
  margin: 0 auto;
  padding: 22px clamp(16px, 3vw, 28px) 56px;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(230px, 360px);
  gap: clamp(1rem, 4vw, 2.5rem);
  align-items: center;
  padding: 18px 0 24px;

  h1 {
    max-width: 540px;
    font-family: var(--font-display);
    font-size: clamp(1.95rem, 3.5vw, 2.85rem);
    font-weight: 700;
    line-height: 1.18;
    margin-bottom: 0.9rem;
    letter-spacing: 0;
    color: #172033;
  }

  p {
    max-width: 540px;
    font-size: clamp(0.98rem, 1.8vw, 1.12rem);
    line-height: 1.7;
    color: #647086;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.1rem;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.6rem;
    padding: 0 1rem;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 800;
    background: #171b2d;
    color: white;
    box-shadow: none;
  }

  a.secondary {
    display: inline-flex;
    align-items: center;
    min-height: 2.6rem;
    padding: 0 1rem;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.78);
    border: 1px solid rgba(42, 50, 70, 0.1);
    color: #767f95;
    font-weight: 800;
    box-shadow: none;
  }
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.8rem;
  color: #171b2d;
  font-size: 0.8rem;
  font-weight: 900;
  letter-spacing: 0;
  background: #ffffff;
  border: 1px solid #dedede;
  padding: 0.42rem 0.7rem;
  border-radius: 8px;

  &::before {
    content: "✦";
    color: #777f8f;
  }
`;

const CuratorCard = styled.aside`
  border: 1px solid #dedede;
  border-radius: 14px;
  background: #ffffff;
  padding: 1rem;
  box-shadow: none;

  .shelf {
    display: grid;
    grid-template-columns: 9rem 1fr;
    gap: 0.8rem;
    align-items: center;
  }

  img {
    width: 9rem;
    aspect-ratio: 1;
    object-fit: contain;
    border-radius: 10px;
    background: #f3f5ff;
  }

  .note {
    color: #647086;
    line-height: 1.6;
    font-size: 0.95rem;
  }

  strong {
    display: block;
    color: #172033;
    font-size: 1rem;
    margin-bottom: 0.25rem;
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
  gap: 1.1rem;
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
    background: #ffffff;
    border: 1px solid rgba(65, 88, 208, 0.1);
    box-shadow: 0 14px 32px rgba(39, 61, 119, 0.08);
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
    color: #172033;
    font-size: 0.94rem;
    margin-bottom: 0.2rem;
  }

  span {
    color: #79849a;
    font-size: 0.84rem;
    line-height: 1.45;
  }
`;

export default function Home() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [readingContext, setReadingContext] = useState<ReadingContext | null>(
    null,
  );
  const [bestSellers, setBestSellers] = useState<Book[]>([]);

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
            <Eyebrow>책 큐레이터</Eyebrow>
            <h1>커버를 넘기다 보면 오늘 읽을 책이 보여요</h1>
            <p>
              먼저 요즘 많이 읽는 책을 둘러보고, 마음이 가는 순간에는 모모의
              질문에 답해 더 정확한 추천으로 넘어가세요.
            </p>
            <HeroActions>
              <a href="#mood-shelf">내 추천 찾기</a>
              <a className="secondary" href="#bestseller-shelf">
                베스트셀러 먼저 보기
              </a>
            </HeroActions>
          </div>
          <CuratorCard>
            <div className="shelf">
              <img src="/mascot-curator.png" alt="책 큐레이터 마스코트" />
              <p className="note">
                <strong>북큐 모모</strong>
                바로 추천하지 않고, 꼬리에 꼬리를 무는 질문으로 오늘의 책을 더
                잘 찾아볼게요.
              </p>
            </div>
          </CuratorCard>
        </Header>

        {!selectedEmotion ? (
          <MainContent>
            {bestSellers.length > 0 && (
              <div id="bestseller-shelf">
                <BookShelf
                  title="요즘 많이 펼쳐보는 책"
                  subtitle="알라딘 베스트셀러 표지를 먼저 훑어보세요."
                  books={bestSellers}
                />
              </div>
            )}
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
            <FeatureGrid>
              <div className="mini">
                <div
                  className="icon"
                  style={{ background: "#e9efff", color: "#4e73ff" }}
                >
                  A
                </div>
                <strong>알라딘 검색</strong>
                <span>실제 책 결과를 불러와요</span>
              </div>
              <div className="mini">
                <div
                  className="icon"
                  style={{ background: "#e9fbf5", color: "#12a076" }}
                >
                  12
                </div>
                <strong>다양한 선택지</strong>
                <span>기분을 더 촘촘하게 골라요</span>
              </div>
              <div className="mini">
                <div
                  className="icon"
                  style={{ background: "#f0ecff", color: "#7c5cff" }}
                >
                  Q
                </div>
                <strong>이어지는 질문</strong>
                <span>취향과 상황을 좁혀요</span>
              </div>
              <div className="mini">
                <div
                  className="icon"
                  style={{ background: "#fff4d6", color: "#d89100" }}
                >
                  ★
                </div>
                <strong>추천 이유</strong>
                <span>왜 어울리는지 알려줘요</span>
              </div>
            </FeatureGrid>
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
              className="mb-6 px-4 py-2 bg-white text-[#4e73ff] rounded-full hover:bg-[#e9efff] transition-colors font-bold border border-[#d7e0ff]"
            >
              다른 마음 고르기
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
