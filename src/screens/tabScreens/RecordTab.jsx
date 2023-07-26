/* eslint-disable react-native/no-inline-styles */
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
const RecordTab = () => {
  const [data, setData] = useState([]);
  const [search, onChangeSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const handlePress = () => {
    console.log(text); // 在控制台输出文本框的值
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    setTimeout(() => {
      const newData = [
        {code: 1564687845, name: 'LISI'},
        {code: 1564687847, name: 'LISI'},
        {code: 1564687445, name: 'LISI'},
        {code: 1564681115, name: 'LISI'},
      ];
      setData(newData);
      setRefreshing(false);
    }, 2000);
  };
  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleUpdate = () => {};
  const handleDelete = () => {};

  const [record, onChangeRecord] = useState();
  const cardItem = ({item}) => (
    <View style={styles.cardItem}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 0,
          paddingVertical: 3,
          backgroundColor: '#f5f5f5',
        }}>
        <Text>条码:</Text>
        <TextInput
          style={{
            width: MainWidth * 0.3,
            height: 40,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            backgroundColor: '#fff',
          }}
          placeholder="条码"
          value={String(item.code)} // 将text作为文本框的值
          autoFocus={true}
        />
        <Text>名称:</Text>
        <TextInput
          style={{
            width: MainWidth * 0.35,
            height: 40,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            backgroundColor: '#fff',
          }}
          placeholder="名称"
          value={String(item.name)} // 将text作为文本框的值
          autoFocus={true}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 0,
          paddingVertical: 3,
          backgroundColor: '#f5f5f5',
        }}>
        <Text>库存:</Text>
        <TextInput
          style={{
            width: MainWidth * 0.15,
            height: 40,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            backgroundColor: '#fff',
          }}
          placeholder="库存"
          value={String(item.code)} // 将text作为文本框的值
          autoFocus={true}
        />
        <TouchableOpacity
          style={{
            marginLeft: 10,
            backgroundColor: '#007aff',
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
          onPress={handleUpdate}>
          <Text
            style={{
              color: '#fff',
              fontSize: 12,
            }}>
            +
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginLeft: 10,
            backgroundColor: 'red',
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
          onPress={handleDelete}>
          <Text
            style={{
              color: '#fff',
              fontSize: 10,
            }}>
            -
          </Text>
        </TouchableOpacity>
        <Text>库存额:</Text>
        <TextInput
          style={{
            width: MainWidth * 0.25,
            height: 40,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            backgroundColor: '#fff',
          }}
          placeholder="库存额"
          value={String(item.name)} // 将text作为文本框的值
          autoFocus={true}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 0,
          paddingVertical: 3,
          backgroundColor: '#f5f5f5',
        }}>
        <Text>进价:</Text>
        <TextInput
          style={{
            width: MainWidth * 0.15,
            height: 40,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            backgroundColor: '#fff',
          }}
          placeholder="库存"
          value={String(item.code)} // 将text作为文本框的值
          autoFocus={true}
        />
        <Text>市场价:</Text>
        <TextInput
          style={{
            width: MainWidth * 0.15,
            height: 40,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            backgroundColor: '#fff',
            marginLeft: 3,
          }}
          placeholder="市场价"
          value={String(item.code)} // 将text作为文本框的值
          autoFocus={true}
        />
        <TouchableOpacity
          style={{
            marginLeft: 10,
            backgroundColor: '#007aff',
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
          onPress={handleUpdate}>
          <Text
            style={{
              color: '#fff',
              fontSize: 12,
            }}>
            更新
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginLeft: 10,
            backgroundColor: 'red',
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
          onPress={handleDelete}>
          <Text
            style={{
              color: '#fff',
              fontSize: 12,
            }}>
            删除
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="输入名称或条码"
          value={search} // 将text作为文本框的值
          autoFocus={true}
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
          renderItem={cardItem}
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
  // codeBlock: {
  //   backgroundColor: 'gray',
  //   borderBottomWidth: 1,
  //   borderColor: 'red',
  //   fontSize: 13,
  //   color: 'white',
  //   paddingRight: 10,
  // },
  // image: {
  //   width: 200,
  //   height: 200,
  // },
  // input: {
  //   width: MainWidth * 0.8,
  //   borderWidth: 2,
  //   height: 40,
  //   marginTop: 0,
  //   marginBottom: 0,
  //   marginLeft: MainWidth * 0.1,
  //   marginRight: MainWidth * 0.1,
  // },
  // TabViewItem: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
  // optionArea: {
  //   backgroundColor: 'green',
  //   flex: 1,
  //   flexDirection: 'row',
  //   flexWrap: 'nowrap',
  //   justifyContent: 'space-between',
  // },
  // optionAreaLeft: {
  //   backgroundColor: 'white',
  //   height: 60,
  //   width: MainWidth * 0.75,
  // },
  // btn: {
  //   height: 60,
  //   width: 95,
  //   margin: 10,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   fontSize: 15,
  //   borderBottomWidth: 2,
  //   borderBottomColor: '#972F97',
  //   backgroundColor: 'black',
  // },
  // optionBox: {
  //   height: 60,
  //   width: 95,
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   fontSize: 15,
  //   borderBottomWidth: 2,
  //   borderBottomColor: '#972F97',
  //   backgroundColor: 'black',
  // },
  // optionBoxUnActived: {
  //   height: 60,
  //   width: 95,
  //   backgroundColor: 'white',
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // textDefault: {
  //   color: 'white',
  //   fontSize: 15,
  // },
  // textUnActived: {
  //   color: 'gray',
  // },
  // focusListContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   justifyContent: 'center',
  // },
  // buttonRow: {
  //   flexDirection: 'row',
  //   marginVertical: 16,
  // },
});
