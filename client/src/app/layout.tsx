import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'
import Header from '@/components/Header'


export const metadata: Metadata = {
  title: '벼룩',
  description: '중고거래 사이트',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ko'>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
