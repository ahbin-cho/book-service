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
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);
  }
`

const BookImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
`

const BookInfo = styled.div`
  padding: 1.5rem;
`

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`

const Author = styled.p`
  color: #7f8c8d;
  font-size: 0.95rem;
  margin-bottom: 1rem;
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  .stars {
    color: #f39c12;
    font-size: 0.9rem;
    margin-right: 0.5rem;
  }

  .score {
    color: #2c3e50;
    font-weight: bold;
  }
`

const Price = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 1rem;
`

const Description = styled.p`
  color: #555;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ReasonSection = styled.div<{ $show: boolean }>`
  background: #f0f4ff;
  border-left: 4px solid #667eea;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  display: ${(props) => (props.$show ? 'block' : 'none')};

  .label {
    font-weight: bold;
    color: #667eea;
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }

  .text {
    color: #2c3e50;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`

const Button = styled.a`
  flex: 1;
  padding: 0.75rem;
  text-align: center;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
`

const BuyButton = styled(Button)`
  background: #667eea;
  color: white;

  &:hover {
    background: #5568d3;
  }
`

const ExpandButton = styled.button`
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;

  &:hover {
    background: #f0f4ff;
  }
`

export default function BookCard({
  title,
  author,
  rating,
  price,
  url,
  description,
  reasonToRead,
  isExpanded = false,
  onExpandClick,
}: BookCardProps) {
  const stars = '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '★' : '')

  return (
    <Card>
      <BookImage>📖</BookImage>
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
            알라딘에서 보기
          </BuyButton>
          {onExpandClick && (
            <ExpandButton onClick={onExpandClick}>
              {isExpanded ? '닫기' : '이유보기'}
            </ExpandButton>
          )}
        </ButtonGroup>
      </BookInfo>
    </Card>
  )
}
