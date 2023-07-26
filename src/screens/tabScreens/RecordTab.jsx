/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Platform,
  TextInput,
  Button,
} from 'react-native';
const RecordTab = () => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    setTimeout(() => {
      const newData = [
        {id: 1, title: 'Card 1'},
        {id: 2, title: 'Card 2'},
        {id: 3, title: 'Card 3'},
      ];
      setData(newData);
      setRefreshing(false);
    }, 2000);
  };
  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };
  const [text, setText] = useState('');
  const handlePress = () => {
    console.log(text); // 在控制台输出文本框的值
  };
  const renderItem = ({item}) => (
    <View style={{padding: 16}}>
      <Text>{item.title}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="输入名称或条码"
          value={text} // 将text作为文本框的值
          autoFocus={true}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>按钮</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
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
    backgroundColor: 'green',
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
