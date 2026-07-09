// 더미 책 데이터 (나중에 알라딘 API에서 가져올 것)
const booksDatabase = {
  '자존감을 잃지 마': [
    {
      title: '자존감의 심리학',
      author: '로버트 렉섭',
      rating: 4.5,
      price: 16800,
      url: 'https://www.aladin.co.kr',
      description: '자존감을 잃지 않기 위한 심리학적 접근법',
      theme: '자존감'
    },
    {
      title: '나는 왜 자신감이 없을까',
      author: '배리 리',
      rating: 4.2,
      price: 15000,
      url: 'https://www.aladin.co.kr',
      description: '자신감을 갖기 위한 실용적인 조언들',
      theme: '자존감'
    },
    {
      title: '자신감을 갖는 방법',
      author: '제임스 클리어',
      rating: 4.7,
      price: 18000,
      url: 'https://www.aladin.co.kr',
      description: '일상에서 자신감을 갖는 습관들',
      theme: '자존감'
    },
    {
      title: '당신은 충분하다',
      author: '미셀 버나드 코플리',
      rating: 4.4,
      price: 17000,
      url: 'https://www.aladin.co.kr',
      description: '있는 그대로의 자신을 받아들이기',
      theme: '자존감'
    },
    {
      title: '자아를 찾는 여정',
      author: '칼 융',
      rating: 4.3,
      price: 19000,
      url: 'https://www.aladin.co.kr',
      description: '자신의 진정한 모습을 발견하기',
      theme: '자존감'
    }
  ],
  '혼자가 아니야': [
    {
      title: '공감의 힘',
      author: '브레네 브라운',
      rating: 4.6,
      price: 16500,
      url: 'https://www.aladin.co.kr',
      description: '인간관계와 공감에 대한 따뜻한 이야기',
      theme: '관계'
    },
    {
      title: '혼자가 아니야',
      author: '장상미',
      rating: 4.4,
      price: 15800,
      url: 'https://www.aladin.co.kr',
      description: '누군가와 연결되는 경험에 대해',
      theme: '관계'
    },
    {
      title: '관계의 기술',
      author: '마크 그레니에',
      rating: 4.3,
      price: 17000,
      url: 'https://www.aladin.co.kr',
      description: '더 좋은 인간관계를 위한 가이드',
      theme: '관계'
    },
    {
      title: '친구의 조건',
      author: '김나영',
      rating: 4.2,
      price: 14500,
      url: 'https://www.aladin.co.kr',
      description: '진정한 친구 관계에 대한 성찰',
      theme: '관계'
    },
    {
      title: '소통하는 방법',
      author: '존 코맥',
      rating: 4.5,
      price: 16000,
      url: 'https://www.aladin.co.kr',
      description: '효과적인 소통의 기술',
      theme: '관계'
    }
  ],
  '작은 것도 감사해': [
    {
      title: '감사일기의 기적',
      author: '오프라 윈프리',
      rating: 4.7,
      price: 15000,
      url: 'https://www.aladin.co.kr',
      description: '감사의 마음으로 일상을 바꾸기',
      theme: '감사'
    },
    {
      title: '소확행',
      author: '나미키 타케오',
      rating: 4.5,
      price: 14800,
      url: 'https://www.aladin.co.kr',
      description: '작은 행복의 가치를 찾아가기',
      theme: '감사'
    },
    {
      title: '행복은 작은 것에서 온다',
      author: '로버트 칼리',
      rating: 4.6,
      price: 16200,
      url: 'https://www.aladin.co.kr',
      description: '일상의 소소한 행복 발견하기',
      theme: '감사'
    },
    {
      title: '감사하는 마음',
      author: '박진영',
      rating: 4.3,
      price: 13500,
      url: 'https://www.aladin.co.kr',
      description: '감사로 인생을 바꾸는 방법',
      theme: '감사'
    },
    {
      title: '현재에 감사하기',
      author: '에크하르트 톨레',
      rating: 4.4,
      price: 17800,
      url: 'https://www.aladin.co.kr',
      description: '지금 이 순간을 소중히 여기기',
      theme: '감사'
    }
  ],
  '내일은 내가 더 잘할 거야': [
    {
      title: '습관의 힘',
      author: '찰스 두히그',
      rating: 4.7,
      price: 16000,
      url: 'https://www.aladin.co.kr',
      description: '작은 습관이 만드는 큰 변화',
      theme: '성장'
    },
    {
      title: '아주 작은 습관의 힘',
      author: '제임스 클리어',
      rating: 4.8,
      price: 16800,
      url: 'https://www.aladin.co.kr',
      description: '1%의 개선이 만드는 기적',
      theme: '성장'
    },
    {
      title: '내일의 나를 위해',
      author: '윤슬아',
      rating: 4.4,
      price: 15600,
      url: 'https://www.aladin.co.kr',
      description: '변화와 성장의 여정',
      theme: '성장'
    },
    {
      title: '성공의 습관',
      author: '스티븐 코비',
      rating: 4.5,
      price: 18000,
      url: 'https://www.aladin.co.kr',
      description: '성공하는 사람들의 공통점',
      theme: '성장'
    },
    {
      title: '도전하는 용기',
      author: '셀레스트 헤드리',
      rating: 4.3,
      price: 16500,
      url: 'https://www.aladin.co.kr',
      description: '새로운 도전을 시작하는 방법',
      theme: '성장'
    }
  ],
  '마음이 무거워도 괜찮아': [
    {
      title: '마음이 무거울 때',
      author: '정혜신',
      rating: 4.6,
      price: 15800,
      url: 'https://www.aladin.co.kr',
      description: '감정을 있는 그대로 받아들이기',
      theme: '위로'
    },
    {
      title: '감정의 정화',
      author: '줄리언 무어헤드',
      rating: 4.4,
      price: 16200,
      url: 'https://www.aladin.co.kr',
      description: '힘든 감정과 마주하기',
      theme: '위로'
    },
    {
      title: '우울한 마음을 달래는 방법',
      author: '박상미',
      rating: 4.5,
      price: 15500,
      url: 'https://www.aladin.co.kr',
      description: '마음의 휴식이 필요할 때',
      theme: '위로'
    },
    {
      title: '감정에 말을 걸다',
      author: '김미경',
      rating: 4.3,
      price: 14800,
      url: 'https://www.aladin.co.kr',
      description: '감정과 친해지기',
      theme: '위로'
    },
    {
      title: '혼자여도 괜찮아',
      author: '이은영',
      rating: 4.4,
      price: 15200,
      url: 'https://www.aladin.co.kr',
      description: '혼자라는 느낌에서 벗어나기',
      theme: '위로'
    }
  ],
  '넌 충분해': [
    {
      title: '있는 그대로 충분하다',
      author: '크리스틴 노프',
      rating: 4.6,
      price: 16500,
      url: 'https://www.aladin.co.kr',
      description: '자신을 완벽하게 수용하기',
      theme: '수용'
    },
    {
      title: '넌 이미 충분해',
      author: '나탈리 가트만',
      rating: 4.5,
      price: 15800,
      url: 'https://www.aladin.co.kr',
      description: '자기 자신을 사랑하는 방법',
      theme: '수용'
    },
    {
      title: '완벽할 필요는 없어',
      author: '브라운 브레네',
      rating: 4.7,
      price: 17000,
      url: 'https://www.aladin.co.kr',
      description: '불완전함 속의 아름다움 발견',
      theme: '수용'
    },
    {
      title: '자기 자신을 사랑하는 법',
      author: '루이스 헤이',
      rating: 4.4,
      price: 14500,
      url: 'https://www.aladin.co.kr',
      description: '무조건적인 자기 사랑',
      theme: '수용'
    },
    {
      title: '있는 그대로 살아가기',
      author: '빅터 플랭클',
      rating: 4.5,
      price: 16800,
      url: 'https://www.aladin.co.kr',
      description: '삶의 의미를 찾는 여정',
      theme: '수용'
    }
  ]
}

export function getRecommendedBooks(emotion: string, count: number = 5) {
  const emotionKey = emotion as keyof typeof booksDatabase
  const books = booksDatabase[emotionKey] || []
  
  // 평점 기준으로 정렬하고 요청한 개수만큼 반환
  return books
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count)
}

export function getFallbackBestSellers(count: number = 10) {
  return Object.values(booksDatabase)
    .flat()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count)
}

// 감정과 책의 연결고리를 설명하는 함수 (나중에 Claude API로 대체될 부분)
export function getRecommendationReason(emotion: string, bookTitle: string): string {
  const reasons: { [key: string]: string } = {
    '자존감을 잃지 마': '이 책은 당신의 가치를 다시 발견하는 데 도움을 줄 거예요. 자존감이 떨어진 순간, 이 책이 당신 곁에 있어줄 거입니다.',
    '혼자가 아니야': '누군가와의 따뜻한 연결을 그려내는 이 책은 당신이 혼자가 아니라는 것을 느끼게 해줄 거예요.',
    '작은 것도 감사해': '일상의 소소한 순간들의 소중함을 깨닫게 해주는 책입니다. 작은 감사가 모여서 큰 행복이 되는 경험을 할 거예요.',
    '내일은 내가 더 잘할 거야': '변화와 성장의 여정을 함께할 이 책은 내일의 당신을 응원하고 있습니다.',
    '마음이 무거워도 괜찮아': '마음이 무겁다는 것은 정상입니다. 이 책은 당신의 감정을 받아주고 위로해줄 거예요.',
    '넌 충분해': '있는 그대로의 당신을 사랑하게 해주는 책입니다. 완벽해야 한다는 부담을 내려놓을 거예요.'
  }
  
  return reasons[emotion] || '이 책이 당신의 마음을 따뜻하게 안아줄 거예요.'
}
