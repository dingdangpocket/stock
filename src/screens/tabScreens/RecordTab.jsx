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
  KeyboardAvoidingView,
  Alert,
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
      },
    )
      .then(response =>
        response.json().then(res => {
          if (res.code == 200) {
            setData(res.data.content);
            setRefreshing(false);
          }
          console.log('搜索数据', res);
        }),
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
          if (res.code === 200) {
            setData(res.data.content);
            setRefreshing(false);
            return res;
          }
          console.log('列表数据', res);
        }),
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
    console.log('newData', newData);
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
        cost: newData.cost,
        sell: newData.sell,
        total: newData.total,
      }),
    })
      .then(response =>
        response.json().then(res => {
          if (res.code === 200) {
            fetchData();
          }
          console.log('修改结果', res);
        }),
      )
      .catch(err => {
        console.log(err);
      });
    console.log('commit数据', newData);
  };

  const handleDelCard = id => {
    fetch(`http://47.109.111.138:8888/product/remove/${id}`, {
      method: 'DELETE',
    })
      .then(response =>
        response.json().then(res => {
          if (res.code === 200) {
            Alert.alert('提示', '删除成功', [{text: '确认'}], {
              cancelable: false,
            });
            fetchData();
          }
          console.log('删除结果', res);
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
  const [btns, setBtns] = useState([
    {name: '全部', active: true},
    {name: '高库存', active: false},
    {name: '正常', active: false},
    {name: '低库存', active: false},
  ]);
  const [curBtn, setCurBtn] = useState('');
  const handleActive = name => {
    const reBtns = btns.map(item => {
      if (item.name === name) {
        const reItem = {
          name: item.name,
          active: true,
        };
        return reItem;
      } else {
        return {
          name: item.name,
          active: false,
        };
      }
    });
    setCurBtn(name);
    setBtns([...reBtns]);
  };
  const getData = () => {
    return new Promise((resolve, reject) => {
      fetch('http://47.109.111.138:8888/product/page?pageNum=1&pageSize=300', {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.code === 200) {
            resolve(data.data.content);
          }
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  };
  useEffect(() => {
    async function fetch() {
      if (curBtn === '全部') {
        fetchData();
        const res = await getData();
        setData([...res]);
      }
      if (curBtn === '高库存') {
        const res = await getData();
        const highStock = res.filter(item => item.stock > 8);
        setData([...highStock]);
      }
      if (curBtn === '正常') {
        const res = await getData();
        const normalStock = res.filter(
          item => item.stock > 3 && item.stock <= 8,
        );
        setData([...normalStock]);
      }
      if (curBtn === '低库存') {
        const res = await getData();
        const normalStock = res.filter(
          item => item.stock >= 0 && item.stock <= 3,
        );
        setData([...normalStock]);
      }
    }
    fetch();
  }, [curBtn]);
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
        <View style={styles.filterBar}>
          {btns.map(item => {
            return (
              <TouchableOpacity
                style={{
                  marginLeft: 10,
                  backgroundColor: item.active ? 'red' : 'gray',
                  borderRadius: 5,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
                onPress={() => handleActive(item.name)}
                key={item.name}>
                <Text style={styles.buttonText}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.list}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <CardComponent
                item={item}
                onSave={newData => handleSaveCard(newData)}
                onDel={id => handleDelCard(id)}
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
  filterBar: {
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
    backgroundColor: 'rgb(20,20,20)',
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
