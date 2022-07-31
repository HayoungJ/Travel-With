import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import styles from './new_travel.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import SelectTravelButton from '../select_travel_button/select_travel_button';

const NewTravel = ({
  travelRepository,
  handleSelect,
  goToDashboard,
  userId,
  userName,
}) => {
  const titleRef = useRef();
  const placeRef = useRef();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const creatNewTravel = async (travelId, info) => {
    const travelIds = await travelRepository.getUserTravel(userId);
    const updated = travelIds ? [...travelIds, travelId] : [travelId];
    travelRepository.saveTravel(travelId, info);
    travelRepository.saveUserTravel(userId, updated);
  };

  const handleSubmit = async () => {
    const travelId = Date.now().toString();
    const info = {
      id: travelId,
      title: titleRef.current.value,
      place: placeRef.current.value,
      startDate: startDate && startDate.toString(),
      endDate: endDate && endDate.toString(),
      owner: userId,
      editor: {},
    };
    info.editor[userId] = {
      id: userId,
      name: userName,
      owner: true,
    };
    await creatNewTravel(travelId, info);
    goToDashboard(travelId);
  };

  return (
    <>
      <ul className={styles.selection}>
        <li className={styles.option}>
          <input
            ref={titleRef}
            className={styles.input}
            type="text"
            placeholder="여행 이름"
          />
        </li>
        <li className={styles.option}>
          <input
            ref={placeRef}
            className={styles.input}
            type="text"
            placeholder="여행 장소"
          />
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
      <div className={styles['button-wrap']}>
        <SelectTravelButton
          handleSelect={handleSelect}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default NewTravel;
