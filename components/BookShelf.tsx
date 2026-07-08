'use client'

import styled from 'styled-components'
import type { Book } from '@/lib/aladin'

interface BookShelfProps {
  title: string
  subtitle?: string
  books: Book[]
  compact?: boolean
}

const Shelf = styled.section`
  background: #ffffff;
  border: 1px solid #dedede;
  border-radius: 4px;
  padding: clamp(1rem, 2.5vw, 1.25rem);
  box-shadow: none;
  overflow: hidden;
  min-width: 0;
`

const ShelfHeader = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;

  h2 {
    color: #171b2d;
    font-family: var(--font-display);
    font-size: clamp(1.18rem, 1.8vw, 1.45rem);
    font-weight: 700;
    line-height: 1.25;
  }

  p {
    color: #767f95;
    font-size: 0.92rem;
    line-height: 1.5;
    margin-top: 0.25rem;
  }

  .hint {
    color: #777f95;
    font-size: 0.82rem;
    font-weight: 700;
    white-space: nowrap;
  }
`

const Rail = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(104px, 1fr));
  gap: 0.95rem;
  padding: 0.35rem 0 0.15rem;
  min-width: 0;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 3.25rem;
    height: 1px;
    background: #dedede;
  }
`

const BookLink = styled.a`
  position: relative;
  z-index: 1;
  min-width: 0;
  color: inherit;
  text-decoration: none;
  transform-origin: bottom center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`

const Cover = styled.div<{ $compact?: boolean }>`
  height: ${(props) => (props.$compact ? '156px' : '178px')};
  border-radius: 8px;
  background: linear-gradient(135deg, #eef3ff, #f7f4ff);
  box-shadow:
    0 12px 24px rgba(28, 37, 74, 0.1),
    0 1px 0 rgba(255, 255, 255, 0.75) inset;
  overflow: hidden;
  display: grid;
  place-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .fallback {
    padding: 1rem;
    color: #6674ff;
    font-weight: 900;
    text-align: center;
    line-height: 1.35;
  }
`

const Caption = styled.div`
  padding-top: 0.75rem;

  strong {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 2.45rem;
    color: #171b2d;
    font-size: 0.84rem;
    line-height: 1.45;
  }

  span {
    display: block;
    margin-top: 0.25rem;
    color: #8a92a6;
    font-size: 0.78rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export default function BookShelf({ title, subtitle, books, compact = false }: BookShelfProps) {
  return (
    <Shelf>
      <ShelfHeader>
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="hint">cover index</div>
      </ShelfHeader>
      <Rail>
        {books.map((book) => (
          <BookLink key={book.isbn ?? book.title} href={book.url} target="_blank" rel="noopener noreferrer">
            <Cover $compact={compact}>
              {book.image ? (
                <img src={book.image} alt={book.title} loading="lazy" />
              ) : (
                <div className="fallback">{book.title}</div>
              )}
            </Cover>
            <Caption>
              <strong>{book.title}</strong>
              <span>{book.author}</span>
            </Caption>
          </BookLink>
        ))}
      </Rail>
    </Shelf>
  )
}
