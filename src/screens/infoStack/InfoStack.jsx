/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import CardComponent from '../../components/CardComponent';
const InfoStack = ({route, navigation}) => {
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
      },
    )
      .then(response =>
        response.json().then(res => {
          if (res.code === 200) {
            console.log('res.data.content', res.data.content[0]);
            setData(res.data.content[0]);
          }
          console.log('搜索数据', res);
        }),
      )
      .catch(err => {
        console.log(err);
      });
  }, [barcodes]);
  //   #FF7A22
  const handleSaveCard = newData => {
    console.log('newData', newData);
    fetch('http://47.109.111.138:8888/product/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: newData.id,
        code: newData.code,
        name: newData.name,
        stock: newData.stock,
        cost: newData.cost,
        sell: newData.sell,
        total: newData.total,
      }),
    })
      .then(response =>
        response.json().then(res => {
          if (res.code === 200) {
            console.log('修改结果', res);
          }
        })
      )
      .catch(err => {
        console.log(err);
      });
    console.log('commit数据', newData);
  };

  const handleDelCard = id => {
    fetch(`http://47.109.111.138:8888/product/remove/${id}`, {
      method: 'DELETE',
    })
      .then(response =>
        response.json().then(res => {
          if (res.code === 200) {
            Alert.alert('提示', '删除成功', [{text: '确认'}], {
              cancelable: false,
            });
          }
          console.log('删除结果', res);
        })
      )
      .catch(err => {
        console.log(err);
      });
  };
  return (
    data && (
      <View style={styles.container}>
        <CardComponent
          item={{...data}}
          onSave={newData => handleSaveCard(newData)}
          onDel={id => handleDelCard(id)}
        />
        {/* <View
          style={{
            ...styles.infoCard,
            backgroundColor:
              data[0]?.stock >= 0 && data[0]?.stock <= 3
                ? 'white'
                : data[0]?.stock > 3 && data[0]?.stock <= 8
                ? 'white'
                : 'white',
          }}>
          <Text style={{fontSize: 30, color: 'black', marginLeft: 12}}>
            详细信息
          </Text>
          <View
            style={{
              flexDirection: 'row',
              height: 20,
              justifyContent: 'center',
              alignContent: 'center',
              marginBottom: 2,
              marginLeft: 14,
            }}>
            <View
              style={{
                backgroundColor:
                  data[0]?.stock >= 0 && data[0]?.stock <= 3
                    ? '#FF7A22'
                    : data[0]?.stock > 3 && data[0]?.stock <= 8
                    ? 'green'
                    : 'red',
                width: 12,
                height: 12,
                borderRadius: 6,
                marginTop: 3,
              }}
            />
            <Text>
              {data[0]?.stock >= 0 && data[0]?.stock <= 3
                ? '库存紧张'
                : data[0]?.stock > 3 && data[0]?.stock <= 8
                ? '库存正常'
                : '库存过高'}
            </Text>
          </View>
          <Text style={styles.buttonText}>商品条码：{data[0]?.code}</Text>
          <Text style={styles.buttonText}>商品名称：{data[0]?.name}</Text>
          <Text style={styles.buttonText}>商品库存：{data[0]?.stock}</Text>
          <Text style={styles.buttonText}>库存金额：{data[0]?.total}</Text>
          <Text style={styles.buttonText}>商品进价：{data[0]?.cost}</Text>
          <Text style={styles.buttonText}>市场价格：{data[0]?.sell}</Text>
          <Text style={styles.buttonText}>
            商品利差：{(data[0]?.sell - data[0]?.cost).toFixed(2)}
          </Text>
        </View> */}
        <View
          style={{
            width: 250,
            height: 90,
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ScanTab')}>
            <Text style={styles.buttonText1}>返回</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace('ScanStack')}>
            <Text style={styles.buttonText1}>重新扫码</Text>
          </TouchableOpacity>
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
    height: 265,
    width: 295,
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 80,
    borderRadius: 10,
  },
  button: {
    height: 60,
    width: 90,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(50,50,50)',
    borderRadius: 5,
  },
  buttonText: {
    marginLeft: 15,
    color: 'black',
    fontSize: 18,
  },
  buttonText1: {
    color: 'white',
    fontSize: 18,
  },
});
export default InfoStack;
