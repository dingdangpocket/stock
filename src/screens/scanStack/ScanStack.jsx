/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Dimensions, Animated, Easing} from 'react-native';
import {
  useCameraDevices,
  Camera,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {scanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import * as REA from 'react-native-reanimated';
import {BarCode} from 'src/icons';
const ScanStack = ({navigation}) => {
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
  let MainWidth = Dimensions.get('window').width;

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
      </View>
    )
  );
};
export default ScanStack;
