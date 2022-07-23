import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectTravelButton from '../select_travel_button/select_travel_button';
import styles from './participate_travel.module.css';

const ParticipateTravel = ({ travelRepository, handleSelect, user }) => {
  const linkRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const travelId = linkRef.current.value.slice(-13);
    const travelCheck = await travelRepository.getTravel(travelId);

    if (!travelCheck) {
      alert('존재하지 않는 여행 계획입니다.');
      return;
    }

    travelRepository.saveTravelSubData(travelId, 'editor', user);

    const travelIds = await travelRepository.getUserTravel(user.id);
    const updated = travelIds ? [...travelIds, travelId] : [travelId];
    travelRepository.saveUserTravel(user.id, updated);

    navigate(`/travel/${travelId}`);
  };

  return (
    <>
      <input
        ref={linkRef}
        className={styles.input}
        type="text"
        placeholder="공유받은 링크를 입력해주세요"
      />
      <div className={styles['button-wrap']}>
        <SelectTravelButton
          handleSelect={handleSelect}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default ParticipateTravel;
