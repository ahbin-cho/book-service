import { NextRequest, NextResponse } from 'next/server'
import { pickKeyword } from '@/lib/emotionKeywords'
import {
  searchAladin,
  getAladinBestSellers,
  dedupeBooks,
  shuffle,
  ALADIN_SORTS,
  type Book,
} from '@/lib/aladin'
import { getRecommendedBooks } from '@/lib/matching'

// 다양성을 위해 매 요청 다르게 응답해야 하므로 캐시하지 않는다.
export const dynamic = 'force-dynamic'

const ALADIN_TIMEOUT_MS = 5000

// GET /api/books?emotion=<감정>&count=<권수>
// 항상 200 + { source, books } 로 응답한다(클라이언트가 항상 목록을 받도록).
export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type') ?? ''
  const emotion = req.nextUrl.searchParams.get('emotion') ?? ''
  const context = req.nextUrl.searchParams.get('context')?.trim() ?? ''
  const count = Math.max(1, Number(req.nextUrl.searchParams.get('count') ?? 5) || 5)

  // 알라딘 실패/키없음/결과0건일 때 돌아갈 더미 목록
  const fallback = (): Book[] => getRecommendedBooks(emotion, count) as Book[]

  if (type === 'bestseller') {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), ALADIN_TIMEOUT_MS)

    try {
      const books = dedupeBooks(await getAladinBestSellers({
        maxResults: count,
        signal: controller.signal,
      })).slice(0, count)

      if (books.length === 0) {
        return NextResponse.json({ source: 'fallback', books: fallback() })
      }
      return NextResponse.json({ source: 'aladin-bestseller', books })
    } catch (err) {
      console.error('[api/books] 알라딘 베스트셀러 호출 실패, 더미로 폴백:', err)
      return NextResponse.json({ source: 'fallback', books: fallback() })
    } finally {
      clearTimeout(timer)
    }
  }

  const baseKeyword = pickKeyword(emotion)
  const keyword = context && baseKeyword ? `${baseKeyword} ${context}` : baseKeyword
  if (!keyword) {
    // 알 수 없는 감정 → 더미
    return NextResponse.json({ source: 'fallback', books: fallback() })
  }

  const sort = ALADIN_SORTS[Math.floor(Math.random() * ALADIN_SORTS.length)]

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ALADIN_TIMEOUT_MS)

  try {
    let raw = await searchAladin(keyword, {
      sort,
      maxResults: 30,
      signal: controller.signal,
    })

    if (raw.length === 0 && context && baseKeyword) {
      raw = await searchAladin(baseKeyword, {
        sort,
        maxResults: 30,
        signal: controller.signal,
      })
    }
    // 넉넉히 받아 → 중복 제거 → 셔플 → 상위 count권
    const books = shuffle(dedupeBooks(raw)).slice(0, count)

    if (books.length === 0) {
      return NextResponse.json({ source: 'fallback', books: fallback() })
    }
    return NextResponse.json({ source: 'aladin', keyword, books })
  } catch (err) {
    // 오류 상세는 서버 로그에만 남기고 클라이언트엔 노출하지 않는다.
    console.error('[api/books] 알라딘 호출 실패, 더미로 폴백:', err)
    return NextResponse.json({ source: 'fallback', books: fallback() })
  } finally {
    clearTimeout(timer)
  }
}
