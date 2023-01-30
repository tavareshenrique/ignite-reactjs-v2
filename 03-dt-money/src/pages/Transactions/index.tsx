import { useContext } from 'react';
import { Header, Summary, SearchForm } from '../../components';

import { TransactionsContext } from '../../contexts/TransactionsContext';

import { PriceHighlight, TransactionsContainer, TransactionsTable } from './styles';

export function Transactions() {
	const { transactions } = useContext(TransactionsContext);

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
