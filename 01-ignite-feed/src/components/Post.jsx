import { useState } from 'react';
import PropTypes from 'prop-types';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { commentMock } from '../mocks/comment.mock';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';

export function Post({ post }) {
  const { author, publishAt, content, comments: postComments } = post;

  const [comments, setComments] = useState(postComments);
  const [newCommentText, setNewCommentText] = useState('');

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

  function handleCreateNewComment(event) {
    event.preventDefault();

    const newComment = commentMock(newCommentText);

    setComments([...comments, newComment]);

    setNewCommentText('');
  }

  function handleNewCommentChange(event) {
    setNewCommentText(event.target.value);

    event.target.setCustomValidity('');
  }

  function handleNewCommentInvalid(event) {
    event.target.setCustomValidity('Esse campo é obrigatório.');
  }

  function deleteComment(commentId) {
    setComments(comments.filter((comment) => comment.id !== commentId));
  }

  const inNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} alt={author.name} />

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
            return <p key={line.id}>{line.content}</p>;
          }

          return (
            <p key={line.id}>
              <a href={`#${line.content}`}>{line.content}</a>
            </p>
          );
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu Feedback</strong>

        <textarea
          name="comment"
          placeholder="Escreva um comentário..."
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={inNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }).isRequired,
    content: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    ).isRequired,
    publishAt: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
