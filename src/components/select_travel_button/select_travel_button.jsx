import React from 'react';
import styles from './select_travel_button.module.css';

const SelectTravelButton = ({ handleSelect, handleSubmit }) => {
  const goToBack = () => {
    handleSelect('basement');
  };

  const goToTravelPlan = () => {
    handleSubmit();
  };

  return (
    <div className={styles.buttons}>
      <button className={`${styles.button} ${styles.back}`} onClick={goToBack}>
        뒤로가기
      </button>
      <button
        className={`${styles.button} ${styles.submit}`}
        onClick={goToTravelPlan}
      >
        시작하기
      </button>
    </div>
  );
};

export default SelectTravelButton;
