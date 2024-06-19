import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { Mitra } from './data';

const getAllMitras = async () => {
  const c = collection(firestore, 'mitras');
  const querySnapshot = await getDocs(c);
  const mitras = querySnapshot.docs.map((doc): Mitra => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      type: data.type,
      whatsapp: data.whatsapp,
      address: { text: data.address?.text, gmap: data.address?.gmap },
      rating: data.rating,
      is_open: data.is_open,
      schedule: data.schedule,
      products: data.products,
      image: data.image,
    };
  });

  return mitras;
};

const subscribeToRequests = (callback: (requests: any[]) => void) => {
  const c = collection(firestore, 'requests');
  const unsubscribe = onSnapshot(c, (snapshot) => {
    const requests = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        type: data.type,
        status: data.status,
        whatsapp: data.whatsapp,
        address: { text: data.address?.text, gmap: data.address?.gmap },
      };
    });
    callback(requests);
  });

  return unsubscribe;
};

export { getAllMitras, subscribeToRequests };
