/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import CardComponent from '../../components/CardComponent';
const InfoStack = ({route, navigation}) => {
  const [data, setData] = useState();
  const [barcodes] = useState(route.params.barcodes);
  useEffect(() => {
    if (!barcodes) {
      return;
    }
    fetch(
      `http://47.109.111.138:8888/product/page?keywords=${barcodes}&pageNum=1&pageSize=300`,
      {
        method: 'GET',
      }
    )
      .then(response =>
        response.json().then(res => {
          if (res.code === 200) {
            console.log('res.data.content', res.data.content[0]);
            setData(res.data.content[0]);
          }
        })
      )
      .catch(err => {
        console.log(err);
      });
  }, [barcodes]);
  //   #FF7A22
  const handleSaveCard = newData => {
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
            Alert.alert('提示', '盘点成功', [{text: '确认'}], {
              cancelable: false,
            });
          }
        }),
      )
      // eslint-disable-next-line handle-callback-err
      .catch(err => {
        Alert.alert('提示', '盘点失败', [{text: '确认'}], {
          cancelable: false,
        });
      });
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
        }),
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
          cancelDisable={true}
        />
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
