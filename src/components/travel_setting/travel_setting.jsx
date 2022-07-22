import React from 'react';
import styles from './travel_setting.module.css';

const TravelSetting = ({ travelId }) => {
  return (
    <section className={styles.setting}>
      <article className={styles.share}>
        <h1 className={styles.title}>공유하기</h1>
        <p className={styles.link}>https://localhost:3000/travel/{travelId}</p>
      </article>
      <article className={styles.participation}>
        <h1 className={styles.title}>참여자 관리</h1>
        <ul className={styles.table}>
          <li className={styles.user}>
            <p className={styles.name}>Hayoung Jeon</p>
            <button className={styles.remove}>X</button>
          </li>
          <li className={styles.user}>
            <p className={styles.name}>Hayoung Jeon</p>
            <button className={styles.remove}>X</button>
          </li>
          <li className={styles.user}>
            <p className={styles.name}>Hayoung Jeon</p>
            <button className={styles.remove}>X</button>
          </li>
        </ul>
      </article>
      <article className={styles.delete}>
        <button className={styles.button}>이 계획을 삭제합니다</button>
      </article>
    </section>
  );
};

export default TravelSetting;
