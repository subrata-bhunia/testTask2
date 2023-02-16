import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import AddProduct from '../screens/AddProduct';
import Login from '../screens/Login';
import Singup from '../screens/Singup';

const StackNav = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Singup" component={Singup} />
    </Stack.Navigator>
  );
};

export default StackNav;

const styles = StyleSheet.create({});
