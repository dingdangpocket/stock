/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
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

  // const login = () => {
  //   const asyncFet = async () => {
  //     await fetch(
  //       'http://47.109.111.138:8888/user/login?username=niegang&password=niegang123$',
  //       {
  //         method: 'POST',
  //       }
  //     ).then(response =>
  //       response.json().then(res => {
  //         if (res.code === 200) {
  //           setToken('satoken', res.data.tokenValue);
  //           setTokenState(res.data.tokenValue);
  //         }
  //       })
  //     );
  //   };
  //   asyncFet();
  // };
  const authToken = async () => {
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

  const checkToken = async () => {
    return await getToken('satoken');
  };
  useEffect(() => {
    if (!checkToken()) {
      loginAs();
    }
    const authTokenAs = async () => {
      const bool = await authToken();
      if (!bool) {
        loginAs();
      }
    };
    const loginAs = async () => {
      const token = await login();
      setToken('satoken', token);
    };
    authTokenAs();
    // loginAs();
  }, []);
  return <View style={{flex: 1}}>{tokenState ? <RoutesNav /> : ''}</View>;
};
export default App;
