import React from 'react';

import styles from './Input.module.css';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export function Input({ placeholder, ...rest }: IInputProps) {
  return <input className={styles.input} {...rest} placeholder={placeholder} />;
}
