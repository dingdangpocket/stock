/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  showToast,
  Button,
  Modal,
  TextInput,
} from 'react-native';
import {Camera} from 'react-native-vision-camera';
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
        showToast(
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
  const handleSave = () => {
    console.log('保存数据:', field1, field2, field3, field4, field5, field6);
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={{marginBottom: 10}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}>
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
              placeholder="请输入库存金额"
              value={field4}
              onChangeText={text => setField4(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="请输入商品进价"
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
    height: 80,
    width: 120,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5571DD',
    borderRadius: 10,
  },
  button2: {
    height: 60,
    width: 90,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5571DD',
    borderRadius: 10,
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
