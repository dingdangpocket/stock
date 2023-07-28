import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  showToast,
} from 'react-native';
const InfoStack = ({route, navigation}) => {
  console.log(route.params);
  const [barcodes, setBarcodes] = useState(route.params.barcodes);
  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>Info:{barcodes}</Text>
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
});
export default InfoStack;