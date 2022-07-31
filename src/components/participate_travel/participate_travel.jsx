import React, { useRef } from 'react';
import SelectTravelButton from '../select_travel_button/select_travel_button';
import styles from './participate_travel.module.css';

const ParticipateTravel = ({
  travelRepository,
  handleSelect,
  goToDashboard,
  userId,
  userName,
}) => {
  const linkRef = useRef();

  const handleSubmit = async () => {
    const travelId = linkRef.current.value.slice(-13);

    if (travelId.match(/[^0-9]/)) {
      alert('잘못된 링크입니다.');
      return;
    }

    const stopSync = await travelRepository.syncTravel(
      travelId,
      async () => {
        travelRepository.saveTravelSubData(travelId, 'editor', {
          id: userId,
          name: userName,
          owner: false,
        });

        const travelIds = await travelRepository.getUserTravel(userId);
        const updated = travelIds ? [...travelIds, travelId] : [travelId];
        await travelRepository.saveUserTravel(userId, updated);

        goToDashboard(travelId);
      },
      () => {
        alert('존재하지 않는 여행 계획입니다.');
      }
    );

    stopSync();
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
