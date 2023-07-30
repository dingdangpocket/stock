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
  ScrollView,
} from 'react-native';
import CardComponent from '../../components/CardComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
const RecordTab = () => {
  const [data, setData] = useState([]);
  const [search, onChangeSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const getToken = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Data retrieved successfully: ', value);
        return value;
      } else {
        console.log('No data found');
      }
    } catch (error) {
      console.log('Error retrieving data: ', error);
    }
  };
  const handleQuery = () => {
    setCurBtn(1);
    btns.forEach(item => {
      item.id === 1 ? (item.active = true) : (item.active = false);
    });
    setRefreshing(true);
    fetch(
      `http://47.109.111.138:8888/product/page?keywords=${search}&pageNum=1&pageSize=300`,
      {
        method: 'GET',
        // headers: {satoken: getToken('satoken')},
      },
    )
      .then(response =>
        response.json().then(res => {
          if (res.code === 200) {
            console.log('T', res);
            setData(res.data.content);
            setRefreshing(false);
          }
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
      setCurBtn(1);
      btns.forEach(item => {
        item.id === 1 ? (item.active = true) : (item.active = false);
      });
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const fetchData = () => {
    setRefreshing(true);
    fetch('http://47.109.111.138:8888/product/page?pageNum=1&pageSize=300', {
      method: 'GET',
      // headers: {satoken: getToken('satoken')},
    })
      .then(response =>
        response.json().then(res => {
          if (res.code === 200) {
            setData(res.data.content);
            setRefreshing(false);
            return res;
          }
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
  const handleRefresh = () => {
    setRefreshing(true);
    generaicDateHandle();
  };

  const handleSaveCard = newData => {
    fetch('http://47.109.111.138:8888/product/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // satoken: getToken('satoken'),
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
            Alert.alert('提示', '盘点成功', [{text: '确认'}], {
              cancelable: false,
            });
            generaicDateHandle();
          }
        }),
      )
      // eslint-disable-next-line handle-callback-err
      .catch(err => {
        Alert.alert('提示', '盘点失败', [{text: '确认'}], {
          cancelable: false,
        });
      });
  };

  const handleDelCard = id => {
    fetch(`http://47.109.111.138:8888/product/remove/${id}`, {
      method: 'DELETE',
      // satoken: getToken('satoken'),
    })
      .then(response =>
        response.json().then(res => {
          if (res.code === 200) {
            Alert.alert('提示', '删除成功', [{text: '确认'}], {
              cancelable: false,
            });
            generaicDateHandle();
          }
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
  const [btns, setBtns] = useState([
    {id: 1, name: '全部', active: true},
    {id: 2, name: '高库存', active: false},
    {id: 3, name: '正常', active: false},
    {id: 4, name: '低库存', active: false},
    {id: 5, name: '利润降序', active: false},
    {id: 6, name: '利润升序', active: false},
  ]);
  const [curBtn, setCurBtn] = useState('');
  const handleActive = id => {
    setRefreshing(true);
    btns.forEach(item => {
      item.id === id ? (item.active = true) : (item.active = false);
    });
    setCurBtn(id);
    setBtns([...btns]);
  };
  const getData = () => {
    return new Promise((resolve, reject) => {
      fetch('http://47.109.111.138:8888/product/page?pageNum=1&pageSize=300', {
        method: 'GET',
        // satoken: getToken('satoken'),
      })
        .then(response => response.json())
        .then(data => {
          if (data.code === 200) {
            resolve(data.data.content);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  const sortDesc = source => {
    const len = source.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if (
          source[j].sell - source[j].cost <
          source[j + 1].sell - source[j + 1].cost
        ) {
          [source[j], source[j + 1]] = [source[j + 1], source[j]];
        }
      }
    }
    return source;
    //降
  };
  const sortAsc = source => {
    const len = source.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if (
          source[j].sell - source[j].cost >
          source[j + 1].sell - source[j + 1].cost
        ) {
          [source[j], source[j + 1]] = [source[j + 1], source[j]];
        }
      }
    }
    return source;
    //升
  };

  const generaicDateHandle = async () => {
    if (curBtn === 1) {
      fetchData();
      const res = await getData();
      setData([...res]);
    }
    if (curBtn === 2) {
      const res = await getData();
      const highStock = res.filter(item => item.stock > 8);
      setRefreshing(false);
      setData([...highStock]);
    }
    if (curBtn === 3) {
      const res = await getData();
      const normalStock = res.filter(item => item.stock > 3 && item.stock <= 8);
      setRefreshing(false);
      setData([...normalStock]);
    }
    if (curBtn === 4) {
      const res = await getData();
      const lowStock = res.filter(item => item.stock >= 0 && item.stock <= 3);
      setRefreshing(false);
      setData([...lowStock]);
    }
    if (curBtn === 5) {
      const res = await getData();
      const sortRes = sortDesc(res);
      setRefreshing(false);
      setData([...sortRes]);
    }
    if (curBtn === 6) {
      const res = await getData();
      const sortRes = sortAsc(res);
      setRefreshing(false);
      setData([...sortRes]);
    }
  };
  useEffect(() => {
    generaicDateHandle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {btns.map(item => {
              return (
                <TouchableOpacity
                  activeOpacity={0.2}
                  pressDuration={0.1}
                  style={{
                    marginLeft: 10,
                    backgroundColor: item.active ? 'rgb(60,60,60)' : 'gray',
                    borderRadius: 5,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                  }}
                  onPress={() => handleActive(item.id)}
                  key={item.name}>
                  <Text style={styles.buttonText}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
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
