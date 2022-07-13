import React from 'react';
import styles from './select_travel_button.module.css';

const SelectTravelButton = (props) => {
  return (
    <div className={styles.buttons}>
      <button className={`${styles.button} ${styles.back}`}>뒤로가기</button>
      <button className={`${styles.button} ${styles.submit}`}>시작하기</button>
    </div>
  );
};

export default SelectTravelButton;
