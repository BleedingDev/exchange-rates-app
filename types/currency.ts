export interface Currencies {
  [key: string]: Currency;
}

export type Currency = {
  country: string;
  currency: string;
  amount: number;
  code: string;
  exchangeRate: number;
};
export type Metadata = {
  date: string;
  iteration: string;
};
export type Description = {
  country: string;
  currency: string;
  amount: string;
  code: string;
  exchangeRate: string;
};

export type CurrencyApiResponse = {
  metadata: Partial<Metadata> & {
    columnDescription: Description | null;
  };
  data: Currencies;
};
