/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import RoutesNav from './src/components/RoutesNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
const App = () => {
  const [tokenState, setTokenState] = useState();
  const setToken = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Data stored successfully');
      setTokenState(true);
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

  const authTokenTime = async () => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      fetch('http://47.109.111.138:8888/product/page?pageNum=1&pageSize=350', {
        method: 'GET',
        headers: {satoken: await getToken('satoken')},
      })
        .then(response => response.json())
        .then(data => {
          if (data.code === 500) {
            resolve(false);
          }
          if (data.code === 200) {
            resolve(true);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  const login = async () => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      fetch(
        'http://47.109.111.138:8888/user/login?username=niegang&password=niegang123$',
        {
          method: 'POST',
        }
      )
        .then(response => response.json())
        .then(data => {
          if (data.code === 200) {
            resolve(data.data.tokenValue);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const checkLocalToken = async () => {
    return await getToken('satoken');
  };
  useEffect(() => {
    if (!checkLocalToken()) {
      loginAs();
    }
    const authTokenTimeAs = async () => {
      const bool = await authTokenTime();
      bool ? setTokenState(true) : loginAs();
    };
    const loginAs = async () => {
      const token = await login();
      setToken('satoken', token);
    };
    authTokenTimeAs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <View style={{flex: 1}}>{<RoutesNav />}</View>;
};
export default App;
