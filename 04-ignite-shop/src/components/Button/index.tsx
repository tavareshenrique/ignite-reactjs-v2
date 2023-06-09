import React from 'react';

import { ButtonComponent } from './styles';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode | string;
}

export function Button({ children, ...rest }: IButtonProps) {
  return <ButtonComponent {...rest}>{children}</ButtonComponent>;
}
