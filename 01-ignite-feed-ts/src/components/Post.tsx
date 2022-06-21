import { useState } from 'react';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { PostType as PostTypeMock } from '../mocks/post.mock';
import { commentMock } from '../mocks/comment.mock';

import { Avatar } from './Avatar';
import { Comment, CommentType } from './Comment';

import styles from './Post.module.css';

export type PostType = PostTypeMock ;

export interface IPostProps {
  post: PostType;
}

export function Post({ post }: IPostProps) {
  const { author, publishAt, content, comments: postComments } = post;

  const [comments, setComments] = useState<CommentType[]>(postComments);
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

  function handleCreateNewComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newComment = commentMock(newCommentText);

    setComments((oldComments) => [...oldComments, newComment]);
    setNewCommentText('');
  }

  function handleNewCommentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(event.target.value);

    event.target.setCustomValidity('');
  }

  function handleNewCommentInvalid(event: React.InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório.');
  }

  function deleteComment(commentId: string) {
    setComments((oldComments) => oldComments.filter((commentFilter) => commentFilter.id !== commentId));
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