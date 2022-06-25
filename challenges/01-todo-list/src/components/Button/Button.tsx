/* eslint-disable react/button-has-type */
import React from 'react';

import styles from './Button.module.css';

interface IButonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, type = 'button', ...rest }: IButonProps) {
  return (
    <button type={type} className={styles.button} {...rest}>
      {children}
    </button>
  );
}
