import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

const BarcodeScannerComp = () => {
  const [torchMode, setTorchMode] = useState('off');
  const [cameraType, setCameraType] = useState('back');
  const barcodeReceived = e => {
    console.log('Barcode: ' + e.data);
    console.log('Type: ' + e.type);
  };
  return <View style={styles.container} />;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -100}, {translateY: -50}],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  overlayText: {
    color: '#fff',
    fontSize: 16,
  },
});
export default BarcodeScannerComp;

// import React, {AppRegistry, Component} from 'react-native';
// import BarcodeScanner from 'react-native-scan-barcode';

// class ScanBarcodeApp extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       torchMode: 'off',
//       cameraType: 'back',
//     };
//   }

//   barcodeReceived(e) {
//     console.log('Barcode: ' + e.data);
//     console.log('Type: ' + e.type);
//   }

//   render() {
//     return (
//       <BarcodeScanner
//         onBarCodeRead={this.barcodeReceived}
//         style={{flex: 1}}
//         torchMode={this.state.torchMode}
//         cameraType={this.state.cameraType}
//       />
//     );
//   }
// }

// AppRegistry.registerComponent('ScanBarcodeApp', () => ScanBarcodeApp);
