import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

export function Post() {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            src="https://avatars.githubusercontent.com/u/27022914?v=4" 
            alt="Henrique Tavares"
          />

          <div className={styles.authorInfo}>
            <strong>Henrique Tavares</strong>
            <span>Front-End Developer</span>
          </div>
        </div>

        <time title='06 de Junho às 18:32:16' dateTime="2022-06-06 18:32:16"  className={styles.date}>
          Publicado há 1h
        </time>
      </header>

      <div className={styles.content}>
        <p>Fala galeraa 👋</p>
        <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀</p>
        <p>
          <a href="#">👉 jane.design/doctorcare</a>
        </p>
        <p>
          <a href="#novoprojeto">#novoprojeto</a>
          {' '}
          <a href="#nlw">#nlw</a>
          {' '}
          <a href="#rocketseat">#rocketseat</a>
        </p>        
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu Feedback</strong>

        <textarea 
          placeholder="Escreva um comentário..."
        />

        <footer>
          <button type="submit">
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList} >
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  )
}