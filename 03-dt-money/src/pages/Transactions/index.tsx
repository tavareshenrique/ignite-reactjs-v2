import { useEffect, useState } from 'react';
import { Header, Summary, SearchForm } from '../../components';

import { PriceHighlight, TransactionsContainer, TransactionsTable } from './styles';

type TTransactionType = 'income' | 'outcome';

interface ITransaction {
  id: number;
  description: string;
  type: TTransactionType;
  price: number;
  category: string;
  createdAt: string;
}

export function Transactions() {
	const [transactions, setTransactions] = useState<ITransaction[] | null>(null);

	async function loadTransactions() {
		const response = await fetch('http://localhost:3333/transactions');

		const data = await response.json();

		setTransactions(data);
	}

	useEffect(() => {
		loadTransactions();
	}, []);

	return (
		<div>
			<Header />
			<Summary />

			<TransactionsContainer>
				<SearchForm />

				<TransactionsTable>
					<tbody>
						{transactions?.map((transaction) => (
							<tr key={transaction.id} >
								<td width="50%">{transaction.description}</td>
								<td>
									<PriceHighlight variant='income'>
										{transaction.price}
									</PriceHighlight>
								</td>
								<td>{transaction.category}</td>
								<td>{transaction.createdAt}</td>
							</tr>
						))}
					</tbody>
				</TransactionsTable>
			</TransactionsContainer>
		</div>
	);
}
