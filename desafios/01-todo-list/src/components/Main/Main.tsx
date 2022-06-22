import styles from './Main.module.css';

export function Main() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.info__data}>
          <span className={styles.info__title}>Tarefas Criadas</span>
          <div className={styles.info_value_wrapper}>
            <small className={styles.info__value}>0</small>
          </div>
        </div>

        <div className={styles.info__data}>
          <span className={`${styles.info__title} ${styles.info__title_done}`}>
            Concluidas
          </span>
          <div className={styles.info_value_wrapper}>
            <small className={styles.info__value}>0</small>
          </div>
        </div>
      </div>
    </main>
  );
}
