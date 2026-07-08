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
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(74, 85, 112, 0.1);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 14px 32px rgba(41, 54, 92, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 18px 42px rgba(41, 54, 92, 0.13);
    transform: translateY(-3px);
  }
`

const BookImage = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  background:
    linear-gradient(135deg, rgba(102, 116, 255, 0.12), rgba(255, 128, 171, 0.1)),
    #f7f8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4e73ff;
  font-size: 3.4rem;
  overflow: hidden;
`

const CoverImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #f7f8ff;
  padding: 0.55rem;
`

const BookInfo = styled.div`
  padding: 1.15rem;
`

const Title = styled.h3`
  min-height: 3.15rem;
  font-size: 1.05rem;
  font-weight: 800;
  color: #172033;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`

const Author = styled.p`
  color: #79849a;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  min-height: 1.35rem;
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  
  .stars {
    color: #f6b93b;
    font-size: 0.9rem;
    margin-right: 0.5rem;
  }

  .score {
    color: #172033;
    font-weight: bold;
  }
`

const Price = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #4e73ff;
  margin-bottom: 1rem;
`

const Description = styled.p`
  color: #647086;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ReasonSection = styled.div<{ $show: boolean }>`
  background: #f7faff;
  border-left: 4px solid #4e73ff;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: ${(props) => (props.$show ? 'block' : 'none')};

  .label {
    font-weight: bold;
    color: #4e73ff;
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }

  .text {
    color: #172033;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-top: 1rem;
`

const Button = styled.a`
  flex: 1;
  padding: 0.75rem;
  text-align: center;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
`

const BuyButton = styled(Button)`
  background: #4e73ff;
  color: white;

  &:hover {
    background: #365be8;
  }
`

const ExpandButton = styled.button`
  background: #ffffff;
  color: #4e73ff;
  border: 1px solid #d7e0ff;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  flex: 1;

  &:hover {
    background: #e9efff;
    border-color: #4e73ff;
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
