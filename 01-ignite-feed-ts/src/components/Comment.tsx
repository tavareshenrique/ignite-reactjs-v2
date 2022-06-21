import { useState } from 'react';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { HandsClapping, Trash } from 'phosphor-react';

import { CommentType as CommentTypeMock } from '../mocks/comment.mock';

import { Avatar } from './Avatar';

import styles from './Comment.module.css';

export type CommentType = CommentTypeMock;

interface ICommentProps {
  comment: CommentType;
  onDeleteComment: (commentId: string) => void;
}

export function Comment({ comment, onDeleteComment }: ICommentProps) {
  const { author, publishAt, content } = comment;

  const [clapCount, setClapCount] = useState(0);

  const publishedDateFormatted = format(
    new Date(publishAt),
    "d 'de' LLLL 'de' yyyy 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(new Date(publishAt), {
    locale: ptBR,
    addSuffix: true,
  });

  function handleDeleteComment() {
    onDeleteComment(comment.id);
  }

  function handleClapComment() {
    setClapCount((oldClapCountValue) => oldClapCountValue + 1);
  }

  return (
    <div className={styles.comment}>
      <Avatar src={author.avatarUrl} alt={author.name} borderless />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{author.name}</strong>
              <time
                className={styles.date}
                title={publishedDateFormatted}
                dateTime={new Date(publishAt).toISOString()}
              >
                {publishedDateRelativeToNow}
              </time>
            </div>

            <button
              type="button"
              title="Deleter Comentário"
              onClick={handleDeleteComment}
            >
              <Trash size={24} />
            </button>
          </header>

          {content.map((line) => (
            <p key={line.id}>{line.content}</p>
          ))}
        </div>

        <footer>
          <button type="button" onClick={handleClapComment}>
            <HandsClapping />
            Aplaudir <span>{clapCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
