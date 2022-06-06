import styles from './Post.module.css'

export function Post() {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <img 
            src="https://avatars.githubusercontent.com/u/27022914?v=4" 
            alt="Henrique Tavares" 
            className={styles.avatar}
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
        <p><a href="#">👉 jane.design/doctorcare</a></p>
        <p><a href="#novoprojeto">#novoprojeto</a></p>
        <p><a href="#nlw">#nlw</a></p>
        <p><a href="#rocketseat">#rocketseat</a></p>
      </div>
    </article>
  )
}