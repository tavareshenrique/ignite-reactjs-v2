import igniteLogo from '../assets/ignite-logo.svg';

import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <img src={igniteLogo} alt="Logotipo do Ignite" />
    </header>
  );
}
