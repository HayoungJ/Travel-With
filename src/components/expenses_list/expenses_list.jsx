import React from 'react';
import styles from './expenses_list.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ExpensesList = (props) => {
  return (
    <li className={styles.list}>
      <input
        name="where"
        className={styles.input}
        type="text"
        placeholder="장소"
      />
      <input
        name="when"
        className={styles.input}
        type="text"
        placeholder="날짜"
      />
      <input
        name="category"
        className={styles.input}
        type="text"
        placeholder="분류"
      />
      <input
        name="spent"
        className={styles.input}
        type="text"
        placeholder="금액"
      />
      <button className={styles.button}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </li>
  );
};

export default ExpensesList;
