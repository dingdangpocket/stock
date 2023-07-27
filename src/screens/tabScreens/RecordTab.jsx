/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CardComponent from '../../components/CardComponent';

const RecordTab = () => {
  const [data, setData] = useState([]);
  const [search, onChangeSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const handlePress = () => {
    console.log(); // 在控制台输出文本框的值
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    setTimeout(() => {
      const newData = [
        {
          code: 1564687845,
          name: '中华',
          stock: 48,
          sum: 5000,
          purchasePrice: 100,
          salesPrice: 120,
        },
        {
          code: 5564124845,
          name: '小重九',
          stock: 48,
          sum: 5000,
          purchasePrice: 100,
          salesPrice: 120,
        },
        {
          code: 1563387845,
          name: '和天下',
          stock: 48,
          sum: 5000,
          purchasePrice: 100,
          salesPrice: 120,
        },
        {
          code: 6964687815,
          name: '云烟',
          stock: 48,
          sum: 5000,
          purchasePrice: 100,
          salesPrice: 120,
        },
      ];
      setData(newData);
      setRefreshing(false);
    }, 2000);
  };
  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const handleButtonPress = () => {
    console.log('Text 1:', text1);
    console.log('Text 2:', text2);
  };
  const Items = () => {
    return (
      <CardComponent
        onChangeText1={setText1}
        onChangeText2={setText2}
        onPressButton={handleButtonPress}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="输入名称或条码"
          value={search} // 将text作为文本框的值
          onChangeText={value => {
            onChangeSearch(value);
          }}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>按钮</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <FlatList
          data={data}
          renderItem={Items}
          keyExtractor={item => item.code.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </View>
    </View>
  );
};
export default RecordTab;
let MainWidth = Dimensions.get('window').width;
let MainHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'gray',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  input: {
    width: MainWidth * 0.65,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    marginLeft: 10,
    backgroundColor: '#007aff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  list: {
    flex: 1,
    backgroundColor: 'rgb(200,200,200)',
  },
  cardItem: {
    backgroundColor: 'white',
    height: 145,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
  },
});
