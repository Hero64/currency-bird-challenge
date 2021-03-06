import { Props as CountrySelectorProps } from './Selector/types';

export interface Props extends CountrySelectorProps {
  value: string;
  label: string;
  onChange: (value: number) => void;
}
