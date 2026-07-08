// 알라딘 상품 검색 API 호출 및 응답 변환 로직.
// 앱 전체가 공유하는 Book 타입을 여기서 정의한다.

export interface Book {
  title: string
  author: string
  rating: number // 5점 만점
  price: number // 원
  url: string // 알라딘 상세/구매 링크
  description: string
  image?: string // 표지 URL (없으면 카드에서 이모지 폴백)
  theme?: string // 감정 테마 (기존 호환)
  isbn?: string // dedupe 및 추후 상세조회용
}

// 알라딘 ItemSearch 응답의 item 원소 (필요한 필드만)
interface AladinItem {
  title: string
  author: string
  description: string
  link: string
  cover: string
  priceSales: number
  customerReviewRank: number // 0~10
  isbn13: string
}

// 알라딘 정렬 옵션. 요청마다 번갈아 사용해 베스트셀러 외 최신·평점 책도 노출한다.
export const ALADIN_SORTS = ['SalesPoint', 'PublishTime', 'CustomerRating'] as const
export type AladinSort = (typeof ALADIN_SORTS)[number]

// 알라딘 item 하나를 앱 Book 형식으로 변환한다.
export function transformAladinItem(item: AladinItem, theme?: string): Book {
  return {
    title: item.title,
    author: item.author,
    // customerReviewRank(0~10) → 5점 만점, 소수 첫째 자리 반올림
    rating: Math.round((item.customerReviewRank / 2) * 10) / 10,
    price: item.priceSales,
    url: item.link,
    description: item.description,
    image: item.cover || undefined,
    isbn: item.isbn13 || undefined,
    theme,
  }
}

// isbn(없으면 title) 기준으로 중복을 제거한다. 입력 순서는 유지.
export function dedupeBooks(books: Book[]): Book[] {
  const seen = new Set<string>()
  const result: Book[] = []
  for (const book of books) {
    const key = book.isbn || book.title
    if (seen.has(key)) continue
    seen.add(key)
    result.push(book)
  }
  return result
}

// Fisher-Yates 셔플. rand 주입 가능(테스트용).
export function shuffle<T>(arr: T[], rand: () => number = Math.random): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface SearchOptions {
  sort?: AladinSort
  maxResults?: number
  signal?: AbortSignal
}

// 알라딘 검색 API를 호출해 Book[]을 반환한다.
// 키가 없거나 HTTP 오류면 throw → 호출 측(Route Handler)이 더미로 폴백한다.
export async function searchAladin(
  keyword: string,
  opts: SearchOptions = {}
): Promise<Book[]> {
  const ttbkey = process.env.ALADIN_TTB_KEY
  if (!ttbkey) throw new Error('ALADIN_TTB_KEY 환경변수가 설정되지 않았습니다')

  const params = new URLSearchParams({
    ttbkey,
    Query: keyword,
    QueryType: 'Keyword',
    SearchTarget: 'Book',
    MaxResults: String(opts.maxResults ?? 30),
    Sort: opts.sort ?? 'SalesPoint',
    Cover: 'Big',
    Output: 'JS',
    Version: '20131101',
  })

  const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?${params.toString()}`
  const res = await fetch(url, { signal: opts.signal, cache: 'no-store' })
  if (!res.ok) throw new Error(`알라딘 API HTTP ${res.status}`)

  // Output=JS는 JSON을 반환하지만 content-type이 애매할 수 있어 text로 받아 파싱한다.
  const text = await res.text()
  const data = JSON.parse(text)
  const items: AladinItem[] = Array.isArray(data.item) ? data.item : []
  return items.map((item) => transformAladinItem(item))
}
