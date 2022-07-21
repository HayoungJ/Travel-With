import { onValue, ref, remove, set } from 'firebase/database';
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

  removeTravelSubData(travelId, type, data) {
    remove(ref(firebaseDatabase, `travels/${travelId}/${type}/${data.id}`));
  }

  syncTravel(travelId, onUpdate) {
    const travelRef = ref(firebaseDatabase, `travels/${travelId}`);
    const stopSync = onValue(travelRef, (snapshot) => {
      const data = snapshot.val();
      data && onUpdate(data);
    });

    return () => stopSync;
  }
}

export default TravelRepository;
