'use client'

import styled from 'styled-components'

interface BookCardProps {
  title: string
  author: string
  rating: number
  price: number
  url: string
  image?: string
  description: string
  reasonToRead?: string
  isExpanded?: boolean
  onExpandClick?: () => void
}

const Card = styled.div`
  background:
    linear-gradient(180deg, rgba(255, 249, 238, 0.96), rgba(247, 233, 211, 0.96)),
    repeating-linear-gradient(92deg, rgba(93, 52, 24, 0.06) 0 1px, transparent 1px 30px);
  border: 1px solid rgba(92, 54, 28, 0.24);
  border-radius: 7px;
  overflow: hidden;
  box-shadow: 0 14px 28px rgba(56, 30, 13, 0.16);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 18px 34px rgba(56, 30, 13, 0.22);
    transform: translateY(-3px);
  }
`

const BookImage = styled.div`
  width: 100%;
  aspect-ratio: 5 / 3.4;
  background:
    radial-gradient(circle at 35% 12%, rgba(255, 244, 217, 0.9), transparent 45%),
    linear-gradient(135deg, rgba(109, 64, 32, 0.16), rgba(199, 154, 104, 0.14)),
    #e8d3b5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7b4d2d;
  font-size: 2.7rem;
  overflow: hidden;
`

const CoverImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #e8d3b5;
  padding: 0.55rem;
`

const BookInfo = styled.div`
  padding: 0.95rem;
`

const Title = styled.h3`
  min-height: 2.85rem;
  font-size: 0.98rem;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 0.5rem;
  line-height: 1.4;
`

const Author = styled.p`
  color: #776453;
  font-size: 0.84rem;
  margin-bottom: 0.75rem;
  min-height: 1.35rem;
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  
  .stars {
    color: #bd7b2d;
    font-size: 0.9rem;
    margin-right: 0.5rem;
  }

  .score {
    color: var(--ink);
    font-weight: bold;
  }
`

const Price = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #7b4d2d;
  margin-bottom: 0.75rem;
`

const Description = styled.p`
  color: #6c5b4b;
  font-size: 0.84rem;
  line-height: 1.55;
  margin-bottom: 0.85rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ReasonSection = styled.div<{ $show: boolean }>`
  background: rgba(255, 246, 230, 0.9);
  border-left: 4px solid #9a653c;
  padding: 0.85rem;
  border-radius: 5px;
  margin-bottom: 0.85rem;
  display: ${(props) => (props.$show ? 'block' : 'none')};

  .label {
    font-weight: bold;
    color: #7b4d2d;
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }

  .text {
    color: var(--ink);
    font-size: 0.95rem;
    line-height: 1.5;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.8rem;
`

const Button = styled.a`
  flex: 1;
  padding: 0.75rem;
  text-align: center;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  border: none;
  cursor: pointer;
  font-size: 0.88rem;
`

const BuyButton = styled(Button)`
  background: #5d351b;
  color: white;

  &:hover {
    background: #3d2111;
  }
`

const ExpandButton = styled.button`
  background: #fff8ec;
  color: #5d351b;
  border: 1px solid rgba(93, 53, 27, 0.25);
  padding: 0.75rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  flex: 1;

  &:hover {
    background: #f1dfc4;
    border-color: #8b5b35;
  }
`

export default function BookCard({
  title,
  author,
  rating,
  price,
  url,
  image,
  description,
  reasonToRead,
  isExpanded = false,
  onExpandClick,
}: BookCardProps) {
  const stars = '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '★' : '')

  return (
    <Card>
      <BookImage>
        {image ? <CoverImg src={image} alt={title} loading="lazy" /> : '▤'}
      </BookImage>
      <BookInfo>
        <Title>{title}</Title>
        <Author>{author}</Author>
        <Rating>
          <span className="stars">{stars}</span>
          <span className="score">{rating.toFixed(1)}</span>
        </Rating>
        <Price>{price.toLocaleString()}원</Price>
        <Description>{description}</Description>

        <ReasonSection $show={isExpanded && !!reasonToRead}>
          <div className="label">왜 이 책을 추천했을까요?</div>
          <div className="text">{reasonToRead}</div>
        </ReasonSection>

        <ButtonGroup>
          <BuyButton
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            알라딘 보기
          </BuyButton>
          {onExpandClick && (
            <ExpandButton onClick={onExpandClick}>
              {isExpanded ? '접기' : '왜 이 책?'}
            </ExpandButton>
          )}
        </ButtonGroup>
      </BookInfo>
    </Card>
  )
}
