import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {ToastAndroid} from 'react-native';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const login = () => {
    if (!email) {
      alert('Enter Email');
    } else if (!pass) {
      alert('Enter Password');
    } else {
      auth()
        .signInWithEmailAndPassword(email, pass)
        .then(res => {
          console.log('User account created & signed in!', res);
          navigation.navigate('Home');
          ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            alert('Not Registered');
          }

          if (error.code === 'auth/invalid-email') {
            alert('That email address is invalid!');
          }

          if (error.code === 'auth/wrong-password') {
            alert('Wrong Password');
          }
        });
    }
  };
  useEffect(() => {
    setEmail('');
    setPass('');
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#3eb6ed',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomLeftRadius: 160,
        }}>
        <Text style={{fontSize: 30, color: '#292929', fontWeight: '700'}}>
          Login
        </Text>
      </View>
      <View style={{flex: 2, backgroundColor: '#3eb6ed'}}>
        <View
          style={{
            backgroundColor: '#fff',
            flex: 1,
            borderTopRightRadius: 160,
            paddingTop: 100,
          }}>
          <View
            style={{
              height: 50,
              width: '80%',
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: '#292929',
              paddingHorizontal: 10,
              justifyContent: 'center',
            }}>
            <TextInput
              style={{height: 40, fontSize: 14, textTransform: 'lowercase'}}
              placeholder="Enter Your Email"
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
            />
          </View>
          <View
            style={{
              height: 50,
              width: '80%',
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: '#292929',
              paddingHorizontal: 10,
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <TextInput
              style={{height: 40, fontSize: 14}}
              placeholder="Enter Your Password"
              value={pass}
              onChangeText={text => setPass(text)}
              // secureTextEntry
            />
          </View>
          <TouchableOpacity
            onPress={login}
            style={{
              width: 60,
              paddingVertical: 10,
              backgroundColor: '#3eb6ed',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 20,
              borderRadius: 5,
            }}>
            <Text style={{fontSize: 14, fontWeight: '500'}}>Login</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            <Text style={{fontSize: 14, fontWeight: '400'}}>
              Don't have a account go to
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Singup')}>
              <Text style={{fontSize: 14, fontWeight: '400', color: '#3eb6ed'}}>
                {' '}
                Sing Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
