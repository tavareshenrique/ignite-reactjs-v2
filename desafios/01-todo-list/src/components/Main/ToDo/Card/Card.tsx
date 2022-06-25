/* eslint-disable jsx-a11y/label-has-associated-control */
import { Trash } from 'phosphor-react';
import { useToDo } from '../../../../hooks/useToDo';

import styles from './Card.module.css';

export function Card() {
  const { toggleTodo, todos, remmoveTodo } = useToDo();

  return (
    <ul className={styles.container}>
      {todos.map((todo) => (
        <li key={todo.id} className={styles.wrapper}>
          <button
            className={styles.checkbox}
            type="button"
            onClick={() => toggleTodo(todo.id)}
          >
            <div
              id="checkbox"
              className={`${styles.check}  ${todo.done ? styles.checked : ''}`}
            />
            <label htmlFor="checkbox" />
          </button>

          <div
            className={`${styles.text} ${
              todo.done ? styles.strikethroughText : ''
            }`}
          >
            <p>{todo.text}</p>
          </div>

          <button
            onClick={() => remmoveTodo(todo.id)}
            className={styles.trash}
            type="button"
            title="Deletar ToDo"
          >
            <Trash size={20} />
          </button>
        </li>
      ))}
    </ul>
  );
}
