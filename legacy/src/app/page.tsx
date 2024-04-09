import RootLayout from './layout'
import styles from './page.module.css'

function Home() {
  return (
    <div>
      <h1>홈 화면</h1>
    </div>
  )
}

export default function App() {
  return (
    <RootLayout>
      <Home />
    </RootLayout>
  )
}
