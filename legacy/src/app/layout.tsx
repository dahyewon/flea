import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

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
    <ThemeProvider theme={{}}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}

const GlobalStyle = createGlobalStyle`
  html,
  body,
  textarea {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, 'Helvetica Neue', sans-serif,
  }

  * {
    box-sizing: border-box;
  }

  a {
    cursor: pointer;
    text-decoration: none;
    transition: .25s;
    color: #000;
  }

  ol, ul {
    list-style: none;
  }
`
