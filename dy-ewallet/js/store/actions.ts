import { ExchangeData, DO_EXCHANGE, FETCH_CONVERT } from './types';

export function doExchangeAction(data: ExchangeData) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: DO_EXCHANGE,
        payload: data,
      });

      resolve();
    });
  };
}

export function fetchConvertAction(q: string) {
  return dispatch => {
    return fetch(`https://free.currencyconverterapi.com/api/v6/convert?apiKey=6988a4dafe14614785ea&q=${q}`, {
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then(res => dispatch({
        type: FETCH_CONVERT,
        payload: res.results[q],
      }));
}}
