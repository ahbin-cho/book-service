'use client'

import styled from 'styled-components'

interface EmotionSelectorProps {
  onSelect: (emotion: string) => void
}

const Container = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #2c3e50;
`

const EmotionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`

const EmotionButton = styled.button`
  padding: 1rem;
  text-align: left;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    border-color: #667eea;
    background: #f0f4ff;
    transform: translateX(4px);
  }

  &:active {
    background: #e8eeff;
  }

  .emoji {
    margin-right: 0.5rem;
    font-size: 1.5rem;
  }

  .text {
    font-weight: 500;
    color: #2c3e50;
  }

  .desc {
    display: block;
    font-size: 0.85rem;
    color: #7f8c8d;
    margin-top: 0.25rem;
  }
`

const emotions = [
  { emoji: '💪', title: '자존감을 잃지 마', desc: '자신감과 가치를 되찾고 싶을 때' },
  { emoji: '🤝', title: '혼자가 아니야', desc: '누군가와 연결되고 싶을 때' },
  { emoji: '🙏', title: '작은 것도 감사해', desc: '일상의 소소한 행복을 느끼고 싶을 때' },
  { emoji: '🚀', title: '내일은 내가 더 잘할 거야', desc: '성장하고 변화하고 싶을 때' },
  { emoji: '🌙', title: '마음이 무거워도 괜찮아', desc: '지친 마음을 위로받고 싶을 때' },
  { emoji: '✨', title: '넌 충분해', desc: '있는 그대로를 수용하고 싶을 때' },
]

export default function EmotionSelector({ onSelect }: EmotionSelectorProps) {
  return (
    <Container>
      <Title>당신의 감정을 선택하세요</Title>
      <EmotionGrid>
        {emotions.map((emotion) => (
          <EmotionButton
            key={emotion.title}
            onClick={() => onSelect(emotion.title)}
          >
            <span className="emoji">{emotion.emoji}</span>
            <span className="text">{emotion.title}</span>
            <span className="desc">{emotion.desc}</span>
          </EmotionButton>
        ))}
      </EmotionGrid>
    </Container>
  )
}
