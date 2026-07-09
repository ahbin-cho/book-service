'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import BookCard from './BookCard'
import BookShelf from './BookShelf'
import type { Book } from '@/lib/aladin'
import { emotionDetails } from '@/lib/emotionKeywords'
import type { ReadingContext } from './FollowUpQuestions'
import { getMomoTheme } from '@/lib/momoThemes'

interface BookRecommenderProps {
  emotion: string
  context: ReadingContext
}

const Container = styled.div`
  width: 100%;
`

const Header = styled.div<{ $panel: string; $wash: string }>`
  background:
    linear-gradient(180deg, ${(props) => props.$wash}, rgba(241, 221, 190, 0.92)),
    repeating-linear-gradient(94deg, rgba(83, 45, 20, 0.07) 0 1px, transparent 1px 30px);
  border: 1px solid rgba(91, 50, 23, 0.26);
  border-radius: 7px;
  padding: clamp(1rem, 2.5vw, 1.45rem);
  margin-bottom: 1rem;
  box-shadow: 0 16px 30px rgba(56, 30, 13, 0.16);

  h2 {
    font-family: var(--font-display);
    font-size: clamp(1.38rem, 2.4vw, 2.05rem);
    color: var(--ink);
    margin-bottom: 0.45rem;
    line-height: 1.25;
  }

  p {
    color: #654b38;
    font-size: 0.98rem;
    line-height: 1.6;
  }

  .tag {
    display: inline-flex;
    margin-bottom: 0.72rem;
    padding: 0.34rem 0.62rem;
    border-radius: 6px;
    background: rgba(79, 58, 42, 0.1);
    color: ${(props) => props.$panel};
    font-size: 0.8rem;
    font-weight: 900;
  }
`

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.9rem;
  margin-bottom: 1.5rem;
  margin-top: 0.9rem;
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  min-height: 280px;
  background:
    linear-gradient(180deg, rgba(255, 249, 238, 0.94), rgba(241, 221, 190, 0.92));
  border: 1px solid rgba(91, 50, 23, 0.26);
  border-radius: 7px;
  box-shadow: 0 16px 30px rgba(56, 30, 13, 0.16);
  color: #654b38;
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
  background: #fff0df;
  border: 1px solid rgba(143, 75, 48, 0.3);
  border-radius: 7px;
  padding: 1.4rem;
  text-align: center;
  color: #8f3e24;
  font-weight: bold;
`

const ReadingListSection = styled.div`
  background: rgba(255, 248, 236, 0.94);
  border: 1px solid rgba(91, 50, 23, 0.24);
  border-radius: 7px;
  padding: clamp(1rem, 2.5vw, 1.4rem);
  box-shadow: 0 14px 28px rgba(56, 30, 13, 0.14);

  h3 {
    font-family: var(--font-display);
    font-size: 1.25rem;
    color: var(--ink);
    margin-bottom: 1rem;
  }

  .empty {
    text-align: center;
    color: #80664f;
    padding: 1.4rem;
  }

  .reading-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.85rem;
    background: #f4e5cf;
    border: 1px solid rgba(91, 50, 23, 0.16);
    border-radius: 6px;
    
    .title {
      font-weight: bold;
      color: var(--ink);
    }

    .date {
      font-size: 0.85rem;
      color: #80664f;
    }

    button {
      background: #7b4d2d;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: #5d351b;
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
  const momo = getMomoTheme(emotion)

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
      <Header $panel={momo.panel} $wash={momo.wash}>
        <span className="tag">{emotionDetails[emotion]?.shelf ?? '오늘의 책장'}</span>
        <h2>{momo.name}</h2>
        <p>
          {momo.line} {context.pace} · {context.genre} · {context.purpose} 쪽으로 좁혀봤어요.
          표지를 천천히 훑다가 마음이 먼저 가는 한 권을 열어보세요.
        </p>
      </Header>

      {loading ? (
        <LoadingContainer>
          <img src={momo.image} alt="" />
          <p>{momo.name}가 답변에 맞는 책들을 살펴보는 중이에요.</p>
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
