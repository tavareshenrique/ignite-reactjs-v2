/* eslint-disable no-unused-vars */
import {
  createContext,
  useCallback,
  ReactNode,
  useState,
  useMemo,
} from 'react';

import { v4 as uuidv4 } from 'uuid';

import { getFromStorage, saveInStorage } from '../utils/localStorage';

type TodoType = {
  id: string;
  text: string;
  done: boolean;
};

export interface IToDoContextData {
  todos: TodoType[];
  totalTodos: number;
  totalDoneTodos: number;
  isEmpty: boolean;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  remmoveTodo: (id: string) => void;
}

interface IToDoProviderProps {
  children: ReactNode;
}

export const TodoContext = createContext<IToDoContextData>(
  {} as IToDoContextData
);

const KEY_TODOS = 'todos';

export function ToDoProvider({ children }: IToDoProviderProps) {
  const [todos, setTodos] = useState<TodoType[]>(() => {
    const todosFromStorage = getFromStorage(KEY_TODOS);

    if (todosFromStorage) {
      return todosFromStorage;
    }

    return [];
  });

  const isEmpty = todos.length === 0;

  const totalTodos = todos.length;

  const totalDoneTodos = useMemo(
    () => todos.filter((todo) => todo.done).length,
    [todos]
  );

  const addTodo = useCallback(
    (text: string) => {
      const id = uuidv4();

      const todo = {
        id,
        text,
        done: false,
      };

      setTodos([...todos, todo]);
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

  const remmoveTodo = useCallback(
    (id: string) => {
      const removeTodos = todos.filter((todo) => todo.id !== id);

      setTodos(removeTodos);
      saveInStorage(KEY_TODOS, removeTodos);
    },
    [todos]
  );

  const value = useMemo(
    () => ({
      todos,
      totalTodos,
      totalDoneTodos,
      isEmpty,
      addTodo,
      toggleTodo,
      remmoveTodo,
    }),
    [
      addTodo,
      isEmpty,
      remmoveTodo,
      todos,
      toggleTodo,
      totalDoneTodos,
      totalTodos,
    ]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
