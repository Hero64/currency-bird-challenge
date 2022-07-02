export interface BaseCurrency {
  name: string;
  abbr_name: string;
  flag_image: string;
}

export interface Currency extends BaseCurrency {
  usd_cost: number;
  country: string;
  spread: number;
  margin: number;
}
