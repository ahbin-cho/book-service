export interface MomoTheme {
  label: string
  cue: string
  name: string
  line: string
  image: string
  accent: string
  wash: string
  panel: string
}

const themes: Record<string, MomoTheme> = {
  '오늘은 좀 쉬고 싶어': {
    label: '쉬고 싶어',
    cue: '피곤한 날',
    name: '쉬는 모모',
    line: '부담 없는 선택부터 시작해요.',
    image: '/momo-rest.png',
    accent: '#8b7a62',
    wash: '#f3eadc',
    panel: '#6a5a49',
  },
  '자존감을 잃지 마': {
    label: '나를 챙기기',
    cue: '스스로에게 박한 날',
    name: '응원 모모',
    line: '나에게 덜 엄격해지는 쪽으로요.',
    image: '/momo-boost.png',
    accent: '#a27476',
    wash: '#f4e7e4',
    panel: '#745553',
  },
  '혼자가 아니야': {
    label: '외롭지 않게',
    cue: '온기가 필요한 날',
    name: '대화 모모',
    line: '혼자 읽어도 덜 외로운 쪽으로요.',
    image: '/momo-connect.png',
    accent: '#6f8190',
    wash: '#e8edf0',
    panel: '#53616a',
  },
  '관계를 다시 돌보고 싶어': {
    label: '관계 정리',
    cue: '말과 마음이 꼬인 날',
    name: '대화 모모',
    line: '관계를 조금 단순하게 보는 쪽으로요.',
    image: '/momo-connect.png',
    accent: '#7f745d',
    wash: '#eee8d9',
    panel: '#615946',
  },
  '내일은 내가 더 잘할 거야': {
    label: '다시 루틴',
    cue: '작은 실행이 필요한 날',
    name: '응원 모모',
    line: '작게 움직일 수 있는 쪽으로요.',
    image: '/momo-boost.png',
    accent: '#6f7b67',
    wash: '#e8eddf',
    panel: '#55604e',
  },
  '용기가 필요해': {
    label: '용기 충전',
    cue: '망설임이 큰 날',
    name: '응원 모모',
    line: '큰 결심보다 작은 용기 쪽으로요.',
    image: '/momo-boost.png',
    accent: '#9b7657',
    wash: '#f0e4d8',
    panel: '#70513a',
  },
  '작은 것도 감사해': {
    label: '작은 기쁨',
    cue: '일상을 다시 보고 싶은 날',
    name: '쉬는 모모',
    line: '작은 장면이 오래 남는 쪽으로요.',
    image: '/momo-rest.png',
    accent: '#9a8251',
    wash: '#f2ead4',
    panel: '#75613a',
  },
  '다시 시작하고 싶어': {
    label: '새 출발',
    cue: '리셋이 필요한 날',
    name: '응원 모모',
    line: '다시 시작하는 감각 쪽으로요.',
    image: '/momo-boost.png',
    accent: '#6f836f',
    wash: '#e5ecdf',
    panel: '#566653',
  },
  '마음을 정리하고 싶어': {
    label: '생각 정리',
    cue: '머릿속이 복잡한 날',
    name: '몰입 모모',
    line: '머릿속이 덜 복잡해지는 쪽으로요.',
    image: '/momo-deep.png',
    accent: '#777087',
    wash: '#ebe8f0',
    panel: '#5d5869',
  },
  '가볍게 웃고 싶어': {
    label: '가볍게 웃기',
    cue: '심각함을 끄고 싶은 날',
    name: '대화 모모',
    line: '생각이 무거워지지 않는 쪽으로요.',
    image: '/momo-connect.png',
    accent: '#a0805e',
    wash: '#f2e7d8',
    panel: '#745c43',
  },
  '깊이 몰입하고 싶어': {
    label: '깊게 몰입',
    cue: '현실 소음을 낮추고 싶은 날',
    name: '몰입 모모',
    line: '현실 소음을 낮추는 쪽으로요.',
    image: '/momo-deep.png',
    accent: '#67707b',
    wash: '#e5e8eb',
    panel: '#4d555d',
  },
  '조용히 혼자 있고 싶어': {
    label: '혼자 있기',
    cue: '내 속도가 필요한 날',
    name: '몰입 모모',
    line: '혼자 있는 시간이 편한 쪽으로요.',
    image: '/momo-deep.png',
    accent: '#6c7569',
    wash: '#e7ebe4',
    panel: '#535b51',
  },
}

export const defaultMomoTheme: MomoTheme = {
  label: '오늘의 책장',
  cue: '지금 기분에 맞춰 보기',
  name: '북큐 모모',
  line: '지금 읽기 좋은 책을 추려볼게요.',
  image: '/momo-rest.png',
  accent: '#7d6654',
  wash: '#f1e7da',
  panel: '#594637',
}

export function getMomoTheme(emotion?: string | null) {
  if (!emotion) return defaultMomoTheme
  return themes[emotion] ?? defaultMomoTheme
}
