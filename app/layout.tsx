import type { Metadata } from 'next'
import './styles/globals.css'

export const metadata: Metadata = {
  title: '북큐 모모 - 마음별 책 큐레이션',
  description: '오늘 마음에 어울리는 책을 산뜻하게 추천합니다',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  )
}
