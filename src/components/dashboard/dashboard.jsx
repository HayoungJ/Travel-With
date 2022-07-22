import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Expenses from '../expenses/expenses';
import Header from '../header/header';
import Map from '../map/map';
import Plan from '../plan/plan';
import TravelSetting from '../travel_setting/travel_setting';
import styles from './dashboard.module.css';

const Dashboard = ({ travelRepository, kakaoMap }) => {
  const params = useParams();
  const user = JSON.parse(localStorage.getItem('loginUser'));

  const [travelId, setTravelId] = useState(null);
  const [travelInfo, setTravelInfo] = useState({});
  const [buttonSwitch, setButtonSwitch] = useState('setting');
  const [map, setMap] = useState();
  const [mapMarkers, setMapMarkers] = useState({});
  const [travelNode, setTravelNode] = useState({});
  const [expensesList, setExpensesList] = useState({});
  const [editable, setEditable] = useState(false);

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
    travelRepository.saveTravelSubData(travelId, 'nodes', node);
    const updated = { ...travelNode };
    updated[node.id] = node;
    setTravelNode(updated);
  };

  const removeTravelNode = (node) => {
    travelRepository.removeTravelSubData(travelId, 'nodes', node);
    const updatedNode = { ...travelNode };
    delete updatedNode[node.id];
    setTravelNode(updatedNode);
    if (node.marker) {
      const updatedMarker = { ...mapMarkers };
      delete updatedMarker[node.marker.id];
      setMapMarkers(updatedMarker);
    }
  };

  const createOrUpdateExpenses = (list) => {
    travelRepository.saveTravelSubData(travelId, 'expenses', list);
    const updated = { ...expensesList };
    updated[list.id] = list;
    setExpensesList(updated);
  };

  const removeExpenses = (list) => {
    travelRepository.removeTravelSubData(travelId, 'expenses', list);
    const updated = { ...expensesList };
    delete updated[list.id];
    setExpensesList(updated);
  };

  const updateTravel = (info) => {
    setTravelInfo(info);
    travelRepository.saveTravel(travelId, info);
  };

  const onClick = (event) => {
    event.preventDefault();
    setButtonSwitch(event.currentTarget.name);
  };

  useEffect(() => {
    setTravelId(params.travelId);
  }, [params]);

  useEffect(() => {
    const editableIds = travelInfo.editor || [];
    const editableUpdated = user && editableIds.includes(user.id);
    setEditable(editableUpdated);
  }, [user, travelInfo]);

  useEffect(() => {
    if (!travelId) {
      return;
    }
    const stopSync = travelRepository.syncTravel(travelId, (data) => {
      data && setTravelInfo(data);
      data.nodes && setTravelNode(data.nodes);
      data.expenses && setExpensesList(data.expenses);
    });

    return () => stopSync;
  }, [travelId, travelRepository]);

  return (
    <>
      <Header name={user.name} />
      <section className={styles.dashboard}>
        <div className={styles.container}>
          <Map
            createMap={createMap}
            repositionMap={repositionMap}
            updateTravel={updateTravel}
            travelInfo={travelInfo}
            editable={editable}
          />
        </div>
        <div className={styles.container}>
          <nav className={styles.nav}>
            <button
              name="plan"
              className={`${styles.button} ${
                buttonSwitch === 'plan' && styles.active
              }`}
              onClick={onClick}
            >
              계획
            </button>
            <button
              name="expenses"
              className={`${styles.button} ${
                buttonSwitch === 'expenses' && styles.active
              }`}
              onClick={onClick}
            >
              경비
            </button>
            {editable && (
              <button
                name="setting"
                className={`${styles.button} ${
                  buttonSwitch === 'setting' && styles.active
                }`}
                onClick={onClick}
              >
                설정
              </button>
            )}
          </nav>
          <div className={styles['scroll-area']}>
            {
              {
                plan: (
                  <Plan
                    updateTravel={updateTravel}
                    searchAtMap={searchAtMap}
                    travelInfo={travelInfo}
                    travelNode={travelNode}
                    createOrUpdateTravelNode={createOrUpdateTravelNode}
                    removeTravelNode={removeTravelNode}
                    handleDisplayMarker={handleDisplayMarker}
                    editable={editable}
                  />
                ),
                expenses: (
                  <Expenses
                    list={expensesList}
                    createOrUpdateExpenses={createOrUpdateExpenses}
                    removeExpenses={removeExpenses}
                    editable={editable}
                  />
                ),
                setting: <TravelSetting travelId={travelId} />,
              }[buttonSwitch]
            }
          </div>
        </div>
      </section>
    </>
  );
};
export default Dashboard;
