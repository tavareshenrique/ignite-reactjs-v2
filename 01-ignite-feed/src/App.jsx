
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

import './global.css'

import styles from './App.module.css'

function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper} >
        <Sidebar />
        <main>main</main>
      </div>
    </>
  )
}

export default App
