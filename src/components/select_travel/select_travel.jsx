import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header';
import styles from './select_travel.module.css';
import Basement from '../basement/basement';
import NewTravel from '../new_travel/new_travel';
import PreviousTravel from '../previous_travel/previous_travel';
import ParticipateTravel from '../participate_travel/participate_travel';

const SelectTravel = ({ authService }) => {
  const [basement, setBasement] = useState(false);
  const [newTravel, setNewTravel] = useState(true);
  const [previousTravel, setPreviousTravel] = useState(false);
  const [participateTravel, setParticipateTravel] = useState(false);

  const navigate = useNavigate();

  const onLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <>
      <Header onLogout={onLogout} />
      <section className={styles['selection-container']}>
        {basement && <Basement />}
        {newTravel && <NewTravel />}
        {previousTravel && <PreviousTravel />}
        {participateTravel && <ParticipateTravel />}
      </section>
    </>
  );
};
export default SelectTravel;
