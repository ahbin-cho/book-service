'use client'

import { useState } from 'react'
import styled from 'styled-components'
import EmotionSelector from '@/components/EmotionSelector'
import BookRecommender from '@/components/BookRecommender'

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Header = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
`

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export default function Home() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [showRecommendations, setShowRecommendations] = useState(false)

  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion)
    setShowRecommendations(true)
  }

  const handleReset = () => {
    setSelectedEmotion(null)
    setShowRecommendations(false)
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <Header>
          <h1>📚 1234 Book</h1>
          <p>당신의 감정에 맞는 책을 AI가 추천해드립니다</p>
        </Header>

        {!showRecommendations ? (
          <MainContent>
            <EmotionSelector onSelect={handleEmotionSelect} />
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">어떻게 시작할까요?</h2>
              <div className="space-y-4 text-gray-700">
                <p className="flex items-start">
                  <span className="mr-3 text-2xl">1️⃣</span>
                  <span>왼쪽에서 당신의 감정을 선택하세요</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-3 text-2xl">2️⃣</span>
                  <span>AI가 그 감정에 맞는 책을 추천합니다</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-3 text-2xl">3️⃣</span>
                  <span>추천 이유를 읽고 책을 구매하세요</span>
                </p>
              </div>
              <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> 당신이 '오늘의 한마디'에서 받은 감정 메시지를 선택해보세요!
                </p>
              </div>
            </div>
          </MainContent>
        ) : (
          <div>
            <button
              onClick={handleReset}
              className="mb-6 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              ← 다시 선택하기
            </button>
            {selectedEmotion && (
              <BookRecommender emotion={selectedEmotion} />
            )}
          </div>
        )}
      </ContentWrapper>
    </PageContainer>
  )
}
