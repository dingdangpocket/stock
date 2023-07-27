/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TextInput, Button, Dimensions, Text} from 'react-native';
const CardComponent = ({
  onChangeText1,
  onChangeText2,
  onChangeText3,
  onChangeText4,
  onChangeText5,
  onChangeText6,
  item,
  onPressButton,
}) => {
  let MainWidth = Dimensions.get('window').width;
  let MainHeight = Dimensions.get('window').height;
  const INPUT = {
    width: MainWidth * 0.65,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 3.5,
  };
  return (
    <View style={{marginTop: 10, backgroundColor: 'white', padding: 7}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text>商品条码:</Text>
        <TextInput
          style={INPUT}
          placeholder="商品条码"
          onChangeText={onChangeText1}
          value={item.code.toString()}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text>商品名称:</Text>
        <TextInput
          style={INPUT}
          placeholder="商品名称"
          onChangeText={onChangeText2}
          value={item.name.toString()}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text>商品库存:</Text>
        <TextInput
          style={INPUT}
          placeholder="商品库存"
          onChangeText={onChangeText4}
          value={item.stock.toString()}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text>库存金额:</Text>
        <TextInput
          style={INPUT}
          placeholder="库存金额"
          onChangeText={onChangeText5}
          value={item.total.toString()}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text>商品进价:</Text>
        <TextInput
          style={INPUT}
          placeholder="商品进价"
          onChangeText={onChangeText3}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text>市场价格:</Text>
        <TextInput
          style={INPUT}
          placeholder="市场价格"
          onChangeText={onChangeText6}
        />
      </View>
      <Button title="盘点更新" onPress={onPressButton} />
    </View>
  );
};
export default CardComponent;
