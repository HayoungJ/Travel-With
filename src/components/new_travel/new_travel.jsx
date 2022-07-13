import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import styles from './new_travel.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import SelectTravelButton from '../select_travel_button/select_travel_button';

const NewTravel = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <>
      <ul className={styles.selection}>
        <li className={styles.option}>
          <input
            className={styles.input}
            type="text"
            placeholder="여행 계획 이름"
          />
        </li>
        <li className={styles.option}>
          <input className={styles.input} type="text" placeholder="여행 장소" />
        </li>
        <li className={styles.option}>
          <DatePicker
            wrapperClassName={styles['calendar-wrapper']}
            className={styles['calendar-input']}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy/MM/dd"
            placeholderText="시작일"
          />
          <DatePicker
            wrapperClassName={styles['calendar-wrapper']}
            className={styles['calendar-input']}
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy/MM/dd"
            placeholderText="종료일"
          />
        </li>
      </ul>
      <SelectTravelButton />
    </>
  );
};

export default NewTravel;
