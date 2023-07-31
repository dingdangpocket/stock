/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View} from 'react-native';
import RoutesNav from './src/components/RoutesNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
const App = () => {
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Data stored successfully');
    } catch (error) {
      console.log('Error storing data: ', error);
    }
  };
  useEffect(() => {
    fetch(
      'http://47.109.111.138:8888/user/login?username=niegang&password=niegang123$',
      {
        method: 'POST',
      },
    ).then(response =>
      response.json().then(res => {
        if (res.code === 200) {
          storeData('satoken', res.data.tokenValue);
        }
      }),
    );
  }, []);
  return (
    <View style={{flex: 1}}>
      <RoutesNav />
    </View>
  );
};
export default App;
