import React, { useState } from 'react';
import styles from './expenses_list.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ExpensesList = ({
  list,
  updateExpenses,
  removeExpenses,
  returnNumber,
  returnWithFormatAndUnit,
}) => {
  const { where, when, category, spent } = list;

  const onChange = (event) => {
    event.preventDefault();
    const updated = { ...list };
    if (event.currentTarget.name === 'spent') {
      const numberValue = returnNumber(event.currentTarget.value);
      const stringValue = returnWithFormatAndUnit(numberValue);
      updated.spent = numberValue;
      event.currentTarget.value = stringValue;
    } else updated[event.currentTarget.name] = event.currentTarget.value;
    updateExpenses(updated);
  };

  const onRemove = () => {
    removeExpenses(list);
  };

  return (
    <li className={styles.list}>
      <input
        name="where"
        className={styles.input}
        type="text"
        placeholder="장소"
        value={where}
        onChange={onChange}
      />
      <input
        name="when"
        className={styles.input}
        type="text"
        placeholder="날짜"
        value={when}
        onChange={onChange}
      />
      <input
        name="category"
        className={styles.input}
        type="text"
        placeholder="분류"
        value={category}
        onChange={onChange}
      />
      <input
        name="spent"
        className={styles.input}
        type="text"
        placeholder="금액"
        value={returnWithFormatAndUnit(spent)}
        onChange={onChange}
      />
      <button className={styles.button} onClick={onRemove}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </li>
  );
};

export default ExpensesList;
