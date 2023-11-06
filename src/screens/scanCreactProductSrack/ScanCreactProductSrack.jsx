/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ToastAndroid,
} from 'react-native';

import {
  useCameraDevices,
  Camera,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {scanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import * as REA from 'react-native-reanimated';
import {BarCode} from 'src/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScanCreactProductSrack = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [field4, setField4] = useState('');
  const [field5, setField5] = useState('');
  const [field6, setField6] = useState('');
  const [field7, setField7] = useState('');
  const [supplier, setSupplier] = useState('');
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const [barcodes, setBarcodes] = useState();
  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.ALL_FORMATS], {
      checkInverted: true,
    });
    REA.runOnJS(setBarcodes)(detectedBarcodes);
  }, []);
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);
  //https://www.mxnzp.com/api/barcode/goods/details?barcode=6902538005141&app_id=rgihdrm0kslojqvm&app_secret=WnhrK251TWlUUThqaVFWbG5OeGQwdz09
  useEffect(() => {
    if (!modalVisible) {
      setField1('');
      setField2('');
      setField3('');
      setField4('');
      setField5('');
      setField6('');
      setField7('');
    }
  }, [modalVisible]);
  useEffect(() => {
    if (modalVisible) {
      return;
    }
    if (barcodes && barcodes?.length !== 0 && barcodes[0]?.rawValue) {
      console.log('barcode', barcodes[0]?.rawValue);
      const barcode = barcodes[0]?.rawValue;
      fetch(
        `https://www.mxnzp.com/api/barcode/goods/details?barcode=${barcode}&app_id=rgihdrm0kslojqvm&app_secret=WnhrK251TWlUUThqaVFWbG5OeGQwdz09`,
        {
          method: 'POST',
        }
      )
        .then(response =>
          response.json().then(res => {
            if (res.code === 1) {
              console.log('Red', res);
              setField1(res.data.barcode);
              setField2(res.data.goodsName);
              setField6(res.data.price);
              setSupplier(res.data.supplier);
            } else {
              console.log('Red', res);
              // Alert.alert('提示', '信息查询失败', [{text: '确认'}], {
              //   cancelable: false,
              // });
              // navigation.navigate('ScanTab');
            }
          }),
        )
        .catch(err => {
          console.log('err', err);
          // Alert.alert('提示', '信息查询失败', [{text: '确认'}], {
          //   cancelable: false,
          // });
          // navigation.navigate('ScanTab');
        });
      setField1(barcodes[0]?.rawValue);
      setModalVisible(true);
      // navigation.replace('InfoStack', {barcodes: barcodes[0]?.rawValue});
      return;
    }
  }, [barcodes, navigation, modalVisible]);
  const MainWidth = Dimensions.get('window').width;
  const scanAnimation = useRef(new Animated.Value(0.1)).current;
  const screenWidth = Dimensions.get('window').width;
  useEffect(() => {
    const scanRight = Animated.timing(scanAnimation, {
      toValue: 0.9,
      duration: 1200,
      useNativeDriver: true,
    });
    const scanLeft = Animated.timing(scanAnimation, {
      toValue: 0.1,
      duration: 1200,
      useNativeDriver: true,
    });
    const startAnimation = () => {
      Animated.sequence([scanRight, scanLeft]).start(startAnimation);
    };
    startAnimation();
  }, [scanAnimation]);
  const scanTranslateX = scanAnimation.interpolate({
    inputRange: [0.1, 0.9],
    outputRange: [-screenWidth + 275, screenWidth - 275],
  });

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
            // console.log('Red', res);
            // Alert.alert('保存成功');
            setModalVisible(false);
            ToastAndroid.show('商品录入成功', ToastAndroid.SHORT);
            navigation.navigate('ScanTab');
          } else {
            // console.log('Red', res);
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
  const onCancel = () => {
    setModalVisible(false);
    navigation.navigate('ScanTab');
  };
  return (
    device != null &&
    hasPermission && (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            width: MainWidth,
            height: 200,
            backgroundColor: 'rgba(0,0,0,0.5)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 90,
              height: 90,
              marginTop: 880,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <BarCode width="50%" height="50%" />
          </View>
        </View>
        <View style={{flex: 1}}>
          <Animated.View
            style={{
              position: 'absolute',
              top: 200,
              left: 0,
              width: 2.5,
              height: 370,
              backgroundColor: 'rgba(200, 200, 200, 0.9)',
              transform: [{translateX: scanTranslateX}],
            }}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: MainWidth,
            height: 264,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        />
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.title}>扫码录入商品</Text>
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
            <Text style={styles.title}>{supplier}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => onCancel()}>
                <Text style={styles.buttonText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button2} onPress={handleSave}>
                <Text style={styles.buttonText}>保存</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    height: 100,
    width: 115,
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
export default ScanCreactProductSrack;
