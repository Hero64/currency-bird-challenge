import { useState } from 'react';
import Image from 'next/image';

import { BaseCurrency } from '@/types/currency';
import { Props } from './types';

import styles from './selector.module.css';

const CountryCurrencySelector = (props: Props) => {
  const { currencies = [], selectedCurrency, onCurrencyClick } = props;

  const [visible, setVisible] = useState(false);

  const handleOnSelectedCurrencyClick = () => {
    if (currencies.length > 1) {
      setVisible(!visible);
    }
  };

  const handleOnCurrencyClick = (currency: BaseCurrency) => () => {
    if (onCurrencyClick) {
      setVisible(!visible);
      onCurrencyClick(currency);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleOnSelectedCurrencyClick}>
        {currencies.length > 0 && <span className={styles.arrow}>▼</span>}
        <Image
          src={`/img/${selectedCurrency.flag_image}`}
          alt={selectedCurrency.abbr_name}
          height={38}
          width={40}
        />
      </button>
      {visible && (
        <ul className={styles.list}>
          {currencies.map((currency) => (
            <li
              key={currency.abbr_name}
              className={styles.currency_element}
              onClick={handleOnCurrencyClick(currency)}
            >
              <span className={styles.flag}>{currency.name}</span>
              <Image
                src={`/img/${currency.flag_image}`}
                alt={currency.abbr_name}
                height={38}
                width={40}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountryCurrencySelector;
