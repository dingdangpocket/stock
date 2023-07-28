import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
const InfoStack = ({route, navigation}) => {
  console.log(route.params);
  const [data, setData] = useState();
  const [barcodes, setBarcodes] = useState(route.params.barcodes);
  useEffect(() => {
    if (!barcodes) {
      return;
    }
    console.log('barcodes', barcodes);
    fetch(
      `http://47.109.111.138:8888/product/page?keywords=${barcodes}&pageNum=1&pageSize=300`,
      {
        method: 'GET',
      }
    )
      .then(response =>
        response.json().then(res => {
          if (res.code === 200) {
            setData(res.data.content);
          }
          console.log('搜索数据', res);
        })
      )
      .catch(err => {
        console.log(err);
      });
  }, [barcodes]);
  return (
    data && (
      <View style={styles.container}>
        <View style={styles.infoCard}>
          <Text style={styles.buttonText}>商品条码：{data[0]?.code}</Text>
          <Text style={styles.buttonText}>商品名称：{data[0]?.name}</Text>
          <Text style={styles.buttonText}>商品库存：{data[0]?.stock}</Text>
          <Text style={styles.buttonText}>库存金额：{data[0]?.total}</Text>
          <Text style={styles.buttonText}>商品进价：{data[0]?.cost}</Text>
          <Text style={styles.buttonText}>市场价格：{data[0]?.sell}</Text>
          <Text style={styles.buttonText}>
            商品利差：{(data[0]?.sell - data[0]?.cost).toFixed(2)}
          </Text>
        </View>
      </View>
    )
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    height: 200,
    width: 260,
    backgroundColor: 'black',
  },
  button: {
    height: 100,
    width: 160,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
    backgroundColor: 'black',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
export default InfoStack;
