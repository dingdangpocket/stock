import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BarcodeScannerComp from '../../components/BarcodeScannerComp';
const ScanStack = ({navigation}) => {
  return (
    <View style={styles.container}>
      <BarcodeScannerComp />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  barcodeText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default ScanStack;

// const BarcodeScanner = () => {
//   const [barcodeData, setBarcodeData] = useState('');
//   const handleBarcodeScan = ({ nativeEvent }) => {
//     setBarcodeData(nativeEvent.codeStringValue);
//   };
//   return (
//     <View style={styles.container}>
//       <CameraScreen
//         style={styles.camera}
//         onReadCode={handleBarcodeScan}
//       >
//         <BarcodeMask />
//       </CameraScreen>
//       <Text style={styles.barcodeText}>{barcodeData}</Text>
//     </View>
//   );
// };
// 添加样式：
