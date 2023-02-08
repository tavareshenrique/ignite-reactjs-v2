import { memo } from 'react'
import { useContextSelector } from 'use-context-selector'

import { useForm } from 'react-hook-form'

import { MagnifyingGlass } from 'phosphor-react'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { TransactionsContext } from '../../contexts/TransactionsContext'

import { SearchFormContainer } from './styles'

const searchFormSchema = z.object({
  query: z.string(),
})

type TSearchFormInputs = z.infer<typeof searchFormSchema>

function SearchFormComponent() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TSearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  async function handleSearchTransactions(data: TSearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações."
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

export const SearchForm = memo(SearchFormComponent)
