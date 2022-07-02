import {
  CURRENCIES,
  CHILEAN_USD_VALUE,
  CHILEAN_SPREAD,
} from '@/constants/currencies';
import { Currency } from '@/types/currency';

const getCurrency = (code: string) => {
  return CURRENCIES.find((currency) => currency.code === code) as Currency;
};

const calculateChangeCurrencyWithSpread = (
  amount: number,
  changeValue: number,
  spread: number
) => {
  const changedAmount = amount * changeValue;
  const conversionSpread = changedAmount * spread;

  return changedAmount + conversionSpread;
};

const QuoteProvider = {
  send: (amount: number, currencyCode: string) => {
    const { spread, margin, usd_cost: usdCost } = getCurrency(currencyCode);

    const amountWithoutMargin = amount / (1 + margin);
    const amountWithoutChileanSpreed =
      amountWithoutMargin / (1 + CHILEAN_SPREAD);
    const usdAmount = amountWithoutChileanSpreed / CHILEAN_USD_VALUE;
    const amountWithoutUsdSpreed = usdAmount / (1 + spread);

    return Math.round(amountWithoutUsdSpreed / usdCost);
  },
  receive: (amount: number, currencyCode: string) => {
    const { spread, margin, usd_cost: usdCost } = getCurrency(currencyCode);

    const usdAmount = calculateChangeCurrencyWithSpread(
      amount,
      usdCost,
      spread
    );

    const chileanAmount = calculateChangeCurrencyWithSpread(
      usdAmount,
      CHILEAN_USD_VALUE,
      CHILEAN_SPREAD
    );

    const chileanMargin = chileanAmount * margin;

    return Math.round(chileanAmount + chileanMargin);
  },
};

export default QuoteProvider;
