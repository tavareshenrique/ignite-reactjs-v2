import { HandsClapping, Trash } from 'phosphor-react';

import styles from './Comment.module.css';

export function Comment() {
  return (
    <div className={styles.comment}>
      <img 
        src="https://avatars.githubusercontent.com/u/27022914?v=4" 
        alt="Henrique Tavares" 
        className={styles.avatar}
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent} >
          <header>
            <div className={styles.authorAndTime}>
              <strong>Henrique Tavares</strong>
              <time title='06 de Junho às 18:32:16' dateTime="2022-06-06 18:32:16"  className={styles.date}>
                Cerca de 1h atrás
              </time>
            </div>

            <button type="button" title="Deleter Comentário">
              <Trash size={20} />
            </button>
          </header>

          <p>Muito bom!</p>
        </div>

        <footer>
          <button>
            <HandsClapping />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  )
}