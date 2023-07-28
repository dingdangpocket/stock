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
  const handleAdd = () => {};
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
          'You will not be able to scan if you do not allow camera access'
        );
      }
    }
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [field4, setField4] = useState('');
  const [field5, setField5] = useState('');
  const [field6, setField6] = useState('');
  const handleSave = () => {
    // 在这里处理保存逻辑，可以使用 field1、field2、field3、field4、field5 和 field6 的值
    console.log('保存数据:', field1, field2, field3, field4, field5, field6);
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View>
        <Button title="新建商品" onPress={() => setModalVisible(true)} />
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.title}>弹窗表单</Text>
            <TextInput
              style={styles.input}
              placeholder="字段1"
              value={field1}
              onChangeText={text => setField1(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="字段2"
              value={field2}
              onChangeText={text => setField2(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="字段3"
              value={field3}
              onChangeText={text => setField3(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="字段4"
              value={field4}
              onChangeText={text => setField4(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="字段5"
              value={field5}
              onChangeText={text => setField5(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="字段6"
              value={field6}
              onChangeText={text => setField6(text)}
            />
            <View style={styles.buttonContainer}>
              <Button title="取消" onPress={() => setModalVisible(false)} />
              <Button title="保存" onPress={handleSave} />
            </View>
          </View>
        </Modal>
      </View>
      <Button title="查詢商品" onPress={handleQueryInfo} />
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
