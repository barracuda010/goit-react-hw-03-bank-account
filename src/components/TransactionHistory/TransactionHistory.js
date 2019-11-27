import React from 'react';
import PropTypes from 'prop-types';
import s from './TransactionHistory.module.css';

const TransactionHistory = ({ items }) => (
  <>
    <table className={s.transaction__history}>
      <thead>
        <tr className={s.transaction__list}>
          <th>Transaction</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {items.map(({ id, type, amount, date }) => (
          <tr key={id} className={s.transaction__item}>
            <td>{type}</td>
            <td>{amount}$</td>
            <td>{date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);
TransactionHistory.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
export default TransactionHistory;
