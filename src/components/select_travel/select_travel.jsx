import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../header/header';
import styles from './select_travel.module.css';
import Basement from '../basement/basement';
import NewTravel from '../new_travel/new_travel';
import PreviousTravel from '../previous_travel/previous_travel';
import ParticipateTravel from '../participate_travel/participate_travel';

const SelectTravel = ({ authService, travelRepository }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [steps, setSteps] = useState({
    basement: true,
    newTravel: false,
    previousTravel: false,
    participateTravel: false,
  });
  const [userName, setUserName] = useState(
    location.state && location.state.userInfo.name
  );
  const [userId, setUserId] = useState(
    location.state && location.state.userInfo.id
  );

  const onLogout = () => {
    authService.logout();
  };

  const handleSelect = (next) => {
    const stepStatus = {
      basement: false,
      newTravel: false,
      previousTravel: false,
      participateTravel: false,
    };
    stepStatus[next] = true;
    setSteps(stepStatus);
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserName(user.displayName);
        setUserId(user.uid);
      } else {
        navigate('/');
      }
    });
  });

  return (
    <>
      <Header onLogout={onLogout} name={userName} />
      <section className={styles['selection-container']}>
        {steps.basement && <Basement handleSelect={handleSelect} />}
        {steps.newTravel && (
          <NewTravel
            travelRepository={travelRepository}
            handleSelect={handleSelect}
            userId={userId}
          />
        )}
        {steps.previousTravel && <PreviousTravel handleSelect={handleSelect} />}
        {steps.participateTravel && (
          <ParticipateTravel handleSelect={handleSelect} />
        )}
      </section>
    </>
  );
};
export default SelectTravel;
