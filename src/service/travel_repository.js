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
        if (!snapshot.hasChild('id')) {
          onNoData();
          return;
        }

        onUpdate(snapshot.val());
      }
    );

    return () => stopSync;
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

  async removeUserTravel(userId, travelId) {
    const data = await this.getUserTravel(userId);
    const updated = data ? data.filter((element) => element !== travelId) : [];
    this.saveUserTravel(userId, updated);
  }
}

export default TravelRepository;
