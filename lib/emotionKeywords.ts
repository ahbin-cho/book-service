// 감정별 알라딘 검색 키워드 풀.
// 요청마다 이 안에서 하나를 랜덤 선택해 검색하므로, 같은 감정이라도 다양한 책이 노출된다.
export const emotionKeywords: Record<string, string[]> = {
  '자존감을 잃지 마': ['자존감', '자기 사랑', '자신감', '나답게'],
  '혼자가 아니야': ['인간관계', '관계', '외로움', '소통'],
  '작은 것도 감사해': ['감사', '행복', '소확행', '마음챙김'],
  '내일은 내가 더 잘할 거야': ['습관', '자기계발', '성장', '루틴'],
  '마음이 무거워도 괜찮아': ['마음 위로', '감정 에세이', '위로', '괜찮아'],
  '넌 충분해': ['자기수용', '자존감', '위로', '있는 그대로'],
}

// 감정에 매핑된 키워드 풀에서 하나를 무작위로 고른다. (없으면 null)
export function pickKeyword(
  emotion: string,
  rand: () => number = Math.random
): string | null {
  const pool = emotionKeywords[emotion]
  if (!pool || pool.length === 0) return null
  return pool[Math.floor(rand() * pool.length)]
}
