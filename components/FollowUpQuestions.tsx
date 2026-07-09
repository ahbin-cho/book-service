'use client'

import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { getMomoTheme } from '@/lib/momoThemes'

export interface ReadingContext {
  pace: string
  genre: string
  purpose: string
}

interface FollowUpQuestionsProps {
  emotion: string
  onBack: () => void
  onComplete: (context: ReadingContext) => void
}

const Panel = styled.section`
  position: relative;
  width: min(100%, 760px);
  margin: 0 auto;
  padding: clamp(0.5rem, 2vw, 1rem) 0 0;
`

const Header = styled.div<{ $panel: string; $wash: string }>`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: center;
  padding: 0;
  background: transparent;
  border: 0;

  img {
    grid-column: 2;
    grid-row: 1 / span 3;
    width: clamp(3.75rem, 10vw, 5rem);
    aspect-ratio: 1;
    object-fit: contain;
    border-radius: 14px;
    background: ${(props) => props.$wash};
    box-shadow: none;
  }

  .step {
    display: inline-flex;
    width: fit-content;
    color: #77716a;
    background: transparent;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0;
    margin-bottom: 0.45rem;
    padding: 0;
    border-radius: 0;
  }

  h2 {
    font-family: var(--font-display);
    color: var(--ink);
    font-size: clamp(1.55rem, 3.2vw, 2.25rem);
    font-weight: 700;
    line-height: 1.14;
    margin-bottom: 0.45rem;
    letter-spacing: 0;
  }

  p {
    color: #68635c;
    line-height: 1.5;
    font-size: 0.92rem;
    max-width: 30rem;
  }

  .momo-name {
    display: none;
  }

  .folio {
    display: none;
  }

  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr) auto;

    img {
      width: 4rem;
    }
  }
`

const Spread = styled.div`
  position: relative;
  display: grid;
  gap: 1.25rem;
  border: 1px solid rgba(25, 23, 20, 0.08);
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 18px 48px rgba(25, 23, 20, 0.06);
  padding: clamp(1.15rem, 3vw, 1.65rem);
  backdrop-filter: blur(14px);

  &::before {
    display: none;
  }

  @media (max-width: 760px) {}
`

const Options = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.55rem;
  align-content: stretch;
  padding: 0;
  background: transparent;
  transform-origin: left center;
  animation: optionsIn 260ms ease both;

  &::after {
    display: none;
  }

  @keyframes optionsIn {
    0% {
      opacity: 0;
      transform: translateY(8px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`

const OptionButton = styled.button<{ $tone: string }>`
  position: relative;
  min-height: 4.6rem;
  padding: 0.85rem 3rem 0.85rem 0.95rem;
  text-align: left;
  border: 1px solid rgba(25, 23, 20, 0.08);
  border-radius: 12px;
  background: rgba(250, 249, 246, 0.72);
  cursor: pointer;
  box-shadow: none;
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;

  &:hover {
    transform: translateX(3px);
    border-color: rgba(25, 23, 20, 0.18);
    background: #ffffff;
  }

  &::before {
    content: '';
    position: absolute;
    display: none;
  }

  .icon {
    position: static;
    display: inline-grid;
    place-items: center;
    color: ${(props) => props.$tone};
    background: rgba(25, 23, 20, 0.05);
    width: 1.9rem;
    height: 1.9rem;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 900;
    margin: 0 0.8rem 0 0;
    vertical-align: top;
  }

  strong {
    display: inline-block;
    color: var(--ink);
    font-family: var(--font-display);
    font-weight: 700;
    margin: 0 0 0.2rem;
    font-size: 1rem;
    line-height: 1.25;
    vertical-align: top;
  }

  span {
    color: #706a62;
    font-size: 0.84rem;
    line-height: 1.45;
  }

  .option-copy {
    display: inline-block;
    max-width: calc(100% - 3rem);
  }

  .option-copy > span {
    display: block;
  }

  &::after {
    content: '→';
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    color: #8d8780;
    font-weight: 900;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 0 0;

  button {
    border: 1px solid rgba(25, 23, 20, 0.1);
    color: #191714;
    background: rgba(255, 255, 255, 0.72);
    border-radius: 8px;
    padding: 0.68rem 0.9rem;
    font-weight: 700;
    cursor: pointer;
  }

  .crumbs {
    color: #79736b;
    font-size: 0.84rem;
    text-align: right;
  }

  @media (max-width: 560px) {
    align-items: flex-start;
    flex-direction: column;

    .crumbs {
      text-align: left;
    }
  }
`

const questions = [
  {
    key: 'pace',
    title: '읽을 여유',
    desc: '지금 집중력에 맞춰요.',
    options: [
      { label: '짧게', value: '짧고 쉬운 책', desc: '바로 읽고 덮기', icon: '01', tone: '#7b8a72' },
      { label: '천천히', value: '적당한 깊이', desc: '생각할 거리 남기기', icon: '02', tone: '#6f8190' },
      { label: '몰입', value: '몰입감', desc: '시간 잊고 읽기', icon: '03', tone: '#777087' },
    ],
  },
  {
    key: 'genre',
    title: '읽는 방식',
    desc: '오늘 손이 갈 형태를 골라요.',
    options: [
      { label: '공감', value: '에세이', desc: '내 얘기 같은 글', icon: '01', tone: '#9a7f72' },
      { label: '이야기', value: '소설', desc: '다른 세계로 들어가기', icon: '02', tone: '#67707b' },
      { label: '정리', value: '심리학 실용', desc: '머리가 맑아지는 글', icon: '03', tone: '#6f7b67' },
    ],
  },
  {
    key: 'purpose',
    title: '남길 감각',
    desc: '마지막 방향만 맞춰요.',
    options: [
      { label: '편안함', value: '위로', desc: '조금 덜 날카롭게', icon: '01', tone: '#a27476' },
      { label: '명료함', value: '생각 정리', desc: '머리가 조금 맑게', icon: '02', tone: '#777087' },
      { label: '추진력', value: '동기부여', desc: '작게 움직일 힘', icon: '03', tone: '#6f836f' },
    ],
  },
] as const

export default function FollowUpQuestions({ emotion, onBack, onComplete }: FollowUpQuestionsProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<ReadingContext>>({})
  const current = questions[step]
  const momo = getMomoTheme(emotion)
  const crumbs = useMemo(() => Object.values(answers).filter(Boolean).join(' · '), [answers])

  const handleSelect = (value: string) => {
    const nextAnswers = { ...answers, [current.key]: value }
    if (step === questions.length - 1) {
      onComplete(nextAnswers as ReadingContext)
      return
    }
    setAnswers(nextAnswers)
    setStep(step + 1)
  }

  const handleBack = () => {
    if (step === 0) {
      onBack()
      return
    }
    setStep(step - 1)
  }

  return (
    <Panel>
      <Spread>
        <Header
          $panel={momo.panel}
          $wash={momo.wash}
        >
          <img src={momo.image} alt="" />
          <div>
            <div className="step">{step + 1} / {questions.length} · {momo.label}</div>
            <div className="momo-name">{momo.name}</div>
            <h2>{current.title}</h2>
            <p>{momo.line} {current.desc}</p>
          </div>
          <span className="folio">{String(step + 1).padStart(2, '0')}</span>
        </Header>
        <Options key={step}>
          {current.options.map((option, index) => (
            <OptionButton
              key={option.value}
              $tone={option.tone}
              data-index={String(index + 1).padStart(2, '0')}
              onClick={() => handleSelect(option.value)}
            >
              <span className="icon">{option.icon}</span>
              <span className="option-copy">
                <strong>{option.label}</strong>
                <span>{option.desc}</span>
              </span>
            </OptionButton>
          ))}
        </Options>
      </Spread>

      <Footer>
        <button onClick={handleBack}>{step === 0 ? '처음으로' : '이전'}</button>
        <div className="crumbs">{crumbs || '선택하면 바로 다음으로 넘어가요'}</div>
      </Footer>
    </Panel>
  )
}
