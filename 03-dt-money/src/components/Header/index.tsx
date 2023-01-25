import * as Dialog from '@radix-ui/react-dialog';

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

					<Dialog.Portal>
						<Dialog.Overlay />

						<Dialog.Content>
							<Dialog.Title>Nova Transação</Dialog.Title>
							<Dialog.Close />
						</Dialog.Content>
					</Dialog.Portal>
				</Dialog.Root>
			</HeaderContent>
		</HeaderContainer>
	);
}
