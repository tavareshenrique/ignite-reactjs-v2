import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'

import { api } from '../lib/axios'

type TTransactionType = 'income' | 'outcome'

export interface ITransaction {
  id: number
  description: string
  type: TTransactionType
  price: number
  category: string
  createdAt: string
}

type TCreateTransactionProps = Omit<ITransaction, 'id' | 'createdAt'>

interface ITransactionContextType {
  transactions: ITransaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: TCreateTransactionProps) => Promise<void>
}

interface ITransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as ITransactionContextType)

export function TransactionsProvider({ children }: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }, [])

  const createTransaction = useCallback(
    async (data: TCreateTransactionProps) => {
      const { category, description, price, type } = data

      const response = await api.post('/transactions', {
        category,
        description,
        price,
        type,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
