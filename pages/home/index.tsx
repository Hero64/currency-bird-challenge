import { useRef, useState } from 'react';
import Head from 'next/head';

import CurrencyInput from '@/components/CurrencyInput';
import useRequest from '@/hooks/useRequest';

import { CURRENCIES } from '@/constants/currencies';
import { BaseCurrency } from '@/types/currency';
import { Props, Response, CurrencySendType } from './types';

import styles from './home.module.css';

export async function getStaticProps() {
  const currencies: BaseCurrency[] = CURRENCIES.map(
    ({ name, code, flag_image }) => ({
      name,
      code,
      flag_image,
    })
  );

  return {
    props: {
      currencies,
    },
  };
}

const Home = (props: Props) => {
  const { currencies } = props;

  const timer = useRef<any>();
  const [currency, setCurrency] = useState(currencies[0]);
  const [sended, setSended] = useState(0);
  const [received, setReceived] = useState(0);
  const { request } = useRequest();

  const postCalculateQuote = async (
    value: number,
    type: CurrencySendType,
    currencyCode: string,
    setResult: (value: number) => void
  ) => {
    const { amount } = await request<Response>(`quote/${type}`, {
      method: 'POST',
      data: {
        amount: value,
        currencyCode,
      },
    });

    setResult(amount);
  };

  const calculateCurrencyAmount = (
    value: number,
    type: CurrencySendType,
    setValue: (value: number) => void,
    setResult: (value: number) => void
  ) => {
    timer.current && clearTimeout(timer.current);
    setValue(value);
    if (value === 0) {
      setResult(0);
      return;
    }
    timer.current = setTimeout(() => {
      postCalculateQuote(value, type, currency.code, setResult);
    }, 400);
  };

  const handleOnCurrencyClick = (selectedCurrency: BaseCurrency) => {
    setCurrency(selectedCurrency);

    if (received > 0) {
      postCalculateQuote(received, 'receive', selectedCurrency.code, setSended);
    }
  };

  const handleOnSendedChange = (value: number) => {
    calculateCurrencyAmount(value, 'send', setSended, setReceived);
  };

  const handleOnReceivedChange = (value: number) => {
    calculateCurrencyAmount(value, 'receive', setReceived, setSended);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Currency - Challenge</title>
        <meta name="description" content="A simple challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Cotizador</h1>
        <CurrencyInput
          value={sended > 0 ? sended.toString() : ''}
          label="Envias"
          onChange={handleOnSendedChange}
          selectedCurrency={{
            name: 'Pesos Chilenos',
            code: 'CLP',
            flag_image: 'chile.png',
          }}
        />
        <CurrencyInput
          value={received > 0 ? received.toString() : ''}
          label="Recibirá"
          onChange={handleOnReceivedChange}
          selectedCurrency={currency}
          currencies={currencies}
          onCurrencyClick={handleOnCurrencyClick}
        />
      </main>
    </div>
  );
};

export default Home;
