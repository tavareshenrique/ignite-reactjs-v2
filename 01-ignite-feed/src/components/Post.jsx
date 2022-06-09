import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

export function Post({ post }) {
  const { author, publishAt, content } = post

  const publishedDateFormatted = format(new Date(publishAt), "d 'de' LLLL 'de' yyyy 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(new Date(publishAt), {
    locale: ptBR,
    addSuffix: true,
  });

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            src={author.avatarUrl} 
            alt={author.name}
          />

          <div className={styles.authorInfo}>
            <strong>{author.name} </strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time 
          className={styles.date}
          title={publishedDateFormatted} 
          dateTime={new Date(publishAt).toISOString()}  
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === 'paragraph') {
            return <p key={line.id}>{line.content}</p>
          }

          return <p><a href='#' key={line.id}>{line.content}</a></p>
        })}      
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