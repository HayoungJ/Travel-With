import { get, onValue, ref, remove, set } from 'firebase/database';
import { firebaseDatabase } from './firebase';

class TravelRepository {
  saveTravel(travelId, info) {
    set(ref(firebaseDatabase, `travels/${travelId}`), {
      ...info,
    });
  }

  saveTravelSubData(travelId, type, data) {
    set(ref(firebaseDatabase, `travels/${travelId}/${type}/${data.id}`), {
      ...data,
    });
  }

  saveUserTravel(userId, travelIds) {
    set(ref(firebaseDatabase, `users/${userId}/travels`), {
      ...travelIds,
    });
  }

  syncTravel(travelId, onUpdate, onNoData) {
    const stopSync = onValue(
      ref(firebaseDatabase, `travels/${travelId}`),
      (snapshot) => {
        const data = snapshot.val();
        data && onUpdate(data);
        !data && onNoData();
      }
    );

    return () => stopSync;
  }

  async getTravel(travelId) {
    try {
      const data = await get(ref(firebaseDatabase, `travels/${travelId}`));
      return data.val();
    } catch {}
  }

  async getUserTravel(userId) {
    try {
      const data = await get(ref(firebaseDatabase, `users/${userId}/travels`));
      return Object.values(data.val());
    } catch {}
  }

  removeTravel(travelId) {
    remove(ref(firebaseDatabase, `travels/${travelId}`));
  }

  removeTravelSubData(travelId, type, data) {
    remove(ref(firebaseDatabase, `travels/${travelId}/${type}/${data.id}`));
  }
}

export default TravelRepository;
