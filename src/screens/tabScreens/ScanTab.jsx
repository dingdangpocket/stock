/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {BarCode, AddGoods} from 'src/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ScanTab = ({navigation}) => {
  const handleQueryInfo = () => {
    navigation.navigate('ScanStack');
  };
  useEffect(() => {
    checkCameraPermission();
  }, []);
  const checkCameraPermission = async () => {
    let status = await Camera.getCameraPermissionStatus();
    if (status !== 'authorized') {
      await Camera.requestCameraPermission();
      status = await Camera.getCameraPermissionStatus();
      if (status === 'denied') {
        Alert.alert(
          'You will not be able to scan if you do not allow camera access'
        );
      }
    }
  };
  //CAMERA
  const [modalVisible, setModalVisible] = useState(false);
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [field4, setField4] = useState('');
  const [field5, setField5] = useState('');
  const [field6, setField6] = useState('');
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
  const handleSave = async () => {
    console.log('保存数据:', field1, field2, field3, field4, field5, field6);
    fetch('http://47.109.111.138:8888/product/create', {
      method: 'POST',
      headers: {
        satoken: await getToken('satoken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: field1,
        name: field2,
        stock: field3,
        cost: field4,
        total: field5,
        sell: field6,
      }),
    })
      .then(response =>
        response.json().then(res => {
          if (res.code === 200) {
            console.log('Red', res);
            Alert.alert('保存成功');
            setModalVisible(false);
          } else {
            console.log('Red', res);
            Alert.alert(
              '提示',
              '商品保存失败，请检查是否已经存在该商品',
              [{text: '确认'}],
              {cancelable: false}
            );
          }
        })
      )
      .catch(err => {
        console.log('err', err);
        Alert.alert(
          '提示',
          '商品保存失败，请检查是否已经存在该商品',
          [{text: '确认'}],
          {cancelable: false}
        );
      });
  };
  return (
    <View style={styles.container}>
      <View style={{marginBottom: 10}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}>
          <AddGoods width="55%" height="55%" />
          <Text style={styles.buttonText}>新建商品</Text>
        </TouchableOpacity>
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.title}>新增商品</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入商品条码"
              value={field1}
              onChangeText={text => setField1(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="请输入商品名称"
              value={field2}
              onChangeText={text => setField2(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="请输入商品库存"
              value={field3}
              onChangeText={text => setField3(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="请输入商品进价"
              value={field4}
              onChangeText={text => setField4(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="请输入库存金额"
              value={field5}
              onChangeText={text => setField5(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="请输入市场价格"
              value={field6}
              onChangeText={text => setField6(text)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button2} onPress={handleSave}>
                <Text style={styles.buttonText}>保存</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleQueryInfo}>
          <BarCode width="68%" height="68%" />
          <Text style={styles.buttonText}>条码查询</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 150,
    width: 150,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(50,50,50)',
    borderRadius: 5,
  },
  button2: {
    height: 60,
    width: 90,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(50,50,50)',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
export default ScanTab;
