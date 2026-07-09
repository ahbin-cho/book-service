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
  background:
    linear-gradient(180deg, rgba(255, 252, 247, 0.98), rgba(247, 241, 232, 0.94)),
    linear-gradient(90deg, rgba(120, 91, 67, 0.08), transparent 32%, rgba(85, 112, 128, 0.06));
  border: 1px solid rgba(40, 35, 30, 0.11);
  border-radius: 18px;
  padding: clamp(1.1rem, 2.2vw, 1.55rem);
  box-shadow: 0 18px 42px rgba(36, 31, 25, 0.08);
  overflow: hidden;
  min-width: 0;
`

const ShelfHeader = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.85rem;

  h2 {
    color: var(--ink);
    font-family: var(--font-display);
    font-size: clamp(1.08rem, 1.7vw, 1.32rem);
    font-weight: 800;
    line-height: 1.25;
  }

  p {
    color: var(--muted);
    font-size: 0.86rem;
    line-height: 1.5;
    margin-top: 0.25rem;
  }

  .hint {
    color: rgba(36, 31, 25, 0.48);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0;
    white-space: nowrap;
  }
`

const Rail = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(92px, 1fr));
  gap: 0.8rem;
  padding: 0.25rem 0;
  min-width: 0;
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
  height: ${(props) => (props.$compact ? '142px' : '160px')};
  border-radius: 6px;
  background: #f6f0e7;
  box-shadow:
    0 12px 22px rgba(34, 27, 22, 0.16),
    -5px 0 0 rgba(34, 27, 22, 0.08) inset;
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
    color: #7b4d2d;
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
    min-height: 2.25rem;
    color: var(--ink);
    font-size: 0.8rem;
    line-height: 1.45;
  }

  span {
    display: block;
    margin-top: 0.25rem;
    color: #866b55;
    font-size: 0.74rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const IndexGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 0.7rem;
`

const IndexLink = styled.a`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.8rem;
  min-width: 0;
  padding: 0.95rem 1rem;
  color: inherit;
  text-decoration: none;
  border: 1px solid rgba(38, 34, 30, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.58);
  box-shadow: 0 8px 18px rgba(38, 33, 27, 0.05);
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(38, 34, 30, 0.2);
    background: rgba(255, 255, 255, 0.8);
  }

  .rank {
    display: grid;
    place-items: center;
    width: 2.05rem;
    height: 2.05rem;
    border-radius: 999px;
    background: #24211d;
    color: #fffaf2;
    font-size: 0.76rem;
    font-weight: 850;
  }

  .body {
    min-width: 0;
  }

  strong {
    display: block;
    color: var(--ink);
    font-size: 0.93rem;
    font-weight: 820;
    line-height: 1.38;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .author {
    display: block;
    margin-top: 0.3rem;
    color: rgba(36, 31, 25, 0.58);
    font-size: 0.78rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .desc {
    display: -webkit-box;
    margin-top: 0.55rem;
    color: rgba(36, 31, 25, 0.66);
    font-size: 0.79rem;
    line-height: 1.48;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`

export default function BookShelf({ title, subtitle, books, compact = false }: BookShelfProps) {
  const hasAnyCover = books.some((book) => Boolean(book.image))

  return (
    <Shelf>
      <ShelfHeader>
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="hint">{hasAnyCover ? 'cover shelf' : 'reading index'}</div>
      </ShelfHeader>
      {hasAnyCover ? (
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
      ) : (
        <IndexGrid>
          {books.map((book, index) => (
            <IndexLink key={book.isbn ?? book.title} href={book.url} target="_blank" rel="noopener noreferrer">
              <span className="rank">{String(index + 1).padStart(2, '0')}</span>
              <span className="body">
                <strong>{book.title}</strong>
                <span className="author">{book.author}</span>
                {book.description && <span className="desc">{book.description}</span>}
              </span>
            </IndexLink>
          ))}
        </IndexGrid>
      )}
    </Shelf>
  )
}
