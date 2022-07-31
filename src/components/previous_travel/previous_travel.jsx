import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import SelectTravelButton from '../select_travel_button/select_travel_button';
import styles from './previous_travel.module.css';

const PreviousTravel = ({
  travelRepository,
  handleSelect,
  goToDashboard,
  userId,
}) => {
  const [travelList, setTravelList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTravelTitleList = useCallback(async () => {
    setIsLoading(true);

    const data = await travelRepository.getUserTravel(userId);

    data.forEach(async (travelId) => {
      const stopSync = await travelRepository.syncTravel(
        travelId,
        (data) => {
          setTravelList((travelList) => {
            const updated = [...travelList];
            updated.push({ title: data.title, id: data.id });
            return updated;
          });
        },
        () => {}
      );

      stopSync();
    });

    setIsLoading(false);
  }, [travelRepository, userId]);

  const onClick = (travelId) => {
    goToDashboard(travelId);
  };

  useEffect(() => {
    setTravelList([]);
    getTravelTitleList();
  }, [getTravelTitleList]);

  return (
    <>
      <ul className={styles.selection}>
        {travelList &&
          travelList.map((info) => (
            <li
              key={info.id}
              className={styles.option}
              onClick={() => onClick(info.id)}
            >
              {info.title}
            </li>
          ))}
        {isLoading && <li className={styles.loading}></li>}
      </ul>
      <div className={styles['button-wrap']}>
        <SelectTravelButton handleSelect={handleSelect} />
      </div>
    </>
  );
};

export default PreviousTravel;
