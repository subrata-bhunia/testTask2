import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
const Singup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  useEffect(() => {
    setEmail('');
    setPass('');
  }, []);
  const signUp = () => {
    if (!email) {
      alert('Enter Email');
    } else if (!pass) {
      alert('Enter Password');
    } else {
      auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(() => {
          console.log('User account created & signed in!');
          navigation.navigate('Home');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }
  };
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
          SingUp
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
              style={{height: 40, fontSize: 14}}
              placeholder="Enter Your Email"
              value={email}
              onChangeText={text => setEmail(text)}
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
            />
          </View>
          <TouchableOpacity
            onPress={signUp}
            style={{
              width: 70,
              paddingVertical: 10,
              backgroundColor: '#3eb6ed',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 20,
              borderRadius: 5,
            }}>
            <Text style={{fontSize: 14, fontWeight: '500'}}>Sing Up</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            <Text style={{fontSize: 14, fontWeight: '400'}}>
              Already have a account go to
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{fontSize: 14, fontWeight: '400', color: '#3eb6ed'}}>
                {' '}
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Singup;

const styles = StyleSheet.create({});
