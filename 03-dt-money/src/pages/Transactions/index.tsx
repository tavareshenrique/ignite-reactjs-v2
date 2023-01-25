import { Header, Summary } from '../../components';

import { PriceHighlight, TransactionsContainer, TransactionsTable } from './styles';

export function Transactions() {
	return (
		<div>
			<Header />
			<Summary />
			<TransactionsContainer>
				<TransactionsTable>
					<tbody>
						<tr>
							<td width="50%">Desenvolvimento de site</td>
							<td>
								<PriceHighlight variant='income'>
                  R$ 12.000,00
								</PriceHighlight>
							</td>
							<td>Venda</td>
							<td>13/01/2023</td>
						</tr>
						<tr>
							<td width="50%">Hamburguer</td>
							<td>
								<PriceHighlight variant='outcome'>
                  -R$ 59,90
								</PriceHighlight>
							</td>
							<td>Venda</td>
							<td>12/01/2023</td>
						</tr>
					</tbody>
				</TransactionsTable>
			</TransactionsContainer>
		</div>
	);
}
