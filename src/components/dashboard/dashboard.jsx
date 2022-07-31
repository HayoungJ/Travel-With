import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Expenses from '../expenses/expenses';
import Header from '../header/header';
import Map from '../map/map';
import Plan from '../plan/plan';
import TravelSetting from '../travel_setting/travel_setting';
import styles from './dashboard.module.css';

const Dashboard = ({ authService, travelRepository, kakaoMap }) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const travelId = params.travelId;

  const [userId, setUserId] = useState(location?.state?.id || '');
  const [userName, setUserName] = useState(location?.state?.name || '');
  const [travelInfo, setTravelInfo] = useState({});
  const [buttonSwitch, setButtonSwitch] = useState('plan');
  const [map, setMap] = useState();
  const [mapMarkers, setMapMarkers] = useState({});
  const [travelNode, setTravelNode] = useState({});
  const [expensesList, setExpensesList] = useState({});
  const [editable, setEditable] = useState(false);
  const [editableUser, setEditableUser] = useState({});
  const [owner, setOwner] = useState('');

  const onLogout = () => {
    authService.logout();
  };

  const createMap = useCallback(
    (container) => {
      const newMap = kakaoMap.createMap(container);
      setMap(newMap);
    },
    [kakaoMap]
  );

  const repositionMap = useCallback(
    (place) => {
      place && kakaoMap.repositionMap(map, place);
    },
    [kakaoMap, map]
  );

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

  const removeEditor = (editor) => {
    travelRepository.removeTravelSubData(travelId, 'editor', editor);
    const updated = { ...editableUser };
    delete updated[editor.id];
    setEditableUser(updated);
  };

  const handlePlanDelete = () => {
    Object.keys(editableUser).forEach((userId) => {
      travelRepository.removeUserTravel(userId, travelId);
    });
    travelRepository.removeTravel(travelId);
    navigate('/select');
  };

  const handleFallOut = () => {
    travelRepository.removeTravelSubData(travelId, 'editor', { id: userId });
    travelRepository.removeUserTravel(userId, travelId);
    navigate('/select');
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
    if (!Object.keys(travelInfo).includes('editor')) return;

    if (!userId) {
      setEditable(false);
      return;
    }

    const updatedOwner = travelInfo.owner;
    const updatedEditableUser = travelInfo.editor;
    const updatedEditableStatus =
      Object.keys(updatedEditableUser).includes(userId);
    setOwner(updatedOwner);
    setEditable(updatedEditableStatus);
    setEditableUser(updatedEditableUser);
  }, [userId, travelInfo]);

  useEffect(() => {
    const stopSync = travelRepository.syncTravel(
      travelId,
      (data) => {
        setTravelInfo(data);
        data.nodes && setTravelNode(data.nodes);
        data.expenses && setExpensesList(data.expenses);
      },
      () => {
        navigate('/404-not-found');
      }
    );

    return () => stopSync;
  }, [navigate, travelId, travelRepository]);

  useEffect(() => {
    const stopSync = authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName);
      } else {
        setUserId(null);
        setUserName(null);
      }
    });

    return () => stopSync();
  });

  return (
    <>
      <Header onLogout={onLogout} id={userId} name={userName} />
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
                setting: (
                  <TravelSetting
                    travelId={travelId}
                    editableUser={editableUser}
                    isOwner={owner === userId ? true : false}
                    removeEditor={removeEditor}
                    handlePlanDelete={handlePlanDelete}
                    handleFallOut={handleFallOut}
                  />
                ),
              }[buttonSwitch]
            }
          </div>
        </div>
      </section>
    </>
  );
};
export default Dashboard;
