import React, { useRef, useState } from 'react';
import styles from './add_travel_node.module.css';

const AddTravelNode = ({ createTravelNode, searchAtMap }) => {
  const formRef = useRef();
  const titleRef = useRef();
  const placeRef = useRef();
  const descriptionRef = useRef();

  const [marker, setMarker] = useState({
    id: -1,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    createTravelNode({
      id: `node-${Date.now()}`,
      title: titleRef.current.value,
      place: placeRef.current.value,
      description: descriptionRef.current.value,
      marker,
    });
    formRef.current.reset();
  };

  const handelMarkerSelect = (place) => {
    if (!place) return;

    placeRef.current.value = `${place.place_name} (${place.address_name})`;
    setMarker(place);
  };

  return (
    <li className={styles.node}>
      <form ref={formRef} className={styles.form}>
        <div className={styles['input-wrap']}>
          <label className={styles.label}>제목</label>
          <input
            ref={titleRef}
            className={styles.input}
            name="title"
            placeholder="제목"
          />
        </div>
        <div className={styles['input-wrap']}>
          <label className={styles.label}>위치</label>
          <input
            ref={placeRef}
            className={styles.input}
            name="place"
            placeholder="위치"
            onChange={(event) => {
              searchAtMap(event.currentTarget.value, handelMarkerSelect);
            }}
          />
        </div>
        <div className={styles['input-wrap']}>
          <label className={styles.label}>설명</label>
          <input
            ref={descriptionRef}
            className={styles.input}
            name="description"
            placeholder="설명"
          />
        </div>
        <div className={styles['button-wrap']}>
          <button className={styles.button} onClick={onSubmit}>
            추가
          </button>
        </div>
      </form>
      <hr className={styles.hr} />
    </li>
  );
};

export default AddTravelNode;
