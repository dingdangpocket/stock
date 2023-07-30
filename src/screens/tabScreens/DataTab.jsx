/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useRef, useEffect, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const DataTab = () => {
  const [data, setData] = useState([]);
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
  useFocusEffect(
    React.useCallback(() => {
      console.log('MyScreen is focused');
      fetch('http://47.109.111.138:8888/product/page?pageNum=1&pageSize=300', {
        method: 'GET',
        headers: {
          // satoken: getToken('satoken'),
          'Content-Type': 'application/json',
        },
      })
        .then(response =>
          response.json().then(res => {
            if (res.code === 200) {
              setData(res.data.content);
            }
          }),
        )
        .catch(err => {
          console.log(err);
        });
      return () => {
        console.log('MyScreen is unfocused');
      };
    }, [])
  );
  const totalStock = useMemo(() => {
    const result = data.reduce((sum, next) => {
      return sum + next.stock;
    }, 0);
    return result;
  }, [data]);

  const total = useMemo(() => {
    const result = data.reduce((sum, next) => {
      return sum + next.total;
    }, 0);
    return result;
  }, [data]);

  const totalSell = useMemo(() => {
    const result = data.reduce((sum, next) => {
      return sum + next.stock * next.sell;
    }, 0);
    return result;
  }, [data]);
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 38, color: 'rgb(85,85,85)'}}>库存金额</Text>
      <Text style={{fontSize: 37}}>￥{total.toFixed(2)}</Text>
      <Text style={{fontSize: 38, color: 'rgb(85,85,85)'}}>预估利润</Text>
      <Text style={{fontSize: 37}}>
        ￥{(totalSell.toFixed(2) - total.toFixed(2)).toFixed(2)}
      </Text>
      <Text style={{fontSize: 38, color: 'rgb(85,85,85)'}}>总条数</Text>
      <Text style={{fontSize: 37}}>{totalStock}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 15,
  },
});
export default DataTab;
