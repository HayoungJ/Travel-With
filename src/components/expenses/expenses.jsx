import React from 'react';
import ExpensesList from '../expenses_list/expenses_list';
import styles from './expenses.module.css';

const Expenses = (props) => {
  return (
    <section className={styles.expenses}>
      <article className={styles.calculator}>
        <input
          className={styles['people-number']}
          type="number"
          placeholder="인원수"
        />
        <div className={styles['personal-expenses']}>100000원</div>
      </article>
      <hr className={styles.hr} />
      <article className={styles.table}>
        <div className={styles.header}>
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
          <button className={styles.button}>+</button>
        </div>
        <ul className={styles.body}>
          <ExpensesList />
          <ExpensesList />
          <ExpensesList />
          <ExpensesList />
          <ExpensesList />
          <ExpensesList />
          <ExpensesList />
          <ExpensesList />
          <ExpensesList />
          <ExpensesList />
          <ExpensesList />
        </ul>
      </article>
    </section>
  );
};

export default Expenses;
