import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-elements';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
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
  useEffect(() => {
    getAll();
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
                    {item?.data?.price}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 7,
                    }}>
                    <Icon name="inr" type="fontisto" size={15} />
                    <Text
                      style={{
                        color: '#000',
                      }}>
                      {item?.data.offer_price}
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
                    }}>
                    <Icon name="delete" type="antdesign" />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('AddProduct', {item});
                    }}
                    style={{
                      width: '50%',
                      backgroundColor: 'green',
                      padding: 5,
                    }}>
                    <Icon name="edit" type="antdesign" />
                  </Pressable>
                </View>
              </View>
            </Pressable>
          );
        }}
        ListFooterComponent={() => {
          return (
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
              }}>
              <Text>Add Product</Text>
            </Pressable>
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
              <Text>No Product Found</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
