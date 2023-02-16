import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Icon, Input} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
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
        setImage(res.assets[0]);
        console.log('a', res.assets);
        uploadImage();
      },
    );
  };
  const uploadImage = async () => {
    const {uri} = image;
    console.log(image, uri);
    const {filename} = image;
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    // const ss = decodeURI(uploadUri);
    // const path = `${utils.FilePath.DOCUMENT_DIRECTORY}/${ss}`;
    // setUploading(true);
    // setTransferred(0);
    const task = storage('').ref(filename).putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      console.log(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      );
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    // setUploading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!',
    );
    // setImage(null);
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
          ? 'https://cdn2.stylecraze.com/wp-content/uploads/2020/09/15-Best-Image-Skincare-Products-Of-2020.jpg'
          : image?.uri,
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
        image,
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
          <Icon name="camera" />
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
