/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useContext, useEffect} from 'react';
import {View} from 'react-native';
import {ContentContext} from './src/context/ContextProvider';
import RoutesNav from './src/components/RoutesNav';
const App = () => {
  const {state, dispatch} = useContext(ContentContext);
  return (
    <View style={{flex: 1}}>
      <RoutesNav />
    </View>
  );
};
export default App;
