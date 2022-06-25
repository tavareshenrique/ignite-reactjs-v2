import { useContext } from 'react';
import {
  IToDoContextData,
  TodoContext,
  ToDoProvider,
} from '../context/ToDoContex';

function useToDo(): IToDoContextData {
  const context = useContext(TodoContext);

  return context;
}

export { ToDoProvider, useToDo };
