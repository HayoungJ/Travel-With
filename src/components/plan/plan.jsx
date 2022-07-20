import React, { useEffect, useState } from 'react';
import AddTravelNode from '../add_travel_node/add_travel_node';
import EditTravelNode from '../edit_travel_node/edit_travel_node';
import styles from './plan.module.css';

const Plan = ({
  searchAtMap,
  travelNode,
  createOrUpdateTravelNode,
  removeTravelNode,
  handleDisplayMarker,
}) => {
  return (
    <section className={styles.plan}>
      <ul className={styles.nodes}>
        <AddTravelNode
          createTravelNode={createOrUpdateTravelNode}
          searchAtMap={searchAtMap}
        />
        <hr className={styles.hr} />
        {Object.keys(travelNode).map((key) => (
          <EditTravelNode
            key={key}
            node={travelNode[key]}
            updateTravelNode={createOrUpdateTravelNode}
            removeTravelNode={removeTravelNode}
            searchAtMap={searchAtMap}
            handleDisplayMarker={handleDisplayMarker}
          />
        ))}
      </ul>
    </section>
  );
};

export default Plan;
