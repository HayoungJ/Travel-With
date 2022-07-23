import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import styles from './new_travel.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import SelectTravelButton from '../select_travel_button/select_travel_button';
import { useNavigate } from 'react-router-dom';

const NewTravel = ({ travelRepository, handleSelect, user }) => {
  const navigate = useNavigate();

  const titleRef = useRef();
  const placeRef = useRef();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const creatNewTravel = async (travelId, info) => {
    const travelIds = await travelRepository.getUserTravel(user.id);
    const updated = travelIds ? [...travelIds, travelId] : [travelId];
    travelRepository.saveTravel(travelId, info);
    travelRepository.saveUserTravel(user.id, updated);
  };

  const handleSubmit = () => {
    const travelId = Date.now().toString();
    const info = {
      id: travelId,
      title: titleRef.current.value,
      place: placeRef.current.value,
      startDate: startDate && startDate.toString(),
      endDate: endDate && endDate.toString(),
      owner: user.id,
      editor: {},
    };
    info.editor[user.id] = {
      id: user.id,
      name: user.name,
      owner: true,
    };
    creatNewTravel(travelId, info);
    navigate(`/travel/${travelId}`);
  };

  return (
    <>
      <ul className={styles.selection}>
        <li className={styles.option}>
          <input
            ref={titleRef}
            className={styles.input}
            type="text"
            placeholder="여행 계획 이름"
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
