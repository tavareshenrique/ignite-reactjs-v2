import { useContext } from 'react';
import { Header, Summary, SearchForm } from '../../components';

import { TransactionsContext } from '../../contexts/TransactionsContext';

import { priceFormatter } from '../../services/format/currency';
import { dateFormatter } from '../../services/format/date';

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
									<PriceHighlight variant={transaction.type}>
										{transaction.type === 'outcome' && '- '}
										{priceFormatter.format(transaction.price)}
									</PriceHighlight>
								</td>
								<td>{transaction.category}</td>
								<td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
							</tr>
						))}
					</tbody>
				</TransactionsTable>
			</TransactionsContainer>
		</div>
	);
}
