import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../header/header';
import Map from '../map/map';
import Plan from '../plan/plan';
import styles from './dashboard.module.css';

const Dashboard = ({ travelRepository, kakaoMap }) => {
  const navigate = useNavigate();
  const params = useParams();

  const [travelId, setTravelId] = useState(null);
  const [travelInfo, setTravelInfo] = useState({});
  const [buttonSwitch, setButtonSwitch] = useState({
    isPlan: true,
    isWallet: false,
    isSetting: false,
  });
  const [map, setMap] = useState();
  const [mapMarkers, setMapMarkers] = useState({});
  const [travelNode, setTravelNode] = useState({});

  const createMap = (container) => {
    const newMap = kakaoMap.createMap(container);
    setMap(newMap);
  };

  const repositionMap = (place) => {
    place && kakaoMap.repositionMap(map, place);
  };

  const searchAtMap = (keyword, handleMarkerSelect) => {
    keyword && kakaoMap.search(map, keyword, handleMarkerSelect);
  };

  const handleDisplayMarker = (marker) => {
    const updated = { ...mapMarkers };

    if (Object.keys(updated).find((element) => element === marker.id)) {
      delete updated[marker.id];
    } else {
      updated[marker.id] = marker;
    }

    kakaoMap.createCustomMarker(map, Object.values(updated));
    setMapMarkers(updated);
  };

  const createOrUpdateTravelNode = (node) => {
    travelRepository.saveTravelNode(travelId, node);
    const updated = { ...travelNode };
    updated[node.id] = node;
    setTravelNode(updated);
  };

  const removeTravelNode = (node) => {
    travelRepository.removeTravelNode(travelId, node);
    const updated = { ...travelNode };
    delete updated[node.id];
    setTravelNode(updated);
  };

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
      data.nodes && setTravelNode(data.nodes);
    });

    return () => stopSync;
  }, [travelId, travelRepository]);

  return (
    <>
      <Header />
      <section className={styles.dashboard}>
        <div className={styles.container}>
          <Map
            createMap={createMap}
            repositionMap={repositionMap}
            updateTravel={updateTravel}
            travelInfo={travelInfo}
          />
        </div>
        <div className={styles.container}>
          <nav className={styles.nav}>
            <button
              className={`${styles.button} ${
                buttonSwitch.isPlan && styles.active
              }`}
            >
              계획
            </button>
            <button
              className={`${styles.button} ${
                buttonSwitch.isWallet && styles.active
              }`}
            >
              지갑
            </button>
            <button
              className={`${styles.button} ${
                buttonSwitch.isSetting && styles.active
              }`}
            >
              설정
            </button>
          </nav>
          <div className={styles['scroll-area']}>
            <Plan
              updateTravel={updateTravel}
              searchAtMap={searchAtMap}
              travelInfo={travelInfo}
              travelNode={travelNode}
              createOrUpdateTravelNode={createOrUpdateTravelNode}
              removeTravelNode={removeTravelNode}
              handleDisplayMarker={handleDisplayMarker}
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default Dashboard;
