import logo from '../../assets/logo.svg';

import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header} >
      <img src={logo} alt="Logo do ToDo" />
    </header>
  );
}
