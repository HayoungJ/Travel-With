import React from 'react';
import SelectTravelButton from '../select_travel_button/select_travel_button';
import styles from './participate_travel.module.css';

const ParticipateTravel = (props) => {
  return (
    <>
      <input
        className={styles.input}
        type="text"
        placeholder="공유받은 링크를 입력해주세요"
      />
      <SelectTravelButton />
    </>
  );
};

export default ParticipateTravel;
