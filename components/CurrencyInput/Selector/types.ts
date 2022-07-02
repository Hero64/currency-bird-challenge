import { BaseCurrency } from '@/types/currency';

export interface Props {
  selectedCurrency: BaseCurrency;
  currencies?: BaseCurrency[];
  onCurrencyClick?: (currency: BaseCurrency) => void;
}
