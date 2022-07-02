import { BaseCurrency } from '@/types/currency';

export interface Props {
  currencies: BaseCurrency[];
}

export interface Response {
  amount: number;
}

export type CurrencySendType = 'send' | 'receive';
