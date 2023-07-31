/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View} from 'react-native';
import RoutesNav from './src/components/RoutesNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
const App = () => {
  const setToken = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Data stored successfully');
    } catch (error) {
      console.log('Error storing data: ', error);
    }
  };
  const getToken = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Data retrieved successfully: ', value);
        return value;
      } else {
        console.log('No data found');
      }
    } catch (error) {
      console.log('Error retrieving data: ', error);
    }
  };
  const login = () => {
    fetch(
      'http://47.109.111.138:8888/user/login?username=niegang&password=niegang123$',
      {
        method: 'POST',
      }
    ).then(response =>
      response.json().then(res => {
        if (res.code === 200) {
          setToken('satoken', res.data.tokenValue);
        }
      })
    );
  };
  const authToken = async () => {
    fetch('http://47.109.111.138:8888/product/page?pageNum=1&pageSize=350', {
      method: 'GET',
      headers: {satoken: await getToken('satoken')},
    })
      .then(response =>
        response.json().then(res => {
          if (res.code === 500) {
            login();
          }
          console.log('res', res);
        })
      )
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    authToken();
    const checkLocalToken = async () => {
      if (!(await AsyncStorage.getItem('satoken'))) {
        login();
      }
    };
    checkLocalToken();
  }, []);
  return (
    <View style={{flex: 1}}>
      <RoutesNav />
    </View>
  );
};
export default App;
