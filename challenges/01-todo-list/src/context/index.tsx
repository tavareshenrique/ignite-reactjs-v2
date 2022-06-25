import { ReactNode } from 'react';

import { ToDoProvider } from './ToDoContex';

interface IAppProvider {
  children: ReactNode;
}

export function AppProvider({ children }: IAppProvider) {
  return <ToDoProvider>{children}</ToDoProvider>;
}
