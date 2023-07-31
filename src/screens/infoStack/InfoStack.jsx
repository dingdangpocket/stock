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
  Image,
} from 'react-native';
import CardComponent from '../../components/CardComponent';
import {Alipay, WechatPay, BarCode, Back} from 'src/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const InfoStack = ({route, navigation}) => {
  const [data, setData] = useState();
  const [barcodes] = useState(route.params.barcodes);
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
  useEffect(() => {
    if (!barcodes) {
      return;
    }
    const asyncFetch = async () => {
      fetch(
        `http://47.109.111.138:8888/product/page?keywords=${barcodes}&pageNum=1&pageSize=300`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            satoken: await getToken('satoken'),
          },
        }
      )
        .then(response =>
          response.json().then(res => {
            if (res.code === 200) {
              setData(res.data.content[0]);
            }
          })
        )
        .catch(err => {
          console.log(err);
        });
    };
    asyncFetch();
  }, [barcodes]);
  const handleSaveCard = async newData => {
    fetch('http://47.109.111.138:8888/product/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        headers: {satoken: await getToken('satoken')},
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
        })
      )
      // eslint-disable-next-line handle-callback-err
      .catch(err => {
        Alert.alert('提示', '盘点失败', [{text: '确认'}], {
          cancelable: false,
        });
      });
  };

  const handleDelCard = async id => {
    fetch(`http://47.109.111.138:8888/product/remove/${id}`, {
      method: 'DELETE',
      headers: {satoken: await getToken('satoken')},
    })
      .then(response =>
        response.json().then(res => {
          if (res.code === 200) {
            Alert.alert('提示', '删除成功', [{text: '确认'}], {
              cancelable: false,
            });
          }
        })
      )
      .catch(err => {
        console.log(err);
      });
  };
  const [modalVisible, setModalVisible] = useState(false);

  const [curPay, setCurPay] = useState();
  const handleAli = () => {
    setModalVisible(true);
    setCurPay(1);
  };
  const handleWechat = () => {
    setModalVisible(true);
    setCurPay(2);
  };

  return (
    data && (
      <View style={styles.container}>
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            {curPay === 1 ? (
              <Image
                source={require('../../static/alipay.jpg')}
                style={{width: 325, height: 490, marginTop: -40}}
              />
            ) : (
              <Image
                source={require('../../static/wechat.jpg')}
                style={{width: 325, height: 460, marginTop: -40}}
              />
            )}
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
            onPress={() => handleAli()}>
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
              marginTop: 4.5,
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
            onPress={() => handleWechat()}>
            <WechatPay width="145%" height="145%" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            height: 60,
            width: 80,
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(50,50,50)',
            borderRadius: 5,
            marginTop: 16,
          }}
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
  modalContainer: {
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
