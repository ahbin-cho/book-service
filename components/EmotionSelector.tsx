'use client'

import styled from 'styled-components'
import { emotionDetails, emotionOrder } from '@/lib/emotionKeywords'

interface EmotionSelectorProps {
  onSelect: (emotion: string) => void
}

const Container = styled.div`
  background: #ffffff;
  border: 1px solid #dedede;
  border-radius: 4px;
  padding: clamp(1.1rem, 2.5vw, 1.6rem);
`

const Title = styled.h2`
  font-size: clamp(1.18rem, 1.8vw, 1.45rem);
  font-family: var(--font-display);
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: #172033;
`

const Subtitle = styled.p`
  color: #6c7280;
  line-height: 1.65;
  margin-bottom: 1.35rem;
`

const EmotionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 1.5rem;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`

const EmotionButton = styled.button<{ $tone: string }>`
  position: relative;
  min-height: 64px;
  padding: 0.85rem 0;
  text-align: left;
  border: 0;
  border-bottom: 1px solid #eeeeee;
  background: #ffffff;
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;
  display: grid;
  grid-template-columns: 2.2rem minmax(0, 1fr);
  gap: 0.75rem;
  align-items: baseline;

  &:hover {
    color: #4e5cff;
    transform: translateX(4px);
  }

  &:active {
    transform: translateY(0);
  }

  .symbol {
    display: block;
    color: #9aa0ad;
    font-size: 0.82rem;
    font-weight: 700;
  }

  .text {
    display: block;
    font-weight: 700;
    color: #172033;
    font-size: 0.95rem;
    line-height: 1.35;
    word-break: keep-all;
  }

  .desc {
    display: block;
    font-size: 0.8rem;
    color: #777f8f;
    margin-top: 0.25rem;
    line-height: 1.45;
  }
`

const iconGlyphs: Record<string, string> = {
  lamp: 'Zz',
  heart: '♡',
  moon: '☁',
  leaf: '↔',
  compass: '↑',
  spark: '✦',
  sun: '☼',
  seed: '+',
  bookmark: '□',
  smile: '⌣',
  book: '▦',
  cup: '•',
}

const iconTones = [
  '#5b7cfa',
  '#ff6f91',
  '#20c997',
  '#ff9f43',
  '#7c5cff',
  '#00a8cc',
  '#f6b93b',
  '#5fca8d',
  '#8e7cff',
  '#ff7675',
  '#3d8bfd',
  '#9bdb4d',
]

export default function EmotionSelector({ onSelect }: EmotionSelectorProps) {
  return (
    <Container>
      <Title>지금 기분을 골라주세요</Title>
      <Subtitle>책갈피를 하나 고르면 모모가 이어지는 질문으로 취향을 더 좁혀줄게요.</Subtitle>
      <EmotionGrid>
        {emotionOrder.map((title, index) => {
          const emotion = emotionDetails[title]
          return (
          <EmotionButton
            key={title}
            onClick={() => onSelect(title)}
            $tone={iconTones[index % iconTones.length]}
          >
            <span className="symbol">{String(index + 1).padStart(2, '0')}</span>
            <span>
              <span className="text">{title}</span>
              <span className="desc">{emotion.desc}</span>
            </span>
          </EmotionButton>
          )
        })}
      </EmotionGrid>
    </Container>
  )
}
