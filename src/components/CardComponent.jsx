import React from 'react';
import {View, TextInput, Button} from 'react-native';
const CardComponent = ({onChangeText1, onChangeText2, onPressButton}) => {
  return (
    <View>
      <TextInput placeholder="Text 1" onChangeText={onChangeText1} />
      <TextInput placeholder="Text 2" onChangeText={onChangeText2} />
      <Button title="Submit" onPress={onPressButton} />
    </View>
  );
};
export default CardComponent;
