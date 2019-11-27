import React from 'react';
import PropTypes from 'prop-types';
import s from './Balance.module.css';

const Balance = ({ income, expenses, balance }) => (
  <>
    <section className={s.balance}>
      <span className={s.balance__span}>&#8593; {income}$</span>
      <span className={s.balance__span}>&#8595; {expenses}$</span>
      <span className={s.balance__span}>Balance: {balance}$</span>
    </section>
  </>
);
Balance.propTypes = {
  income: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
};
export default Balance;
