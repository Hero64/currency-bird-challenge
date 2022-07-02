import { useState } from 'react';
import Head from 'next/head';

import CurrencyInput from '@/components/CurrencyInput';

import { CURRENCIES } from '@/constants/currencies';
import { BaseCurrency } from '@/types/currency';
import { Props } from './types';

import styles from './home.module.css';
import useRequest from '@/hooks/useRequest';

export async function getStaticProps() {
  const currencies: BaseCurrency[] = CURRENCIES.map(
    ({ name, abbr_name, flag_image }) => ({
      name,
      abbr_name,
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

  const [currency, setCurrency] = useState(currencies[0]);
  const [sended, setSended] = useState(0);
  const [received, setReceived] = useState(0);
  const { request } = useRequest();

  const handleOnCurrencyClick = (selectedCurrency: BaseCurrency) => {
    setCurrency(selectedCurrency);
  };

  const handleOnSendedChange = async (value: number) => {
    setSended(value);
    await request('quote/send', {
      method: 'POST',
      data: {
        send: value,
      },
    });
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
            abbr_name: 'CLP',
            flag_image: 'chile.png',
          }}
        />
        <CurrencyInput
          value={received > 0 ? received.toString() : ''}
          label="Recibirá"
          onChange={(value) => setReceived(value)}
          selectedCurrency={currency}
          currencies={currencies}
          onCurrencyClick={handleOnCurrencyClick}
        />
      </main>
    </div>
  );
};

export default Home;
