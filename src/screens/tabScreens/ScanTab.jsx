/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState,NetPrinter} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Image,
} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {BarCode, AddGoods} from 'src/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alipay, WechatPay} from 'src/icons';
import { RNUSBPrinter } from 'react-native-usb-printer';

import { log } from 'react-native-reanimated';
// import {
//   USBPrinter,
//   BLEPrinter
// } from "react-native-thermal-receipt-printer";
// import { log } from 'react-native-reanimated';
// import { USBPrinter } from 'react-native-printer';
const ScanTab = ({navigation}) => {
  const handleQueryInfo = () => {
    navigation.navigate('ScanStack');
  };
  const handleQueryAdd = () => {
    navigation.navigate('ScanCreactProductSrack');
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
          'You will not be able to scan if you do not allow camera access',
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
  const [field7, setField7] = useState('');
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
    if (field1.length < 13) {
      Alert.alert('提示', '请检查条码是否正确', [{text: '确认'}], {
        cancelable: false,
      });
      return;
    }
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
        diff: field7,
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
              '商品保存失败，请检查商品是否重复或信息不正确',
              [{text: '确认'}],
              {cancelable: false},
            );
          }
        }),
      )
      .catch(err => {
        console.log('err', err);
        Alert.alert(
          '提示',
          '商品保存失败，请检查是否已经存在该商品',
          [{text: '确认'}],
          {cancelable: false},
        );
      });
  };
  const handleCode = text => {
    setField1(text);
  };
  const [modalVisible1, setModalVisible1] = useState(false);
  const [curPay, setCurPay] = useState();
  const handleAli = () => {
    setModalVisible1(true);
    Set;
    setCurPay(1);
  };
  const handleWechat = () => {
    setModalVisible1(true);
    setCurPay(2);
  };

  // const [printers, setPrinters] = useState([]);
  // const [currentPrinter, setCurrentPrinter] = useState();
  const go = () => {
    if(Platform.OS == 'android'){
      USBPrinter.init().then(()=> {
        //list printers
        USBPrinter.getDeviceList().then(setPrinters);
      })
    }
    BLEPrinter.init().then(()=> {
      console.log("!!", BLEPrinter.getDeviceList());
    });
    console.log("printers设备号",printers);
  }
  const connect = (printer) => USBPrinter.connectPrinter(printer.vendorID, printer.productId).then(() => setCurrentPrinter(printer))
  const printTest=()=>{
    USBPrinter.printText("<C>sample text</C>\n");
  }

  //USB打印机模块；
  const [printers, setPrinters] = useState([]);
  const [currentPrinter, setCurrentPrinter] = useState(null);
  // useEffect(() => {
  //   // 初始化打印机模块
  //   USBPrinter.init();

  //   // 获取打印机列表
  //   USBPrinter.getDeviceList().then((printersList) => {
  //     setPrinters(printersList);
      
  //     // 选择要使用的打印机（这里假设你已经知道目标打印机的vendorID和productID）
  //     const targetPrinter = printersList.find(
  //       (printer) => printer.vendorId === YOUR_VENDOR_ID && printer.productId === YOUR_PRODUCT_ID
  //     );
      
  //     if (targetPrinter) {
  //       setCurrentPrinter(targetPrinter);
  //       // 连接打印机
  //       USBPrinter.connectPrinter(targetPrinter.vendorId, targetPrinter.productId)
  //         .then((connectedPrinter) => {
  //           console.log('Printer connected:', connectedPrinter);
  //         })
  //         .catch((error) => {
  //           console.error('Failed to connect to printer:', error);
  //         });
  //     }
  //   });
  // }, []);

  // const printText = () => {
  //   if (currentPrinter) {
  //     USBPrinter.printText('Hello, Printer!').then(() => {
  //       console.log('Text printed successfully.');
  //     }).catch((error) => {
  //       console.error('Failed to print text:', error);
  //     });
  //   }
  // };
  const print=()=>{
    console.log(RNUSBPrinter);
  // const res=  SunmiPrinter.connect()
  // const res2=   SunmiPrinter.openPrinter(content, 0)
  // console.log("RES",res,res2);
  }
  return (
    <View style={styles.container}>
      {/* <View style={{marginBottom: 10}}>
        <TouchableOpacity
          style={{
            height: 100,
            width: 115,
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(135,135,135)',
            borderRadius: 5,
          }}
          onPress={() => setModalVisible(true)}>
          <AddGoods width="42%" height="42%" />
          <Text style={styles.buttonText}>手动录入</Text>
        </TouchableOpacity>
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.title}>新增商品</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入商品条码"
              value={field1}
              maxLength={13}
              keyboardType="number-pad"
              onChangeText={text => handleCode(text)}
            />
            {field1.length < 13 && (
              <Text style={{color: '#c33333cc', fontSize: 12, marginTop: -10}}>
                请输入至少13位商品条码
              </Text>
            )}
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
              keyboardType="number-pad"
              onChangeText={text => setField3(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="请输入商品进价"
              value={field4}
              keyboardType="number-pad"
              onChangeText={text => setField4(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="请输入库存金额"
              value={field5}
              keyboardType="number-pad"
              onChangeText={text => setField5(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="请输入批发价格"
              value={field7}
              keyboardType="number-pad"
              onChangeText={text => setField7(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="请输入市场价格"
              value={field6}
              keyboardType="number-pad"
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
        <TouchableOpacity
          style={{
            height: 100,
            width: 115,
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#5ba585',
            borderRadius: 5,
          }}
          onPress={handleQueryAdd}>
          <BarCode width="61%" height="61%" />
          <Text style={styles.buttonText}>扫码录入</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={{
            height: 100,
            width: 115,
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#c83c23',
            borderRadius: 5,
          }}
          onPress={handleQueryInfo}>
          <BarCode width="61%" height="61%" />
          <Text style={styles.buttonText}>扫码查询</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{...styles.button, backgroundColor: '#1296db'}}
        onPress={() => handleAli()}>
        <Alipay width="80%" height="80%" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{...styles.button, backgroundColor: '#06b106'}}
        onPress={() => handleWechat()}>
        <WechatPay width="100%" height="100%" />
      </TouchableOpacity>
    
      <Modal visible={modalVisible1} animationType="slide">
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
            style={styles.button1}
            onPress={() => setModalVisible1(false)}>
            <Text style={styles.buttonText1}>返回</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
        <TouchableOpacity
        style={{...styles.button, backgroundColor: '#06b106'}}
        onPress={() => print()}>
        <Text style={styles.buttonText}>PRINT</Text>
      </TouchableOpacity>
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
    height: 100,
    width: 115,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(80,80,80)',
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
    fontSize: 18,
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
  button1: {
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
  },
});
export default ScanTab;
