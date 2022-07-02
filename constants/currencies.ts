import { Currency } from '@/types/currency';

export const CHILEAN_USD_VALUE = 757;

export const CHILEAN_SPREAD = 0.004;

export const CURRENCIES: Currency[] = [
  {
    usd_cost: 0.28,
    country: 'Perú',
    name: 'Soles',
    code: 'PEN',
    spread: 0.015,
    margin: 0.03,
    flag_image: 'peru.png',
  },
  {
    usd_cost: 0.00027,
    country: 'Colombia',
    name: 'Peso colombiano',
    code: 'COP',
    spread: 0.018,
    margin: 0.035,
    flag_image: 'colombia.png',
  },
  {
    usd_cost: 0.19,
    country: 'Brasil',
    name: 'Soles',
    code: 'BRL',
    spread: 0.012,
    margin: 0.029,
    flag_image: 'brasil.png',
  },
];
