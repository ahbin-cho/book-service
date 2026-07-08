import type { Metadata } from 'next'
import './styles/globals.css'

export const metadata: Metadata = {
  title: '1234 Book - AI 감정 맞춤 책 추천',
  description: '당신의 감정에 맞는 책을 AI가 추천해드립니다',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-light">
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-primary">1234 Book</h1>
            <p className="text-sm text-gray-500">감정이 만나는 책 추천 서비스</p>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
