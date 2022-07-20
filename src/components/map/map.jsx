import React, { useEffect } from 'react';
import TravelInfo from '../travel_info/travel_info';
import styles from './map.module.css';

const Map = ({ createMap, repositionMap, updateTravel, travelInfo }) => {
  useEffect(() => {
    createMap('kakaoMap');
  }, []);

  useEffect(() => {
    repositionMap(travelInfo.place);
  }, [travelInfo.place]);

  return (
    <section className={styles['map-wrap']}>
      <div id="kakaoMap" className={styles.map}></div>
      <TravelInfo updateTravel={updateTravel} travelInfo={travelInfo} />
    </section>
  );
};

export default Map;
