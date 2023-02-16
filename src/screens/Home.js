import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-elements';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {productsRequest, productsSuccess} from '../redux/reducers';
const Home = () => {
  const [allproduct, setallProduct] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const productsColl = firestore().collection('products');
  var all = [];
  const getAll = () => {
    productsColl.get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        all.push({
          id: documentSnapshot.id,
          data: documentSnapshot.data(),
        });
      });
      setallProduct(all);
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    getAll();
    dispatch(productsRequest());
  }, [isFocused]);
  const deleteProducts = id => {
    productsColl
      .doc(id)
      .delete()
      .then(() => {
        console.log('Product deleted!');
        getAll();
      });
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={allproduct}
        numColumns={2}
        renderItem={({item}) => {
          return (
            <Pressable
              style={{
                // height: 200,
                width: '45%',
                padding: 10,
                backgroundColor: '#FAFAFA',
                margin: 10,
              }}>
              <Image
                source={{
                  uri: item?.data?.image,
                }}
                style={{
                  height: 120,
                  display: item?.data?.image == '' ? 'none' : 'flex',
                }}
              />
              <View
                style={{
                  alignSelf: 'baseline',
                }}>
                <Text
                  style={{
                    color: '#000',
                  }}
                  numberOfLines={2}>
                  {item?.data.name}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      textDecorationLine: 'line-through',
                      textDecorationColor: '#f00',
                      color: '#666',
                    }}>
                    ₹{item?.data?.price}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 7,
                    }}>
                    <Text
                      style={{
                        color: '#000',
                      }}>
                      ₹{item?.data.offer_price}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Pressable
                    onPress={() => {
                      deleteProducts(item?.id);
                    }}
                    style={{
                      width: '50%',
                      backgroundColor: 'red',
                      padding: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/3405/3405244.png',
                      }}
                      style={{
                        height: 24,
                        width: 24,
                        resizeMode: 'contain',
                        tintColor: 'white',
                      }}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('AddProduct', {item});
                    }}
                    style={{
                      width: '50%',
                      backgroundColor: 'green',
                      padding: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={{
                        uri: 'https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png',
                      }}
                      style={{
                        height: 24,
                        width: 24,
                        resizeMode: 'contain',
                        tintColor: 'white',
                      }}
                    />
                  </Pressable>
                </View>
              </View>
            </Pressable>
          );
        }}
        ListFooterComponent={() => {
          return (
            <>
              <Pressable
                onPress={() => {
                  navigation.navigate('AddProduct');
                }}
                style={{
                  height: 50,
                  width: '90%',
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 'auto',
                  marginBottom: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    letterSpacing: 1,
                    color: '#000',
                  }}>
                  Add Product
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  auth()
                    .signOut()
                    .then(() => {
                      ToastAndroid.show('User signed out!', ToastAndroid.SHORT);
                      navigation.navigate('Login');
                    });
                }}
                style={{
                  height: 50,
                  width: '90%',
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 'auto',
                  marginBottom: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    letterSpacing: 1,
                    color: '#000',
                  }}>
                  Log Out
                </Text>
              </Pressable>
            </>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                height: Dimensions.get('screen').height - 200,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                }}>
                No Product Found
              </Text>
            </View>
          );
        }}
        ListHeaderComponent={() => {
          return (
            <View
              style={{
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 25,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}>
                Product
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
