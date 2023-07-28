// import React, {useState, useEffect} from 'react';
// import {
//   Camera,
//   useCameraDevices,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
// import {View, Text, StyleSheet} from 'react-native';
// const frameProcessor = async ({data}) => {
//   // 在这里处理图像数据
//   // 返回一个包含处理结果的对象
//   return {data};
// };
// // import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';

// const BarcodeScannerComp = () => {
//   const [devices] = useCameraDevices();
//   const [isProcessingFrames, setIsProcessingFrames] = useState(false);
//   useEffect(() => {
//     if (devices.length > 0) {
//       Camera.requestCameraPermission().then(granted => {
//         if (granted) {
//           setIsProcessingFrames(true);
//         }
//       });
//     }
//   }, [devices]);
//   useFrameProcessor(frameProcessor, {paused: !isProcessingFrames});
//   return (
//     <View style={{flex: 1}}>
//       {devices.length === 0 ? (
//         <Text>No camera devices found.</Text>
//       ) : (
//         <Camera
//           style={{flex: 1}}
//           device={devices[0]}
//           isActive={isProcessingFrames}
//         />
//       )}
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   barcodeTextURL: {
//     fontSize: 20,
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });
// export default BarcodeScannerComp;
import React, {useState} from 'react';
import {Alert, StyleSheet, Text} from 'react-native';
import {
  useCameraDevices,
  Camera,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {
  useScanBarcodes,
  scanBarcodes,
  BarcodeFormat,
} from 'vision-camera-code-scanner';
import * as REA from 'react-native-reanimated';
const BarcodeScannerComp = ({navigation}) => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const [barcodes, setBarcodes] = useState();

  // const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE]);
  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.ALL_FORMATS], {
      checkInverted: true,
    });
    REA.runOnJS(setBarcodes)(detectedBarcodes);
  }, []);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  React.useEffect(() => {
    console.log('barcodes', barcodes);

    if (barcodes && barcodes?.length !== 0 && barcodes[0]?.rawValue) {
      navigation.navigate('InfoStack', {barcodes: barcodes[0]?.rawValue});
      console.log();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default BarcodeScannerComp;
// import {StyleSheet, Text} from 'react-native';
// import {useCameraDevices} from 'react-native-vision-camera';
// import {Camera, useFrameProcessor} from 'react-native-vision-camera';
// import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
// const BarcodeScannerComp = () => {
//   const [hasPermission, setHasPermission] = React.useState(false);
//   const devices = useCameraDevices();
//   const device = devices.back;

//   // const [frameProcessor, barcodes] = useScanBarcodes([
//   //   BarcodeFormat.ALL_FORMATS, // You can only specify a particular format
//   // ]);

//   // const [frameProcessor, barcodes] = useScanBarcodes(
//   //   [BarcodeFormat.ALL_FORMATS],
//   //   {checkInverted: true}
//   // );

//   React.useEffect(() => {
//     (async () => {
//       const status = await Camera.requestCameraPermission();
//       setHasPermission(status === 'authorized');
//     })();
//   }, []);

//   const frameProcessor = useFrameProcessor(frame => {
//     'worklet';
//     const scannedFaces = scanFaces(frame);
//     runOnJS(setFaces)(scannedFaces);
//   }, []);

//   return (
//     device != null &&
//     hasPermission && (
//       <>
//         <Camera
//           style={StyleSheet.absoluteFill}
//           device={device}
//           isActive={true}
//           frameProcessor={frameProcessor}
//           frameProcessorFps={5}
//         />
//         {/* {barcodes.map((barcode, idx) => (
//           <Text key={idx} style={styles.barcodeTextURL}>
//             {barcode.displayValue}
//           </Text>
//         ))} */}
//       </>
//     )
//   );
// };

// const styles = StyleSheet.create({
//   barcodeTextURL: {
//     fontSize: 20,
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });
// export default BarcodeScannerComp;

// import React, {useEffect, useState, useRef} from 'react';
// import {
//   View,
//   StyleSheet,
//   Button,
//   TouchableOpacity,
//   Text,
//   Linking,
//   Image,
// } from 'react-native';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';
// function BarcodeScannerComp() {
//   const camera = useRef(null);
//   const devices = useCameraDevices();
//   const device = devices.back;
//   const [showCamera, setShowCamera] = useState(false);
//   const [imageSource, setImageSource] = useState('');

//   useEffect(() => {
//     async function getPermission() {
//       const newCameraPermission = await Camera.requestCameraPermission();
//       console.log(newCameraPermission);
//     }
//     getPermission();
//   }, []);

//   const capturePhoto = async () => {
//     if (camera.current !== null) {
//       const photo = await camera.current.takePhoto({});
//       setImageSource(photo.path);
//       setShowCamera(false);
//       console.log(photo.path);
//     }
//   };

//   if (device == null) {
//     return <Text>Camera not available</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       {showCamera ? (
//         <>
//           <Camera
//             ref={camera}
//             style={StyleSheet.absoluteFill}
//             device={device}
//             isActive={showCamera}
//             photo={true}
//           />

//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={styles.camButton}
//               onPress={() => capturePhoto()}
//             />
//           </View>
//         </>
//       ) : (
//         <>
//           {imageSource !== '' ? (
//             <Image
//               style={styles.image}
//               source={{
//                 uri: `file://'${imageSource}`,
//               }}
//             />
//           ) : null}

//           <View style={styles.backButton}>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: 'rgba(0,0,0,0.2)',
//                 padding: 10,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 borderRadius: 10,
//                 borderWidth: 2,
//                 borderColor: '#fff',
//                 width: 100,
//               }}
//               onPress={() => setShowCamera(true)}>
//               <Text style={{color: 'white', fontWeight: '500'}}>返回</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.buttonContainer}>
//             <View style={styles.buttons}>
//               <TouchableOpacity
//                 style={{
//                   backgroundColor: '#fff',
//                   padding: 10,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   borderRadius: 10,
//                   borderWidth: 2,
//                   borderColor: '#77c3ec',
//                 }}
//                 onPress={() => setShowCamera(true)}>
//                 <Text style={{color: '#77c3ec', fontWeight: '500'}}>重拍</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{
//                   backgroundColor: '#77c3ec',
//                   padding: 10,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   borderRadius: 10,
//                   borderWidth: 2,
//                   borderColor: 'white',
//                 }}
//                 onPress={() => setShowCamera(true)}>
//                 <Text style={{color: 'white', fontWeight: '500'}}>使用</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </>
//       )}
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: 'gray',
//   },
//   backButton: {
//     backgroundColor: 'rgba(0,0,0,0.0)',
//     position: 'absolute',
//     justifyContent: 'center',
//     width: '100%',
//     top: 0,
//     padding: 20,
//   },
//   buttonContainer: {
//     backgroundColor: 'rgba(0,0,0,0.2)',
//     position: 'absolute',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     bottom: 0,
//     padding: 20,
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   camButton: {
//     height: 80,
//     width: 80,
//     borderRadius: 40,
//     //ADD backgroundColor COLOR GREY
//     backgroundColor: '#B2BEB5',

//     alignSelf: 'center',
//     borderWidth: 4,
//     borderColor: 'white',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     aspectRatio: 9 / 16,
//   },
// });
// export default BarcodeScannerComp;
