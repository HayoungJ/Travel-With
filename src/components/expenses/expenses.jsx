import React, { useEffect, useRef, useState } from 'react';
import ExpensesList from '../expenses_list/expenses_list';
import styles from './expenses.module.css';

const Expenses = ({
  list,
  createOrUpdateExpenses,
  removeExpenses,
  editable,
}) => {
  const formRef = useRef();
  const whereRef = useRef();
  const whenRef = useRef();
  const categoryRef = useRef();

  const [peopleNumber, setPeopleNumber] = useState(0);
  const [total, setTotal] = useState(0);
  const [spent, setSpent] = useState('');

  const onPeopleNumberChange = (event) => {
    setPeopleNumber(event.currentTarget.value);
  };

  const returnNumber = (string) => {
    const numsStr = string.replace(/[^0-9]/g, '');
    return Number(numsStr);
  };

  const returnWithFormatAndUnit = (number) => {
    const str =
      typeof number === 'number'
        ? '₩' + Intl.NumberFormat('en-US').format(number)
        : '';
    return str;
  };

  const onAdd = (event) => {
    event.preventDefault();
    createOrUpdateExpenses({
      id: `expenses-${Date.now()}`,
      where: whereRef.current.value,
      when: whenRef.current.value,
      category: categoryRef.current.value,
      spent: spent,
    });
    formRef.current.reset();
  };

  useEffect(() => {
    let updatedTotal = 0;
    Object.keys(list).forEach((key) => {
      if (typeof list[key].spent === 'number') updatedTotal += list[key].spent;
    });
    setTotal(updatedTotal);
  }, [list]);

  return (
    <section className={styles.expenses}>
      <article className={styles.calculator}>
        <input
          className={styles['people-number']}
          type="number"
          placeholder="인원 수"
          onChange={onPeopleNumberChange}
          disabled={!editable}
        />
        <div className={styles.total}>₩{total}</div>
        <div className={styles['personal-expenses']}>
          {peopleNumber > 0
            ? `₩${total / peopleNumber}`
            : `인원 수를 입력해주세요`}
        </div>
      </article>
      <hr className={styles.hr} />
      <article className={styles.table}>
        {editable && (
          <form ref={formRef} className={styles.header}>
            <input
              ref={whereRef}
              name="where"
              className={styles.input}
              placeholder="장소"
            />
            <input
              ref={whenRef}
              name="when"
              className={styles.input}
              placeholder="날짜"
            />
            <input
              ref={categoryRef}
              name="category"
              className={styles.input}
              placeholder="분류"
            />
            <input
              name="spent"
              className={styles.input}
              placeholder="금액"
              onChange={(event) => {
                const numberValue = returnNumber(event.currentTarget.value);
                const stringValue = returnWithFormatAndUnit(numberValue);
                setSpent(numberValue);
                event.currentTarget.value = stringValue;
              }}
            />
            <button className={styles.button} onClick={onAdd}>
              +
            </button>
          </form>
        )}
        {Object.keys(list).length > 0 && (
          <ul className={styles.body}>
            {Object.keys(list).map((key) => (
              <ExpensesList
                key={list[key].id}
                list={list[key]}
                updateExpenses={createOrUpdateExpenses}
                removeExpenses={removeExpenses}
                returnNumber={returnNumber}
                returnWithFormatAndUnit={returnWithFormatAndUnit}
              />
            ))}
          </ul>
        )}
      </article>
    </section>
  );
};

export default Expenses;
