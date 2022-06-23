import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { getFromStorage, saveInStorage } from '../utils/localStorage';

export interface ITodo {
  id: string;
  text: string;
  done: boolean;
}

const KEY_TODOS = 'todos';

export function useToDo() {
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const todosFromStorage = getFromStorage(KEY_TODOS);

    if (todosFromStorage) {
      return todosFromStorage;
    }

    return [];
  });

  const isEmpty = todos.length === 0;

  const addTodo = useCallback(
    (text: string) => {
      const todo = {
        id: uuidv4(),
        text,
        done: false,
      };

      setTodos((oldTodos) => [...oldTodos, todo]);
      saveInStorage(KEY_TODOS, todos);
    },
    [todos]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      const toggleTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      });

      setTodos(toggleTodos);
      saveInStorage(KEY_TODOS, toggleTodos);
    },
    [todos]
  );

  return {
    isEmpty,
    todos,
    addTodo,
    toggleTodo,
  };
}
