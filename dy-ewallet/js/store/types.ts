export interface Wallet {
  currency: string;
  value: number;
}

export interface ExchangeData {
  currency_from: string;
  currency_to: string;
  value: number;
  convertedValue: number;
}

export interface WalletState {
  converter: {
    id: string;
    val: number;
    to: string;
    fr: string;
  };
  data: Wallet[];
}

export const DO_EXCHANGE = 'DO_EXCHANGE';

export const FETCH_CONVERT = 'FETCH_CONVERT';

interface ExchangeAction {
  type: typeof DO_EXCHANGE;
  payload: ExchangeData;
}

interface FetchCoursesAction {
  type: typeof FETCH_CONVERT;
  payload: any;
}

export type ExchangeActionTypes = ExchangeAction | FetchCoursesAction;
