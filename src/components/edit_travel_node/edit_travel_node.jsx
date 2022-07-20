import React, { useRef, useState } from 'react';
import styles from './edit_travel_node.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const EditTravelNode = ({
  node,
  updateTravelNode,
  removeTravelNode,
  searchAtMap,
  handleDisplayMarker,
}) => {
  const { title, place, description } = node;

  const placeRef = useRef();

  const [marker, setMarker] = useState(node.marker);
  const [isSelected, setIsSelected] = useState(false);

  const onChange = (event) => {
    event.preventDefault();
    updateTravelNode({
      ...node,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handelMarkerSelect = (place) => {
    if (!place) return;

    placeRef.current.value = `${place.place_name} (${place.address_name})`;
    setMarker(place);
  };

  const onSelect = () => {
    handleDisplayMarker(marker);
    setIsSelected(!isSelected);
  };

  const onDelete = () => {
    removeTravelNode(node);
  };

  return (
    <li className={styles.node}>
      <form className={styles.form}>
        <div className={styles['input-wrap']}>
          <label className={styles.label}>제목</label>
          <input
            className={styles.input}
            name="title"
            placeholder="제목"
            value={title}
            onChange={onChange}
          />
        </div>
        <div className={styles['input-wrap']}>
          <label className={styles.label}>위치</label>
          <input
            ref={placeRef}
            className={styles.input}
            name="place"
            placeholder="위치"
            value={place}
            onChange={(event) => {
              onChange(event);
              searchAtMap(event.currentTarget.value, handelMarkerSelect);
            }}
          />
        </div>
        <div className={styles['input-wrap']}>
          <label className={styles.label}>설명</label>
          <input
            className={styles.input}
            name="description"
            placeholder="설명"
            value={description}
            onChange={onChange}
          />
        </div>
      </form>
      <div className={styles['button-wrap']}>
        {marker.id !== -1 && (
          <button
            className={`${styles.button} ${styles.flag} ${
              isSelected ? styles.active : ''
            }`}
            onClick={onSelect}
          >
            <FontAwesomeIcon icon={faFlag} />
          </button>
        )}
        <button
          className={`${styles.button} ${styles.delete}`}
          onClick={onDelete}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </li>
  );
};

export default EditTravelNode;
