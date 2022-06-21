import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

import styles from './InputField.module.css';

export function InputField() {
  return (
    <div className={styles.container}>
      <Input placeholder="Adicione uma nova tarefa" />

      <Button>Criar</Button>
    </div>
  );
}
