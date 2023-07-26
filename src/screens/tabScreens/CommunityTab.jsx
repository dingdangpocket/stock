import React, {useState, useRef} from 'react';
import {View, StyleSheet, Animated, Text, LogBox, Alert} from 'react-native';
const CommunityTab = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>扫码</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: 60,
    width: 95,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#972F97',
    backgroundColor: 'black',
  },
});
export default CommunityTab;
