'use client'

import styled from 'styled-components'
import { emotionOrder } from '@/lib/emotionKeywords'
import { type MomoTheme, getMomoTheme } from '@/lib/momoThemes'

interface EmotionSelectorProps {
  onSelect: (emotion: string) => void
}

const Container = styled.div`
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(25, 23, 20, 0.08);
  border-radius: 14px;
  padding: clamp(1rem, 2.8vw, 1.65rem);
`

const Title = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2vw, 1.55rem);
  font-weight: 700;
  line-height: 1.25;
  margin-bottom: 0.35rem;
  color: #191714;
`

const Subtitle = styled.p`
  color: #706a62;
  line-height: 1.58;
  margin-bottom: 1.15rem;
`

const GroupGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`

const GroupCard = styled.section<{ $wash: string }>`
  min-width: 0;
  padding: 0.9rem;
  border: 1px solid rgba(25, 23, 20, 0.08);
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.88), ${(props) => props.$wash});
`

const GroupHead = styled.div`
  display: grid;
  grid-template-columns: 3.25rem minmax(0, 1fr);
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 0.8rem;

  img {
    width: 3.25rem;
    aspect-ratio: 1;
    border-radius: 9px;
    object-fit: contain;
    background: rgba(255, 255, 255, 0.55);
  }

  strong {
    display: block;
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.3;
    color: #191714;
  }

  span {
    display: block;
    margin-top: 0.18rem;
    color: #736d65;
    font-size: 0.8rem;
    line-height: 1.45;
  }
`

const MoodList = styled.div`
  display: grid;
  gap: 0.42rem;
`

const MoodButton = styled.button<{ $accent: string }>`
  position: relative;
  min-height: 3.65rem;
  padding: 0.68rem 2.25rem 0.68rem 0.75rem;
  border: 1px solid rgba(25, 23, 20, 0.07);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.62);
  text-align: left;
  cursor: pointer;
  transition: transform 0.16s ease, border-color 0.16s ease, background 0.16s ease;

  &:hover {
    transform: translateX(2px);
    border-color: rgba(25, 23, 20, 0.16);
    background: rgba(255, 255, 255, 0.88);
  }

  &::before {
    content: '';
    position: absolute;
    left: 0.72rem;
    top: 0.78rem;
    width: 0.34rem;
    height: 0.34rem;
    border-radius: 999px;
    background: ${(props) => props.$accent};
  }

  .label {
    display: block;
    padding-left: 0.92rem;
    font-family: var(--font-display);
    font-size: 0.98rem;
    font-weight: 700;
    line-height: 1.25;
    color: #191714;
  }

  .cue {
    display: block;
    padding-left: 0.92rem;
    margin-top: 0.2rem;
    color: #746e66;
    font-size: 0.78rem;
    line-height: 1.42;
  }

  .arrow {
    position: absolute;
    top: 50%;
    right: 0.78rem;
    transform: translateY(-50%);
    color: #4a4640;
    font-weight: 900;
  }
`

const groupOrder = ['쉬는 모모', '응원 모모', '대화 모모', '몰입 모모']

function getGroups() {
  const groups = new Map<string, Array<{ title: string; momo: MomoTheme }>>()

  emotionOrder.forEach((title) => {
    const momo = getMomoTheme(title)
    const items = groups.get(momo.name) ?? []
    items.push({ title, momo })
    groups.set(momo.name, items)
  })

  return groupOrder
    .map((name) => [name, groups.get(name) ?? []] as const)
    .filter(([, items]) => items.length > 0)
}

export default function EmotionSelector({ onSelect }: EmotionSelectorProps) {
  const groups = getGroups()

  return (
    <Container>
      <Title>어떤 책을 펼치고 싶나요?</Title>
      <Subtitle>모모가 읽기감에 따라 책을 나눠뒀어요. 가까운 항목을 골라주세요.</Subtitle>
      <GroupGrid>
        {groups.map(([name, items]) => {
          const head = items[0].momo
          return (
            <GroupCard key={name} $wash={head.wash}>
              <GroupHead>
                <img src={head.image} alt="" />
                <span>
                  <strong>{name}</strong>
                  <span>{head.line}</span>
                </span>
              </GroupHead>
              <MoodList>
                {items.map(({ title, momo }) => (
                  <MoodButton
                    key={title}
                    type="button"
                    onClick={() => onSelect(title)}
                    $accent={momo.accent}
                  >
                    <span className="label">{momo.label}</span>
                    <span className="cue">{momo.cue}</span>
                    <span className="arrow">→</span>
                  </MoodButton>
                ))}
              </MoodList>
            </GroupCard>
          )
        })}
      </GroupGrid>
    </Container>
  )
}
