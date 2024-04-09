import type { Metadata } from 'next'
import './globals.css'
import StyledComponentsRegistry from '@/styles/registry';
import Providers from './providers'


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
          {children}
        </Providers>
      </body>
    </html>
  )
}
