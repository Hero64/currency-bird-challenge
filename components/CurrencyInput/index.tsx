import { ChangeEvent, KeyboardEvent, useId } from 'react';

import Selector from './Selector';
import { Props } from './types';

import styles from './input.module.css';

const CurrencyInput = (props: Props) => {
  const { value, label, onChange, ...selectorProps } = props;

  const id = useId();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value);
    onChange(amount);
  };

  const handleOnKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    const availableKeyboards = new Set([
      'Backspace',
      'ArrowRight',
      'ArrowLeft',
    ]);

    console.log(e.key);

    if (!/[0-9]/.test(e.key) && !availableKeyboards.has(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.sign}>$</span>
      <input
        type="text"
        id={id}
        value={value}
        className={styles.input}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyUp}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <Selector {...selectorProps} />
    </div>
  );
};

export default CurrencyInput;
