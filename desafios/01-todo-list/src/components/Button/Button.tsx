import React from 'react';

import styles from './Button.module.css';

interface IButonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...rest }: IButonProps) {
  return (
    <button type="submit" className={styles.button} {...rest}>
      {children}
    </button>
  );
}
