import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import shortid from 'shortid';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import s from './Dashboard.module.css';

toast.configure();
const Messages = {
  enough: 'На счету недостаточно средств для проведения операции!',
  incorrect: 'Введите сумму для проведения операции!',
};
const getSumFrom = (type, transactions) =>
  transactions.reduce((acc, el) => {
    return el.type === type ? acc + el.amount : acc;
  }, 0);

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  componentDidMount() {
    const saveTransactions = localStorage.getItem('transactions');
    if (saveTransactions) {
      this.setState({ transactions: JSON.parse(saveTransactions) });
    }
    const saveBalance = localStorage.getItem('balance');
    if (saveBalance) {
      this.setState({ balance: JSON.parse(saveBalance) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions, balance } = this.state;
    if (prevState.transactions !== transactions) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
    if (prevState.balance !== balance) {
      localStorage.setItem('balance', JSON.stringify(balance));
    }
  }

  addTransaction = (type, amount) => {
    const actList = {
      id: shortid.generate(),
      type,
      amount,
      date: new Date().toLocaleString(),
    };
    this.setState(prevState => ({
      transactions: [...prevState.transactions, actList],
    }));
  };

  onDeposit = amount => {
    if (amount === '' || amount <= 0) {
      toast(Messages.incorrect);
      return;
    }

    this.addTransaction('Deposit', amount);
    this.setState(state => ({ balance: state.balance + amount }));
  };

  onWithdraw = amount => {
    if (amount === '' || amount <= 0) {
      toast(Messages.incorrect);
      return;
    }
    if (this.state.balance < amount) {
      toast(Messages.enough);
      return;
    }
    this.addTransaction('Withdraw', amount);
    this.setState(state => ({ balance: state.balance - amount }));
  };

  render() {
    const { transactions, balance } = this.state;
    const income = getSumFrom('Deposit', transactions);
    const expenses = getSumFrom('Withdraw', transactions);
    return (
      <div className={s.dashboard}>
        <Controls onDeposit={this.onDeposit} onWithdraw={this.onWithdraw} />
        <Balance balance={balance} income={income} expenses={expenses} />
        <TransactionHistory items={transactions} />
      </div>
    );
  }
}
