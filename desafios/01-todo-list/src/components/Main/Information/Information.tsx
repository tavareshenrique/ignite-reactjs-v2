import styles from './Information.module.css';

export function Information() {
  return (
    <section className={styles.info}>
      <section className={styles.info__data}>
        <span className={styles.info__title}>Tarefas Criadas</span>
        <div className={styles.info_value_wrapper}>
          <small className={styles.info__value}>0</small>
        </div>
      </section>

      <section className={styles.info__data}>
        <span className={`${styles.info__title} ${styles.info__title_done}`}>
          Concluidas
        </span>
        <div className={styles.info_value_wrapper}>
          <small className={styles.info__value}>0</small>
        </div>
      </section>
    </section>
  );
}
