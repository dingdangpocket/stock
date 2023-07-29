/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useRef, useEffect, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
const DataTab = () => {
  const [data, setData] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      // 在组件获得焦点时执行一些操作
      console.log('MyScreen is focused');
      fetch('http://47.109.111.138:8888/product/page?pageNum=1&pageSize=300', {
        method: 'GET',
      })
        .then(response =>
          response.json().then(res => {
            if (res.code === 200) {
              setData(res.data.content);
            }
            console.log('列表数据', res);
          })
        )
        .catch(err => {
          console.log(err);
        });
      return () => {
        // 在组件失去焦点时执行一些操作
        console.log('MyScreen is unfocused');
      };
    }, []),
  );
  const totalStock = useMemo(() => {
    console.log('data', data);
    const result = data.reduce((sum, next) => {
      return sum + next.stock;
    }, 0);
    return result;
  }, [data]);

  const total = useMemo(() => {
    console.log('data', data);
    const result = data.reduce((sum, next) => {
      return sum + next.total;
    }, 0);
    return result;
  }, [data]);
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 38, color: 'rgb(85,85,85)'}}>总条数</Text>
      <Text style={{fontSize: 37}}>{totalStock}</Text>
      <Text style={{fontSize: 38, color: 'rgb(85,85,85)'}}>库存金额</Text>
      <Text style={{fontSize: 37}}>￥{total.toFixed(2)}</Text>
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
