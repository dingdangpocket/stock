/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
const MemoCard = ({
  item,
  onSave,
  onUp,
  onDown,
  onChangeState,
  onDel,
  cancelDisable,
}) => {
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
  const [cost, setCost] = useState(item.cost);
  const [sell, setSell] = useState(item.sell);
  const [diff, setDiff] = useState(item.diff);
  const [num, setNum] = useState(0);
  const [costState, setCostState] = useState(true);
  const onHandleSave = () => {
    const TOTAL = stock * cost;
    onSave({
      id: Number(id),
      code: Number(code),
      name: String(name),
      stock: Number(stock),
      total: Number(TOTAL),
      cost: Number(cost),
      sell: Number(sell),
      diff: Number(diff),
    });
    //传回父组件；
  };
  const onHandleDel = () => {
    Alert.alert('提示', '删除商品后需重新添加，确认删除？', [
      {
        text: '取消',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: '确认删除', onPress: () => onDel(id)},
    ]);
  };
  const onHandleUp = () => {
    setNum(num + 1);
    onUp({
      id: Number(id),
      code: Number(code),
      name: String(name),
      stock: Number(stock),
      cost: Number(cost),
      sell: Number(sell),
      diff: Number(diff),
      num: Number(num + 1),
      costState: costState,
    });
    //传回父组件；
  };
  const onHandleDown = () => {
    if (num <= 0) {
      return;
    }
    setNum(num - 1);
    onDown({
      id: Number(id),
      code: Number(code),
      name: String(name),
      stock: Number(stock),
      cost: Number(cost),
      sell: Number(sell),
      diff: Number(diff),
      num: Number(num - 1),
      costState: costState,
    });
    //传回父组件；
  };
  const onHandleCostState = () => {
    setCostState(!costState);
    onChangeState({
      id: Number(id),
      code: Number(code),
      name: String(name),
      stock: Number(stock),
      cost: Number(cost),
      sell: Number(sell),
      diff: Number(diff),
      num: Number(num),
      costState: !costState,
    });
    //传回父组件；
  };
  useEffect(() => {
    setNum(0);
  }, [item]);
  return (
    <View
      style={{
        marginTop: 10,
        backgroundColor: 'white',
        padding: 7,
        borderRadius: 4,
      }}>
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
          keyboardType="number-pad"
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
        <Text>商品进价:</Text>
        <TextInput
          style={INPUT}
          placeholder="商品进价"
          keyboardType="number-pad"
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
        <Text>批发调货:</Text>
        <TextInput
          style={INPUT}
          placeholder="批发调货"
          keyboardType="number-pad"
          onChangeText={setDiff}
          value={String(diff)}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text>终端零售:</Text>
        <TextInput
          style={INPUT}
          placeholder="终端零售"
          keyboardType="number-pad"
          onChangeText={setSell}
          value={String(sell)}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: 20,
          justifyContent: 'center',
          alignContent: 'center',
          marginBottom: 30,
        }}>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: costState ? 'green' : 'red',
          }}
          onPress={() => onHandleCostState()}>
          <Text style={styles.buttonText}>
            {costState ? '自有状态' : '调货状态'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={() => onHandleDown()}>
          <Text style={styles.buttonText}>▼</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => onHandleUp()}>
          <Text style={styles.buttonText}>▲</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer}>
        {cancelDisable ? null : (
          <TouchableOpacity style={styles.button} onPress={() => onHandleDel()}>
            <Text style={styles.buttonText}>删除</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={() => onHandleSave()}>
          <Text style={styles.buttonText}>盘点更新</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text style={{color: (sell - cost).toFixed(2) > 0 ? 'green' : 'red'}}>
          零售利润:{(sell - cost).toFixed(2)}
        </Text>
        <Text
          style={{
            color:
              (diff - cost).toFixed(2) > 0 && diff != null ? 'green' : 'red',
          }}>
          批发利润:
          {diff == '0' || diff == null || diff == ''
            ? '*'
            : (diff - cost).toFixed(2)}
        </Text>
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
export default MemoCard;
