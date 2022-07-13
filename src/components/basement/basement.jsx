import React from 'react';
import styles from './basement.module.css';

const Basement = (props) => {
  return (
    <section className={styles['selection-container']}>
      <ul className={styles.selection}>
        <li name="type1" className={styles.option}>
          새 여행계획 만들기
        </li>
        <li name="type2" className={styles.option}>
          기존에 참여 중인 여행계획 확인하기
        </li>
        <li name="type3" className={styles.option}>
          공유받은 여행계획 참여하기
        </li>
      </ul>
    </section>
  );
};

export default Basement;
