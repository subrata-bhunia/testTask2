import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
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
            onPress={() => navigation.navigate('Singup')}
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
