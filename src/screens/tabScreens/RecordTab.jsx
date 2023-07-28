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
  KeyboardAvoidingView,
} from 'react-native';
import CardComponent from '../../components/CardComponent';

const RecordTab = () => {
  const [data, setData] = useState([]);
  const [search, onChangeSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const handleQuery = () => {
    console.log(search); // 在控制台输出文本框的值
    setRefreshing(true);
    fetch(
      `http://47.109.111.138:8888/product/page?keywords=${search}&pageNum=1&pageSize=300`,
      {
        method: 'GET',
      }
    )
      .then(response =>
        response.json().then(res => {
          if (res.code == 200) {
            setData(res.data.content);
            setRefreshing(false);
          }
          console.log('搜索数据', res);
        })
      )
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (!search) {
      fetchData();
    }
  }, [search]);

  const fetchData = () => {
    setRefreshing(true);
    fetch('http://47.109.111.138:8888/product/page?pageNum=1&pageSize=300', {
      method: 'GET',
    })
      .then(response =>
        response.json().then(res => {
          if (res.code == 200) {
            setData(res.data.content);
            setRefreshing(false);
          }
          console.log('列表数据', res);
        })
      )
      .catch(err => {
        console.log(err);
      });
  };
  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleSaveCard = newData => {
    setData(preData =>
      preData.map(preItem =>
        preItem.id === newData.id ? {...preItem, newData} : preItem,
      ),
    );
    fetch('http://47.109.111.138:8888/product/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: newData.id,
        code: newData.code,
        name: newData.name,
        stock: newData.stock,
        cost: newData.price,
        sell: newData.salesPrice,
        total: newData.total,
      }),
    })
      .then(response =>
        response.json().then(res => {
          if (res.code === 200) {
            fetchData();
          }
          console.log('修改结果', res);
        })
      )
      .catch(err => {
        console.log(err);
      });
    console.log('commit数据', newData);
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="输入名称或条码"
            value={search}
            onChangeText={value => {
              onChangeSearch(value);
            }}
          />
          <TouchableOpacity style={styles.button} onPress={handleQuery}>
            <Text style={styles.buttonText}>查询</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <CardComponent
                item={item}
                onSave={newData => handleSaveCard(newData)}
              />
            )}
            keyExtractor={item => item.id.toString()}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default RecordTab;
let MainWidth = Dimensions.get('window').width;
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
    backgroundColor: 'rgb(235,235,235)',
    padding: 10,
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
