'use client'

import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { emotionDetails } from '@/lib/emotionKeywords'

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
  padding: clamp(0.8rem, 2vw, 1.2rem) 0 0;
`

const Header = styled.div`
  position: relative;
  padding: clamp(1.25rem, 3vw, 2rem);
  background:
    linear-gradient(90deg, rgba(16, 20, 32, 0.04), transparent 18%),
    linear-gradient(180deg, #fffdf8, #fbfaf6);
  border-right: 1px solid #d8d2c5;

  img {
    width: 4.25rem;
    aspect-ratio: 1;
    object-fit: contain;
    border-radius: 4px;
    background: #f5f1e8;
    margin-bottom: 1.25rem;
  }

  .step {
    color: #7a7266;
    font-size: 0.84rem;
    font-weight: 700;
    letter-spacing: 0;
    margin-bottom: 0.75rem;
  }

  h2 {
    font-family: var(--font-display);
    color: #151515;
    font-size: clamp(1.45rem, 2.6vw, 2.15rem);
    line-height: 1.25;
    margin-bottom: 0.85rem;
  }

  p {
    color: #68645d;
    line-height: 1.75;
    max-width: 28rem;
  }

  .folio {
    position: absolute;
    left: clamp(1.25rem, 3vw, 2rem);
    bottom: 1.1rem;
    color: #a09a90;
    font-size: 0.75rem;
  }

  @media (max-width: 560px) {
    min-height: 260px;
  }
`

const Spread = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
  min-height: 420px;
  border: 1px solid #d8d2c5;
  border-radius: 3px;
  overflow: hidden;
  background: #fffdf8;
  box-shadow:
    0 26px 70px rgba(26, 28, 38, 0.09),
    inset 0 0 0 1px rgba(255, 255, 255, 0.7);
  perspective: 1400px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: calc(44% - 1px);
    width: 18px;
    transform: translateX(-50%);
    background:
      linear-gradient(90deg, rgba(24, 20, 14, 0.12), rgba(24, 20, 14, 0.035), transparent);
    pointer-events: none;
    z-index: 3;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    min-height: auto;

    &::before {
      display: none;
    }
  }
`

const Options = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  align-content: stretch;
  padding: clamp(1.2rem, 3vw, 2rem);
  background:
    linear-gradient(90deg, rgba(24, 20, 14, 0.08), transparent 14%),
    repeating-linear-gradient(180deg, transparent 0 62px, rgba(70, 62, 48, 0.045) 63px, transparent 64px),
    #fffdf8;
  transform-origin: left center;
  animation: pageTurn 520ms cubic-bezier(0.2, 0.72, 0.2, 1) both;

  &::after {
    content: '';
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    bottom: 0.75rem;
    width: 12px;
    border-right: 1px solid #ded8cc;
    box-shadow:
      4px 0 0 #f7f2e8,
      8px 0 0 #eee7da;
    opacity: 0.9;
    pointer-events: none;
  }

  @keyframes pageTurn {
    0% {
      opacity: 0;
      transform: rotateY(-18deg) translateX(-14px);
      filter: blur(1px);
    }
    58% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: rotateY(0) translateX(0);
      filter: blur(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const OptionButton = styled.button<{ $tone: string }>`
  position: relative;
  min-height: 92px;
  padding: 1rem 2.25rem 1rem 2.15rem;
  text-align: left;
  border: 0;
  border-bottom: 1px solid #e4ded2;
  border-radius: 0;
  background: transparent;
  cursor: pointer;
  transition: transform 0.22s ease, color 0.22s ease, background 0.22s ease;

  &:hover {
    transform: translateX(6px);
    background: rgba(36, 31, 23, 0.035);
  }

  &::before {
    content: attr(data-index);
    position: absolute;
    top: 1.05rem;
    left: 0;
    width: 1.3rem;
    color: #8c857a;
    font-family: var(--font-display);
    font-size: 0.85rem;
    font-weight: 700;
  }

  .icon {
    display: block;
    color: #9d968b;
    background: transparent;
    width: auto;
    height: auto;
    margin-bottom: 0.35rem;
    font-size: 0.75rem;
    font-weight: 700;
  }

  strong {
    display: block;
    color: #171717;
    margin-bottom: 0.3rem;
    font-size: 1.05rem;
    line-height: 1.35;
  }

  span {
    color: #676159;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0 0;

  button {
    border: 1px solid #d8d2c5;
    color: #171717;
    background: white;
    border-radius: 3px;
    padding: 0.7rem 1rem;
    font-weight: 700;
    cursor: pointer;
  }

  .crumbs {
    color: #706b63;
    font-size: 0.88rem;
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
    title: '오늘은 어떤 속도로 읽고 싶어요?',
    desc: '책의 두께와 호흡을 먼저 맞춰볼게요.',
    options: [
      { label: '짧고 가볍게', value: '짧은 에세이', desc: '부담 없이 한두 꼭지씩', icon: '15', tone: '#5b7cfa' },
      { label: '천천히 오래', value: '긴 호흡', desc: '문장에 오래 머물기', icon: '∞', tone: '#20c997' },
      { label: '확 빨려들게', value: '몰입감', desc: '페이지가 술술 넘어가게', icon: '→', tone: '#ff6f91' },
    ],
  },
  {
    key: 'genre',
    title: '어떤 결의 책이 더 끌려요?',
    desc: '감정은 유지하되 장르 쪽 취향을 좁혀볼게요.',
    options: [
      { label: '에세이', value: '에세이', desc: '다정하고 현실적인 문장', icon: 'E', tone: '#ff9f43' },
      { label: '소설', value: '소설', desc: '다른 세계에 잠깐 들어가기', icon: 'S', tone: '#7c5cff' },
      { label: '심리/실용', value: '심리학', desc: '마음을 이해하는 단서', icon: 'P', tone: '#00a8cc' },
    ],
  },
  {
    key: 'purpose',
    title: '책을 덮고 나면 어떤 기분이면 좋겠어요?',
    desc: '마지막으로 추천의 온도를 맞출게요.',
    options: [
      { label: '위로받은 느낌', value: '위로', desc: '마음이 조금 말랑해지게', icon: '♡', tone: '#ff6680' },
      { label: '정리된 느낌', value: '생각 정리', desc: '복잡한 마음에 이름 붙이기', icon: '□', tone: '#4e73ff' },
      { label: '움직이고 싶은 느낌', value: '동기부여', desc: '내일을 조금 기대하게', icon: '✦', tone: '#5fca8d' },
    ],
  },
] as const

export default function FollowUpQuestions({ emotion, onBack, onComplete }: FollowUpQuestionsProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<ReadingContext>>({})
  const current = questions[step]
  const detail = emotionDetails[emotion]
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
        <Header>
          <img src="/mascot-curator.png" alt="" />
          <div>
            <div className="step">{step + 1} / {questions.length} · {emotion}</div>
            <h2>{current.title}</h2>
            <p>{detail?.desc ? `${detail.desc}. ` : ''}{current.desc}</p>
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
              <span className="icon">p. {String(step + 1).padStart(2, '0')}</span>
              <strong>{option.label}</strong>
              <span>{option.desc}</span>
            </OptionButton>
          ))}
        </Options>
      </Spread>

      <Footer>
        <button onClick={handleBack}>{step === 0 ? '감정 다시 고르기' : '이전 질문'}</button>
        <div className="crumbs">{crumbs || '답변을 고르면 다음 질문으로 이어져요'}</div>
      </Footer>
    </Panel>
  )
}
