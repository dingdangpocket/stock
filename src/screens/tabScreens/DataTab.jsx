/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useRef, useEffect, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';

const DataTab = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://47.109.111.138:8888/product/page?pageNum=1&pageSize=300', {
      method: 'GET',
    })
      .then(response =>
        response.json().then(res => {
          if (res.code === 200) {
            setData(res.data.content);
          }
          console.log('列表数据', res);
        }),
      )
      .catch(err => {
        console.log(err);
      });
  }, []);
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
      <Text style={{fontSize: 35}}>库存条数:{totalStock}</Text>
      <Text style={{fontSize: 40}}>库存金额:{total.toFixed(2)}</Text>
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
