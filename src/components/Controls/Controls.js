import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Controls.module.css';

export default class Controls extends Component {
  static propTypes = {
    onDeposit: PropTypes.func.isRequired,
    onWithdraw: PropTypes.func.isRequired,
  };

  state = {
    amount: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onDeposit = () => {
    const { onDeposit } = this.props;
    const { amount } = this.state;

    onDeposit(+amount);
    this.setState({
      amount: '',
    });
  };

  onWithdraw = () => {
    const { onWithdraw } = this.props;
    const { amount } = this.state;

    onWithdraw(+amount);
    this.setState({
      amount: '',
    });
  };

  render() {
    const { amount } = this.state;
    return (
      <>
        <section className={s.controls}>
          <input
            className={s.input}
            min="0"
            type="text"
            name="amount"
            value={amount}
            onChange={this.handleChange}
          />
          <button className={s.button} type="button" onClick={this.onDeposit}>
            Deposit
          </button>
          <button className={s.button} type="button" onClick={this.onWithdraw}>
            Withdraw
          </button>
        </section>
      </>
    );
  }
}
