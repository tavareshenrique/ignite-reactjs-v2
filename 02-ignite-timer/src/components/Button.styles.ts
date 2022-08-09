import styled from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface IButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariant = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
}

export const ButtonContainer = styled.button<IButtonContainerProps>`
  width: 100px;
  height: 40px;

  background-color: ${props => props.theme['green-500']};
`;
