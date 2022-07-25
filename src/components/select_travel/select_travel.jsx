import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header';
import styles from './select_travel.module.css';
import Basement from '../basement/basement';
import NewTravel from '../new_travel/new_travel';
import PreviousTravel from '../previous_travel/previous_travel';
import ParticipateTravel from '../participate_travel/participate_travel';

const SelectTravel = ({ authService, travelRepository }) => {
  const navigate = useNavigate();

  const [steps, setSteps] = useState({
    basement: true,
    newTravel: false,
    previousTravel: false,
    participateTravel: false,
  });
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('loginUser'))
  );

  const onLogout = () => {
    authService.logout();
    localStorage.removeItem('loginUser');
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

  const updateUser = (user) => {
    setUser(user);
    localStorage.setItem('loginUser', JSON.stringify(user));
  };

  useEffect(() => {
    const stopSync = authService.onAuthChange((data) => {
      if (data) {
        const updated = {
          id: data.uid,
          name: data.displayName,
        };
        !user && updateUser(updated);
      } else {
        localStorage.removeItem('loginUser');
        navigate('/');
      }
    });

    return () => stopSync();
  }, [authService, navigate]);

  return (
    <>
      <Header onLogout={onLogout} name={user.name} />
      <section className={styles['selection-container']}>
        {steps.basement && <Basement handleSelect={handleSelect} />}
        {steps.newTravel && (
          <NewTravel
            travelRepository={travelRepository}
            handleSelect={handleSelect}
            user={user}
          />
        )}
        {steps.previousTravel && (
          <PreviousTravel
            travelRepository={travelRepository}
            handleSelect={handleSelect}
            user={user}
          />
        )}
        {steps.participateTravel && (
          <ParticipateTravel
            travelRepository={travelRepository}
            handleSelect={handleSelect}
            user={user}
          />
        )}
      </section>
    </>
  );
};
export default SelectTravel;
