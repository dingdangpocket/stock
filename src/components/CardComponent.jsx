/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TextInput, Button, Dimensions, Text} from 'react-native';
const CardComponent = ({data, onSave}) => {
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
  const [code, setCode] = useState(data.code);
  const [name, setName] = useState(data.name);
  const [stock, setStock] = useState(data.stock);
  const [total, setTotal] = useState(data.total);
  const [price, setPrice] = useState(data.price);
  const [salesPrice, setSalesPrice] = useState(data.salesPrice);
  const onHandleSave = () => {
    onSave({code, name, stock, total, price, salesPrice});
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
          onChangeText={setCode}
          value={String(code)}
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
          onChangeText={setName}
          value={String(name)}
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
          onChangeText={setStock}
          value={String(stock)}
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
          onChangeText={setTotal}
          value={String(total)}
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
          onChangeText={setPrice}
          value={String(price)}
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
          onChangeText={setSalesPrice}
          value={String(salesPrice)}
        />
      </View>
      <Button title="盘点更新" onPress={onHandleSave} />
    </View>
  );
};
export default CardComponent;
