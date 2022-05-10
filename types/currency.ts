export interface Currencies {
  [key: string]: {
    sign: string;
    exchangeRate: number;
    amount: number;
  };
}
