import React from 'react';
import SelectTravelButton from '../select_travel_button/select_travel_button';
import styles from './basement.module.css';

const Basement = ({ handleSelect }) => {
  const onClick = (event) => {
    handleSelect(event.target.id);
  };

  return (
    <>
      <ul className={styles.selection}>
        <li id="newTravel" className={styles.option} onClick={onClick}>
          새 여행계획 만들기
        </li>
        <li id="previousTravel" className={styles.option} onClick={onClick}>
          기존에 참여 중인 여행계획 확인하기
        </li>
        <li id="participateTravel" className={styles.option} onClick={onClick}>
          공유받은 여행계획 참여하기
        </li>
      </ul>
    </>
  );
};

export default Basement;
