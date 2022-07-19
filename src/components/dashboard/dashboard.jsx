import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../header/header';
import Map from '../map/map';
import Plan from '../plan/plan';
import styles from './dashboard.module.css';

const Dashboard = ({ travelRepository }) => {
  const navigate = useNavigate();
  const params = useParams();

  const [travelId, setTravelId] = useState(null);
  const [travelInfo, setTravelInfo] = useState({});
  const [isPlan, setIsPlan] = useState(true);

  const updateTravel = (info) => {
    setTravelInfo(info);
    travelRepository.saveTravel(travelId, info);
  };

  useEffect(() => {
    setTravelId(params.travelId);
  }, [params]);

  useEffect(() => {
    if (!travelId) {
      return;
    }
    const stopSync = travelRepository.syncTravel(travelId, (data) => {
      data && setTravelInfo(data);
    });

    return () => stopSync;
  }, [travelId, travelRepository]);

  return (
    <>
      <Header />
      <section className={styles.dashboard}>
        <Map />
        <div className={styles.container}>
          <nav className={styles.nav}>
            <button className={`${styles.button} ${isPlan && styles.active}`}>
              계획
            </button>
            <button className={`${styles.button} ${!isPlan && styles.active}`}>
              지갑
            </button>
          </nav>
          <Plan updateTravel={updateTravel} travelInfo={travelInfo} />
        </div>
      </section>
    </>
  );
};
export default Dashboard;
