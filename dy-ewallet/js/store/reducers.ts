import {
  FETCH_CONVERT,
  DO_EXCHANGE,
  ExchangeActionTypes,
  WalletState,
} from './types';


const initialState: WalletState = {
  converter: undefined,
  data: [{
    currency: 'GBP',
    value: 100,
  }, {
    currency: 'EUR',
    value: 1000,
  }, {
    currency: 'USD',
    value: 10000,
  }]
};

export function walletReducer(
  state = initialState,
  action: ExchangeActionTypes
): WalletState {
  switch (action.type) {
    case FETCH_CONVERT:

      return  {
        ...state,
        converter: action.payload,
      };
    case DO_EXCHANGE:
      let data = state.data.slice();

      data = data.map(x => {
        let ret = x;

        if (x.currency === action.payload.currency_from) {

          ret = {
            ...x,
            value: ret.value - action.payload.value,
          }
        }
        if (x.currency === action.payload.currency_to) {

          ret = {
            ...x,
            value: ret.value + action.payload.convertedValue,
          }
        }

        return ret;
      });

      return {
        ...state,
        data,
      };
    default:
      return state;
  }
}
