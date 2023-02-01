import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';

const newTransactionFormSchema = z.object({
	description: z.string(),
	price: z.number(),
	category: z.string(),
	// type: z.enum(['income', 'outcome']),
});

type TNewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting }
	} = useForm<TNewTransactionFormInputs>({
		resolver: zodResolver(newTransactionFormSchema),
	});

	async function handleCreateNewTransaction(data: TNewTransactionFormInputs) {
		console.log(data);
	}

	return (
		<Dialog.Portal>
			<Overlay />

			<Content>
				<Dialog.Title>Nova Transação</Dialog.Title>

				<CloseButton>
					<X size={24} />
				</CloseButton>

				<form onSubmit={handleSubmit(handleCreateNewTransaction)}>
					<input
						type='text'
						placeholder='Descrição'
						required
						{...register('description')}
					/>

					<input
						type='number'
						placeholder='Valor'
						required
						{...register('price', { valueAsNumber: true })}
					/>

					<input
						type='text'
						placeholder='Categoria'
						required
						{...register('category')}
					/>

					<TransactionType>
						<TransactionTypeButton value='income' variant='income' >
							<ArrowCircleUp size={24} />
              Entrada
						</TransactionTypeButton>

						<TransactionTypeButton value='outcome' variant='outcome'>
							<ArrowCircleDown size={24} />
              Saída
						</TransactionTypeButton>
					</TransactionType>

					<button type='submit' disabled={isSubmitting}>
            Cadastrar
					</button>
				</form>

			</Content>
		</Dialog.Portal>
	);
}
