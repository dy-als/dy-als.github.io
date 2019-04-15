import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../store';
import { WalletState } from '../store/types';
import { doExchangeAction, fetchConvertAction } from '../store/actions';

import '../../styles/main.scss';


interface AppProps {
  dispatch: any;
  wallet: WalletState;
}

class App extends React.Component<AppProps, any> {
  private maxValue: number;
  private timer: number;

  constructor(props) {
    super(props);

    this.state = {
      currency_from: props.wallet.data[0].currency,
      currency_to: props.wallet.data[0].currency,
      value: 0,
      convertedValue: 0,
      disabled: true,
      exchangeRate: 0,
    };

    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.doExchange = this.doExchange.bind(this);

    this.maxValue = props.wallet.data[0].value;
  }

  public componentDidMount(): void {
    const time = 1000 * 1000; // Limit is 100 requests/hour

    this.timer = setInterval(() => this.refresh(), time);

    this.refresh();
  }

  public componentWillUnmount(): void {
    clearInterval(this.timer)
  }

  public handleChangeSelect(event): void {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      this.refresh();
    });

  }

  public handleChangeInput(event): void {
    event.preventDefault();

    let value = Number(event.target.value);

    if (event.target.value > this.maxValue || event.target.value < 0) {
      value = this.maxValue;
    } else if (event.target.value < 0) {
      value = 0;
    }

    value = Number(value.toFixed(2));

    this.setState({
      value: value,
      convertedValue: this.convert(
        value,
      )
    });
  }

  public doExchange(): void {
    this.props.dispatch(
      doExchangeAction({
        currency_from: this.state.currency_from,
        currency_to: this.state.currency_to,
        value: this.state.value,
        convertedValue: this.state.convertedValue,
      })
    ).then(() => {
      this.updateMaxValue();
    });
  }

  private refresh(): void {
    const q = `${this.state.currency_from}_${this.state.currency_to}`;

    this.getConvert(q).then(() => {
      this.setConvertedValue();
      this.updateMaxValue();
    });
  }

  private updateMaxValue(): void {
    const currentFr = this.props.wallet.data.find(x => x.currency === this.state.currency_from);

    if (!currentFr) { return; }

    this.maxValue = currentFr.value;

    if (this.state.value > this.maxValue) {
      this.setState({
        value: this.maxValue,
        convertedValue: this.convert(
          this.maxValue,
        ),
      });
    }
  }

  private getConvert(q): any {

    console.log('Getting new value...');

    this.setState({
      disabled: true,
    });

    return this.props.dispatch(
      fetchConvertAction(q)
    );
  }

  private setConvertedValue() {
    this.setState({
      convertedValue: this.convert(
        this.state.value,
      ),
      disabled: false,
    });
  }

  private convert(value): number {
    const convert = this.props.wallet.converter;

    return convert ? convert.val * value : value;
  }

  render() {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <h1>Welcome to React with Typescript eWallet</h1>

            <h6>Now you have:</h6>

            <ul className="list-group mb-3">
              {
                this.props.wallet.data.map(w => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={w.currency}>
                    {w.currency}
                    <span className="badge badge-primary badge-pill">{w.value} </span>
                  </li>
                ))
              }
            </ul>

            <h3>Exchange</h3>

            <div className="form-group mb-3">
              <label htmlFor="from">From</label>
              <select className="form-control" name="currency_from" id="from" onChange={this.handleChangeSelect}>
                {
                  this.props.wallet.data.map(w => (
                    <option key={w.currency}>{w.currency}</option>
                  ))
                }
              </select>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="to">To</label>
              <select className="form-control" name="currency_to" id="to" onChange={this.handleChangeSelect}>
                {
                  this.props.wallet.data.map(w => (
                    <option value={w.currency} key={w.currency}>{w.currency}</option>
                  ))
                }
              </select>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="val">How much</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">{this.state.currency_from}</span>
                </div>
                <input
                  className="form-control"
                  onChange={this.handleChangeInput}
                  value={this.state.value}
                  type="number"
                  id="val"
                  disabled={this.state.disabled}
                />
              </div>
            </div>

            <p className="mb-4">
              {this.state.currency_to}
              {
                this.props.wallet.converter &&
                <sup className='text-success'>{this.props.wallet.converter.val}</sup>
              }
              : {this.state.convertedValue}

              {
                this.state.disabled &&
                <span className="spinner-border spinner-border-sm ml-3" role="status" />
              }
            </p>

            <p>
              <button
                className='btn btn-primary'
                disabled={this.state.disabled}
                onClick={this.doExchange}
              >Exchange</button>
            </p>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  wallet: state.wallet,
});

export default connect(
  mapStateToProps,
)(App);
