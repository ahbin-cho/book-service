'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import BookCard from './BookCard'
import BookShelf from './BookShelf'
import type { Book } from '@/lib/aladin'
import { emotionDetails } from '@/lib/emotionKeywords'
import type { ReadingContext } from './FollowUpQuestions'

interface BookRecommenderProps {
  emotion: string
  context: ReadingContext
}

const Container = styled.div`
  width: 100%;
`

const Header = styled.div`
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(74, 85, 112, 0.1);
  border-radius: 14px;
  padding: clamp(1.25rem, 3vw, 2rem);
  margin-bottom: 1.25rem;
  box-shadow: 0 24px 60px rgba(44, 55, 90, 0.08);
  backdrop-filter: blur(18px);

  h2 {
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 3vw, 2.5rem);
    color: #172033;
    margin-bottom: 0.5rem;
    line-height: 1.25;
  }

  p {
    color: #647086;
    font-size: 1.1rem;
    line-height: 1.7;
  }

  .tag {
    display: inline-flex;
    margin-bottom: 0.9rem;
    padding: 0.4rem 0.65rem;
    border-radius: 999px;
    background: #e9efff;
    color: #4e73ff;
    font-size: 0.85rem;
    font-weight: 900;
  }
`

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
  margin-top: 1.25rem;
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  min-height: 320px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(74, 85, 112, 0.1);
  border-radius: 14px;
  box-shadow: 0 24px 60px rgba(44, 55, 90, 0.08);
  color: #647086;
  text-align: center;

  img {
    width: 8rem;
    aspect-ratio: 1;
    object-fit: contain;
    animation: breathe 1.8s ease-in-out infinite;
  }

  @keyframes breathe {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
`

const ErrorContainer = styled.div`
  background: #ffecef;
  border: 1px solid rgba(255, 102, 128, 0.26);
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  color: #d64560;
  font-weight: bold;
`

const ReadingListSection = styled.div`
  background: #ffffff;
  border: 1px solid rgba(65, 88, 208, 0.1);
  border-radius: 14px;
  padding: clamp(1.25rem, 3vw, 2rem);
  box-shadow: 0 18px 50px rgba(39, 61, 119, 0.08);

  h3 {
    font-family: var(--font-display);
    font-size: 1.5rem;
    color: #172033;
    margin-bottom: 1rem;
  }

  .empty {
    text-align: center;
    color: #79849a;
    padding: 2rem;
  }

  .reading-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f7faff;
    border: 1px solid rgba(65, 88, 208, 0.1);
    border-radius: 10px;
    
    .title {
      font-weight: bold;
      color: #172033;
    }

    .date {
      font-size: 0.85rem;
      color: #79849a;
    }

    button {
      background: #ff6680;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: #e84f6a;
      }
    }
  }
`

export default function BookRecommender({ emotion, context }: BookRecommenderProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedBooks, setExpandedBooks] = useState<Set<string>>(new Set())
  const [readingList, setReadingList] = useState<Array<{ title: string; date: string }>>([])

  useEffect(() => {
    fetchBooks()
  }, [emotion, context])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      setError(null)

      // 서버 Route Handler가 알라딘을 호출(실패 시 더미로 폴백)한다.
      const params = new URLSearchParams({
        emotion,
        context: [context.pace, context.genre, context.purpose].join(' '),
        count: '8',
      })
      const res = await fetch(`/api/books?${params.toString()}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: { source: string; books: Book[] } = await res.json()

      if (!data.books || data.books.length === 0) {
        setError('해당 감정에 맞는 책을 찾을 수 없습니다.')
      } else {
        setBooks(data.books)
      }
    } catch (err) {
      setError('책을 가져오는 중 오류가 발생했습니다.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const toggleExpandBook = (title: string) => {
    const newExpanded = new Set(expandedBooks)
    if (newExpanded.has(title)) {
      newExpanded.delete(title)
    } else {
      newExpanded.add(title)
    }
    setExpandedBooks(newExpanded)
  }

  const addToReadingList = (book: Book) => {
    const newItem = {
      title: book.title,
      date: new Date().toLocaleDateString('ko-KR'),
    }
    setReadingList([...readingList, newItem])
  }

  const removeFromReadingList = (index: number) => {
    setReadingList(readingList.filter((_, i) => i !== index))
  }

  return (
    <Container>
      <Header>
        <span className="tag">{emotionDetails[emotion]?.shelf ?? '오늘의 책장'}</span>
        <h2>{emotion}</h2>
        <p>
          {context.pace} · {context.genre} · {context.purpose} 쪽으로 좁혀봤어요.
          표지를 천천히 훑다가 마음이 먼저 가는 한 권을 열어보세요.
        </p>
      </Header>

      {loading ? (
        <LoadingContainer>
          <img src="/mascot-curator.png" alt="" />
          <p>모모가 답변을 엮어서 알라딘 커버들을 살펴보는 중이에요.</p>
        </LoadingContainer>
      ) : error ? (
        <ErrorContainer>{error}</ErrorContainer>
      ) : (
        <>
          <BookShelf
            title="모모가 골라온 추천 커버"
            subtitle="표지를 옆으로 넘겨 먼저 훑어보세요."
            books={books}
            compact
          />
          <BooksGrid>
            {books.map((book) => {
              const id = book.isbn ?? book.title
              return (
                <BookCard
                  key={id}
                  title={book.title}
                  author={book.author}
                  rating={book.rating}
                  price={book.price}
                  url={book.url}
                  image={book.image}
                  description={book.description}
                  reasonToRead={emotionDetails[emotion]?.reason ?? `지금의 "${emotion}"에 천천히 닿을 만한 문장을 품은 책이에요.`}
                  isExpanded={expandedBooks.has(id)}
                  onExpandClick={() => toggleExpandBook(id)}
                />
              )
            })}
          </BooksGrid>

          <ReadingListSection>
            <h3>내가 다시 펼쳐볼 책</h3>
            {readingList.length === 0 ? (
              <div className="empty">
                <p>아직 담아둔 책은 없어요.</p>
              </div>
            ) : (
              <div className="reading-list">
                {readingList.map((item, index) => (
                  <div key={index} className="list-item">
                    <div>
                      <div className="title">{item.title}</div>
                      <div className="date">추가됨: {item.date}</div>
                    </div>
                    <button onClick={() => removeFromReadingList(index)}>
                      제거
                    </button>
                  </div>
                ))}
              </div>
            )}
          </ReadingListSection>
        </>
      )}
    </Container>
  )
}
