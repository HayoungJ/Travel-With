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
  const [userId, setUserId] = useState(location?.state?.id || '');
  const [userName, setUserName] = useState(location?.state?.name || '');

  const onLogout = () => {
    authService.logout();
    navigate('/');
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

  const updateUser = (id, name) => {
    setUserId(id);
    setUserName(name);
  };

  const goToDashboard = (travelId) => {
    navigate(`/travel/${travelId}`, { state: { id: userId, name: userName } });
  };

  useEffect(() => {
    const stopSync = authService.onAuthChange((data) => {
      if (data) {
        data.uid !== userId && updateUser(data.uid, data.displayName);
      } else {
        navigate('/');
      }
    });

    return () => stopSync();
  });

  return (
    <>
      <Header onLogout={onLogout} id={userName} name={userName} />
      <section className={styles['selection-container']}>
        {steps.basement && <Basement handleSelect={handleSelect} />}
        {steps.newTravel && (
          <NewTravel
            travelRepository={travelRepository}
            handleSelect={handleSelect}
            goToDashboard={goToDashboard}
            userId={userId}
            userName={userName}
          />
        )}
        {steps.previousTravel && (
          <PreviousTravel
            travelRepository={travelRepository}
            handleSelect={handleSelect}
            goToDashboard={goToDashboard}
            userId={userId}
            userName={userName}
          />
        )}
        {steps.participateTravel && (
          <ParticipateTravel
            travelRepository={travelRepository}
            handleSelect={handleSelect}
            goToDashboard={goToDashboard}
            userId={userId}
            userName={userName}
          />
        )}
      </section>
    </>
  );
};
export default SelectTravel;
