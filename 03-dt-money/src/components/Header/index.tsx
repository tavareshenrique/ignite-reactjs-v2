import * as Dialog from '@radix-ui/react-dialog';

import { NewTransactionModal } from '..';

import logoImg from '../../assets/logo.svg';

import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';

export function Header () {
	return (
		<HeaderContainer>
			<HeaderContent>
				<img src={logoImg} alt="" />

				<Dialog.Root>
					<Dialog.Trigger asChild>
						<NewTransactionButton type="button">
              Nova Transação
						</NewTransactionButton>
					</Dialog.Trigger>

					<NewTransactionModal />
				</Dialog.Root>
			</HeaderContent>
		</HeaderContainer>
	);
}
