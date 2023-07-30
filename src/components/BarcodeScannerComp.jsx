/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  useCameraDevices,
  Camera,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {scanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import * as REA from 'react-native-reanimated';
const BarcodeScannerComp = ({navigation}) => {
  const [hasPermission, setHasPermission] = React.useState(false);
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
      navigation.navigate('InfoStack', {barcodes: barcodes[0]?.rawValue});
    }
  }, [barcodes]);
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
export default BarcodeScannerComp;
