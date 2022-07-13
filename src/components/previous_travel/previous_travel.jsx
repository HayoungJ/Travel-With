import React from 'react';
import SelectTravelButton from '../select_travel_button/select_travel_button';
import styles from './previous_travel.module.css';

const PreviousTravel = (props) => {
  return (
    <>
      <ul className={styles.selection}>
        <li className={styles.option}>속초 여행</li>
        <li className={styles.option}>광주 여행</li>
        <li className={styles.option}>제주도 여행</li>
      </ul>
      <SelectTravelButton />
    </>
  );
};

export default PreviousTravel;
