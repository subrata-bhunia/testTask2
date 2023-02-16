import {
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Input} from 'react-native-elements';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';

const AddProduct = () => {
  const ProductCollections = firestore().collection('products');
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  useEffect(() => {
    requestExternalWritePermission();
    requestCameraPermission();
  }, []);
  const [image, setImage] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [name, setname] = React.useState('');
  const [price, setprice] = React.useState('');
  const [d_price, setd_price] = React.useState('');
  const selectImage = () => {
    let options = {};
    launchImageLibrary(
      {
        maxHeight: 500,
        maxWidth: 500,
        quality: 0.7,
      },
      res => {
        if (!res?.didCancel) {
          setImage(res.assets[0]);
          getImgUrl(res.assets[0]);
        } else {
          console.log('did Cancel');
        }
      },
    );
  };
  const uploadImage = async (localImagePath, remotePath) => {
    console.log('first', localImagePath, remotePath);
    const reference = storage().ref(remotePath);
    const task = reference.putFile(localImagePath);

    return new Promise((resolve, reject) => {
      task.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });

      task
        .then(() => {
          console.log('Image uploaded to the bucket!');
          return reference.getDownloadURL();
        })
        .then(downloadUrl => {
          resolve(downloadUrl);
        })
        .catch(error => {
          console.log('Image upload failed:', error);
          reject(error);
        });
    });
  };
  const getImgUrl = async image => {
    const imageUrl = await uploadImage(image?.uri, 'images/' + image?.fileName);
    console.log(`Download URL: ${imageUrl}`);
    setImageUrl(imageUrl);
  };

  const navigate = useNavigation();
  const route = useRoute();
  console.log('hdhdh', image?.uri);
  const addProduct = () => {
    ProductCollections.add({
      name: name,
      price,
      offer_price: d_price,
      image:
        image == ''
          ? 'https://static.thenounproject.com/png/3674270-200.png'
          : imageUrl,
    })
      .then(() => {
        console.log('Product added!');
        navigate.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  };
  const updateProduct = () => {
    ProductCollections.doc(route.params?.item?.id)
      .update({
        image: imageUrl,
        name,
        price,
        offer_price: d_price,
      })
      .then(() => {
        console.log('Product update');
        navigate.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (route.params !== undefined) {
      setImage(route.params?.item?.data?.image);
      setname(route.params?.item?.data?.name);
      setprice(route.params?.item?.data?.price);
      setd_price(route.params?.item?.data?.offer_price);
    }
  }, [route]);
  return (
    <View
      style={{
        flex: 1,
      }}>
      {image !== '' ? (
        <Image
          source={route.params !== undefined ? {uri: image} : {uri: image?.uri}}
          style={{
            height: 120,
            width: '90%',
            borderWidth: 1,
            marginVertical: 15,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            alignSelf: 'center',
          }}
        />
      ) : (
        <Pressable
          onPress={selectImage}
          style={{
            height: 120,
            width: '90%',
            borderWidth: 1,
            marginVertical: 15,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            alignSelf: 'center',
          }}>
          <Image
            source={{
              uri: 'https://static.thenounproject.com/png/3752804-200.png',
            }}
            style={{
              height: 50,
              width: 50,
              resizeMode: 'contain',
            }}
          />
        </Pressable>
      )}
      <View style={{width: '90%', alignSelf: 'center'}}>
        <Input
          label="Product Name"
          placeholder="Type Product Name"
          value={name}
          labelStyle={{
            color: '#000',
          }}
          onChangeText={txt => {
            setname(txt);
          }}
        />
        <Input
          label="Product Price"
          placeholder="Type Product Price"
          value={price}
          labelStyle={{
            color: '#000',
          }}
          onChangeText={txt => {
            setprice(txt);
          }}
          keyboardType="number-pad"
        />
        <Input
          label="Product Discount Price"
          placeholder="Type Discount Price"
          value={d_price}
          labelStyle={{
            color: '#000',
          }}
          onChangeText={txt => {
            setd_price(txt);
          }}
          keyboardType="number-pad"
        />
        <Pressable
          onPress={() => {
            addProduct();
            // uploadImage();
          }}
          style={{
            height: 50,
            width: '90%',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            display: route.params !== undefined ? 'none' : 'flex',
          }}>
          <Text>Add Product</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            updateProduct();
          }}
          style={{
            height: 50,
            width: '90%',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            display: route.params !== undefined ? 'flex' : 'none',
          }}>
          <Text>Update Product</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({});
