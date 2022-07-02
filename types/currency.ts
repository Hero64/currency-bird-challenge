export interface BaseCurrency {
  name: string;
  code: string;
  flag_image: string;
}

export interface Currency extends BaseCurrency {
  usd_cost: number;
  country: string;
  spread: number;
  margin: number;
}
