import React, { useEffect } from 'react';
import styles from './travel_setting.module.css';

const TravelSetting = ({
  travelId,
  editableUser,
  removeEditor,
  handlePlanDelete,
  handleFallOut,
  isOwner,
}) => {
  const travelLink = `http://localhost:3000/travel/${travelId}`;

  const onShare = () => {
    navigator.clipboard.writeText(travelLink);
  };

  const onRemove = (id) => {
    removeEditor(editableUser[id]);
  };

  const onDelete = () => {
    handlePlanDelete();
  };

  const onFallOut = () => {
    handleFallOut();
  };

  return (
    <section className={styles.setting}>
      <article className={styles.share}>
        <h1 className={styles.title}>공유하기</h1>
        <p className={styles.link} onClick={onShare}>
          {travelLink}
        </p>
      </article>
      <article className={styles.participation}>
        <h1 className={styles.title}>참여자 관리</h1>
        <ul className={styles.table}>
          {editableUser &&
            Object.keys(editableUser).map((key) => (
              <li key={key} className={styles.user}>
                <p className={styles.name}>{editableUser[key].name}</p>
                {editableUser[key].owner ? (
                  <p className={styles.owner}>(소유자)</p>
                ) : (
                  <button
                    className={styles.remove}
                    onClick={() => onRemove(key)}
                  >
                    X
                  </button>
                )}
              </li>
            ))}
        </ul>
      </article>
      <article className={styles.delete}>
        {isOwner ? (
          <button className={styles.button} onClick={onDelete}>
            이 계획을 삭제합니다
          </button>
        ) : (
          <button className={styles.button} onClick={onFallOut}>
            이 계획에 참여하지 않습니다
          </button>
        )}
      </article>
    </section>
  );
};

export default TravelSetting;
