/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';
const CardComponent = ({item, onSave, onDel}) => {
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
  const [setTotal] = useState(item.total);
  const [cost, setCost] = useState(item.cost);
  const [sell, setSell] = useState(item.sell);
  // console.log('render', item);
  const onHandleSave = () => {
    const TOTAL = stock * cost;
    onSave({
      id,
      code: Number(code),
      name: String(name),
      stock: Number(stock),
      total: Number(TOTAL),
      cost: Number(cost),
      sell: Number(sell),
    });
    //传回父组件；
  };
  const onHandleDel = () => {
    onDel(id);
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
          value={String(stock * cost)}
          editable={false}
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
          onChangeText={setCost}
          value={String(cost)}
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
          onChangeText={setSell}
          value={String(sell)}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={() => onHandleDel()}>
          <Text style={styles.buttonText}>删除</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 40,
    width: MainWidth * 0.42,
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
