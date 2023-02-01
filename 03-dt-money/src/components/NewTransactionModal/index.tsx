import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import { useContext } from 'react';
import { TransactionsContext } from '../../contexts/TransactionsContext';

const newTransactionFormSchema = z.object({
	description: z.string(),
	price: z.number(),
	category: z.string(),
	type: z.enum(['income', 'outcome']),
});

type TNewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
	const {
		control,
		register,
		handleSubmit,
		formState: { isSubmitting },
		reset
	} = useForm<TNewTransactionFormInputs>({
		resolver: zodResolver(newTransactionFormSchema),
		defaultValues: {
			type: 'income'
		}
	});

	const { createTransaction } = useContext(TransactionsContext);

	async function handleCreateNewTransaction(data: TNewTransactionFormInputs) {
		const { description, price, category, type } = data;

		await createTransaction({
			description,
			price,
			category,
			type
		});

		reset();
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

					<Controller
						control={control}
						name='type'
						render={({ field }) => {
							return (
								<TransactionType onValueChange={field.onChange} value={field.value}>
									<TransactionTypeButton value='income' variant='income' >
										<ArrowCircleUp size={24} />
                    Entrada
									</TransactionTypeButton>

									<TransactionTypeButton value='outcome' variant='outcome'>
										<ArrowCircleDown size={24} />
                    Saída
									</TransactionTypeButton>
								</TransactionType>
							);
						}}
					/>

					<button type='submit' disabled={isSubmitting}>
            Cadastrar
					</button>
				</form>

			</Content>
		</Dialog.Portal>
	);
}
