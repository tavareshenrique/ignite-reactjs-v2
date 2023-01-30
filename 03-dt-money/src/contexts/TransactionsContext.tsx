import { createContext, ReactNode, useEffect, useState } from 'react';

type TTransactionType = 'income' | 'outcome';

export interface ITransaction {
  id: number;
  description: string;
  type: TTransactionType;
  price: number;
  category: string;
  createdAt: string;
}

interface ITransactionContextType {
  transactions: ITransaction[];
}

interface ITransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as ITransactionContextType);

export function TransactionsProvider({ children }: ITransactionsProviderProps) {
	const [transactions, setTransactions] = useState<ITransaction[]>([]);

	useEffect(() => {
		async function loadTransactions() {
			const response = await fetch('http://localhost:3333/transactions');

			const data = await response.json();

			setTransactions(data);
		}

		loadTransactions();
	}, []);

	return (
		<TransactionsContext.Provider value={{ transactions }}>
			{children}
		</TransactionsContext.Provider>
	);
}
