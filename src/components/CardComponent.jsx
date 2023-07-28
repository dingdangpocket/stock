/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';
const CardComponent = ({item, onSave}) => {
  let MainWidth = Dimensions.get('window').width;
  const INPUT = {
    width: MainWidth * 0.65,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 3.5,
  };
  const [id] = useState(item.id);
  const [code, setCode] = useState(item.code);
  const [name, setName] = useState(item.name);
  const [stock, setStock] = useState(item.stock);
  const [total, setTotal] = useState(item.total);
  const [price, setPrice] = useState(item.cost);
  const [salesPrice, setSalesPrice] = useState(item.sell);
  const onHandleSave = () => {
    onSave({id, code, name, stock, total, price, salesPrice});
    //传回父组件；
  };
  return (
    <View style={{marginTop: 10, backgroundColor: 'white', padding: 7}}>
      <View
        style={{
          flexDirection: 'row',
          height: 20,
          justifyContent: 'center',
          alignContent: 'center',
          marginBottom: 2,
        }}>
        <View
          style={{
            backgroundColor:
              stock >= 0 && stock <= 3
                ? '#FF7A22'
                : stock > 3 && stock <= 8
                ? 'green'
                : 'red',
            width: 12,
            height: 12,
            borderRadius: 6,
            marginTop: 3,
          }}
        />
        <Text>
          {stock >= 0 && stock <= 3
            ? '库存紧张'
            : stock > 3 && stock <= 8
            ? '库存正常'
            : '库存过高'}
        </Text>
      </View>

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
          value={String(stock * price)}
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
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={() => onHandleSave()}>
          <Text style={styles.buttonText}>盘点更新</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
let MainWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 40,
    width: MainWidth * 0.86,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(145,145,145)',
    borderRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});
export default CardComponent;
