import { ref, set } from 'firebase/database';
import { firebaseDatabase } from './firebase';

class TravelRepository {
  saveTravel(travelId, info) {
    set(ref(firebaseDatabase, 'travels/' + travelId), {
      ...info,
    });
  }
}

export default TravelRepository;
