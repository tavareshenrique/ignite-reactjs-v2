
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Post } from './components/Post'

import './global.css'

import styles from './App.module.css'

function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper} >
        <Sidebar />
        <main>
          <Post />
        </main>
      </div>
    </>
  )
}

export default App
