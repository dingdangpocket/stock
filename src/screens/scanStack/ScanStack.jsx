import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, showToast} from 'react-native';
import {
  useCameraDevices,
  Camera,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {scanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import * as REA from 'react-native-reanimated';
import BarcodeScannerComp from '../../components/BarcodeScannerComp';
const ScanStack = ({navigation}) => {
  useEffect(() => {
    console.log('99');
  }, []);
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
  useEffect(() => {
    if (barcodes && barcodes?.length !== 0 && barcodes[0]?.rawValue) {
      navigation.replace('InfoStack', {barcodes: barcodes[0]?.rawValue});
      return;
    }
  }, [barcodes, navigation]);
  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
      </>
    )
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
