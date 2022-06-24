import { useCallback } from 'react';
import { useToDo } from '../../../hooks/useToDo';

import clipboardImg from '../../../assets/clipboard.svg';

import styles from './ToDo.module.css';
import { Card } from './Card/Card';

export default function ToDo() {
  const { isEmpty } = useToDo();

  const EmptyListComponent = useCallback(
    () => (
      <div className={styles.empty__list}>
        <img
          src={clipboardImg}
          alt="Imagem de um icone de clipboard"
          title="Icone de Clipboard"
        />
        <div className={styles.empty__list_titles}>
          <h3>Você ainda não tem tarefas cadastradas.</h3>
          <h4>Crie tarefas e organize seus itens a fazer.</h4>
        </div>
      </div>
    ),
    []
  );

  return (
    <section className={styles.wrapper}>
      {isEmpty ? <EmptyListComponent /> : <Card />}
    </section>
  );
}
