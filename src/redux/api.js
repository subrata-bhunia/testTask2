import firestore from '@react-native-firebase/firestore';

const productsColl = firestore().collection('products');
let all = [];
export const getAll = () => {
  productsColl.get().then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
      all.push({
        id: documentSnapshot.id,
        data: documentSnapshot.data(),
      });
    });
  });
  return all;
};
