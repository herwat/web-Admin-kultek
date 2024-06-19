import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

const getAllRequests = async () => {
  const c = collection(firestore, 'requests');
  const querySnapshot = await getDocs(c);
  const requests = querySnapshot.docs.map((doc) => {
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

  return requests;
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

export { getAllRequests, subscribeToRequests };
