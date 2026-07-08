'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import BookCard from './BookCard'
import { getRecommendedBooks } from '@/lib/matching'

interface BookRecommenderProps {
  emotion: string
}

interface Book {
  title: string
  author: string
  rating: number
  price: number
  url: string
  description: string
  theme: string
}

const Container = styled.div`
  width: 100%;
`

const Header = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  p {
    color: #7f8c8d;
    font-size: 1.1rem;
  }
`

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .spinner {
    font-size: 3rem;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const ErrorContainer = styled.div`
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  color: #c33;
  font-weight: bold;
`

const ReadingListSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  .empty {
    text-align: center;
    color: #7f8c8d;
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
    background: #f8f9fa;
    border-radius: 8px;
    
    .title {
      font-weight: bold;
      color: #2c3e50;
    }

    .date {
      font-size: 0.85rem;
      color: #7f8c8d;
    }

    button {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: #c0392b;
      }
    }
  }
`

export default function BookRecommender({ emotion }: BookRecommenderProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedBooks, setExpandedBooks] = useState<Set<string>>(new Set())
  const [readingList, setReadingList] = useState<Array<{ title: string; date: string }>>([])

  useEffect(() => {
    fetchBooks()
  }, [emotion])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // 로컬 매칭 함수 사용
      const recommendedBooks = getRecommendedBooks(emotion, 5)
      
      if (recommendedBooks.length === 0) {
        setError('해당 감정에 맞는 책을 찾을 수 없습니다.')
      } else {
        setBooks(recommendedBooks)
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
        <h2>"{emotion}"에 어울리는 책들</h2>
        <p>이 책들이 당신의 마음을 위로하고 영감을 줄 거예요</p>
      </Header>

      {loading ? (
        <LoadingContainer>
          <div className="spinner">📚</div>
        </LoadingContainer>
      ) : error ? (
        <ErrorContainer>{error}</ErrorContainer>
      ) : (
        <>
          <BooksGrid>
            {books.map((book) => (
              <BookCard
                key={book.title}
                title={book.title}
                author={book.author}
                rating={book.rating}
                price={book.price}
                url={book.url}
                description={book.description}
                reasonToRead={`이 책은 "${emotion}"이라는 감정을 다루고 있으며, 당신의 마음을 따뜻하게 안아줄 거예요.`}
                isExpanded={expandedBooks.has(book.title)}
                onExpandClick={() => toggleExpandBook(book.title)}
              />
            ))}
          </BooksGrid>

          <ReadingListSection>
            <h3>📖 내 독서 목록</h3>
            {readingList.length === 0 ? (
              <div className="empty">
                <p>추가된 책이 없습니다.</p>
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
