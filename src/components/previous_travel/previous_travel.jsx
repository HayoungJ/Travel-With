import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectTravelButton from '../select_travel_button/select_travel_button';
import styles from './previous_travel.module.css';

const PreviousTravel = ({ handleSelect, travelRepository, user }) => {
  const navigate = useNavigate();

  const [travelList, setTravelList] = useState([]);

  const getTravelTitleList = async () => {
    const data = await travelRepository.getUserTravel(user.id);

    data.forEach(async (element) => {
      const travelInfo = await travelRepository.getTravel(element);

      setTravelList((travelList) => {
        const updated = [...travelList];
        updated.push({ title: travelInfo.title, id: travelInfo.id });
        return updated;
      });
    });
  };

  const onClick = (id) => {
    navigate(`/travel/${id}`);
  };

  useEffect(() => {
    getTravelTitleList();
  }, []);

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
      </ul>
      <div className={styles['button-wrap']}>
        <SelectTravelButton handleSelect={handleSelect} />
      </div>
    </>
  );
};

export default PreviousTravel;
