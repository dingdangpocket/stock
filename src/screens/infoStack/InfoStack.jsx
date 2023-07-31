/* eslint-disable no-dupe-keys */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import CardComponent from '../../components/CardComponent';
import {Alipay, WechatPay, BarCode, Back} from 'src/icons';
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
  const [modalVisible, setModalVisible] = useState(false);
  return (
    data && (
      <View style={styles.container}>
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.title}>新增商品</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText1}>返回</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <CardComponent
          item={{...data}}
          onSave={newData => handleSaveCard(newData)}
          onDel={id => handleDelCard(id)}
          cancelDisable={true}
        />
        <View
          style={{
            width: 250,
            height: 80,
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{...styles.button, backgroundColor: '#1296db'}}
            onPress={() => setModalVisible(true)}>
            <Alipay width="80%" height="80%" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 75,
              width: 75,
              margin: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgb(50,50,50)',
              padding: 8,
              borderRadius: 40,
            }}
            onPress={() => navigation.replace('ScanStack')}>
            <BarCode width="65%" height="65%" />
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                color: 'rgb(235,235,235)',
              }}>
              重新扫码
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{...styles.button, backgroundColor: '#06b106'}}
            onPress={() => setModalVisible(true)}>
            <WechatPay width="145%" height="145%" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{...styles.button, marginTop: 15}}
          onPress={() => navigation.navigate('ScanTab')}>
          <View
            style={{
              width: 45,
              height: 45,
              marginRight: 4,
              marginBottom: -6,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Back width="80%" height="80%" />
          </View>

          <Text style={styles.buttonText1}>返回</Text>
        </TouchableOpacity>
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
  button: {
    height: 60,
    width: 90,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(50,50,50)',
    borderRadius: 5,
  },
  buttonText1: {
    color: 'white',
    fontSize: 13,
    color: 'rgb(235,235,235)',
  },
});
export default InfoStack;
