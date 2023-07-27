import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {RNHoleView} from 'react-native-hole-view';
const BarcodeScannerComp = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const [frameProcessor, barcodes] = useScanBarcodes([
    BarcodeFormat.ALL_FORMATS, // You can only specify a particular format
  ]);

  const [barcode, setBarcode] = React.useState('');
  const [hasPermission, setHasPermission] = React.useState(false);
  const [isScanned, setIsScanned] = React.useState(false);

  React.useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    const status = await Camera.getCameraPermissionStatus();
    setHasPermission(status === 'authorized');
  };

  React.useEffect(() => {
    toggleActiveState();
    return () => {
      barcodes;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcodes]);
  const toggleActiveState = async () => {
    if (barcodes && barcodes.length > 0 && isScanned === false) {
      setIsScanned(true);
      // setBarcode('');
      barcodes.forEach(async scannedBarcode => {
        if (scannedBarcode.rawValue !== '') {
          setBarcode(scannedBarcode.rawValue);
          Alert.alert(barcode);
        }
      });
    }
  };
  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={!isScanned}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
          audio={false}
        />
        <RNHoleView
          holes={[
            {
              x: 100,
              y: 100,
              width: 300,
              height: 300,
              borderRadius: 10,
            },
          ]}
          style={styles.rnholeView}
        />
      </>
    )
  );
};
const styles = StyleSheet.create({
  rnholeView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
