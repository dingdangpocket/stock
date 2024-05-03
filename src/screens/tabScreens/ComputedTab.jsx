/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
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
import MemoCard from '../../components/MemoCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
const ComputedTab = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [freeze, setFreeze] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [source, setSource] = useState([]);
  const getToken = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // console.log('Data retrieved successfully: ', value);
        return value;
      } else {
        console.log('No data found');
      }
    } catch (error) {
      console.log('Error retrieving data: ', error);
    }
  };
  const handleQuery = async () => {
    setCurBtn(1);
    setFreeze(true);
    btns.forEach(item => {
      item.id === 1 ? (item.active = true) : (item.active = false);
    });
    setRefreshing(true);
    fetch(
      `http://47.109.111.138:8888/product/page?keywords=${text}&pageNum=1&pageSize=300`,
      {
        method: 'GET',
        headers: {satoken: await getToken('satoken')},
      },
    )
      .then(response =>
        response.json().then(res => {
          if (res.code === 200) {
            setData(res.data.content);
            setRefreshing(false);
            setFreeze(false);
          }
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!text) {
      setCurBtn(1);
      btns.forEach(item => {
        item.id === 1 ? (item.active = true) : (item.active = false);
      });
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const fetchData = async () => {
    setRefreshing(true);
    fetch('http://47.109.111.138:8888/product/page?pageNum=1&pageSize=350', {
      method: 'GET',
      headers: {satoken: await getToken('satoken')},
    })
      .then(response =>
        response.json().then(res => {
          // console.log('res', res);
          setRefreshing(false);
          setData(res.data.content);
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
  const handleRefresh = () => {
    setRefreshing(true);
    generaicDateHandle();
    setSource([]);
  };

  const handleSaveCard = async newData => {
    fetch('http://47.109.111.138:8888/product/edit', {
      method: 'PUT',
      headers: {
        satoken: await getToken('satoken'),
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
        diff: newData.diff,
      }),
    })
      .then(response =>
        response.json().then(res => {
          // console.log('res', res);
          if (res.code === 200) {
            Alert.alert('提示', '盘点成功', [{text: '确认'}], {
              cancelable: false,
            });
            generaicDateHandle();
          } else {
            Alert.alert('提示', '盘点失败', [{text: '确认'}], {
              cancelable: false,
            });
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

  const handleDelCard = async id => {
    fetch(`http://47.109.111.138:8888/product/remove/${id}`, {
      method: 'DELETE',
      headers: {satoken: await getToken('satoken')},
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
  const [curBtn, setCurBtn] = useState(1);
  const handleActive = id => {
    setRefreshing(true);
    btns.forEach(item => {
      item.id === id ? (item.active = true) : (item.active = false);
    });
    setCurBtn(id);
    setBtns([...btns]);
  };
  const getData = async () => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      fetch('http://47.109.111.138:8888/product/page?pageNum=1&pageSize=350', {
        method: 'GET',
        headers: {satoken: await getToken('satoken')},
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
      // fetchData();
      const res = await getData();
      setRefreshing(false);
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
    if (curBtn === 1 && freeze) {
      return;
    }
    generaicDateHandle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curBtn]);

  useFocusEffect(
    useCallback(() => {
      const asyncFetch = async () => {
        fetch(
          'http://47.109.111.138:8888/product/page?pageNum=1&pageSize=600',
          {
            method: 'GET',
            headers: {
              satoken: await getToken('satoken'),
              'Content-Type': 'application/json',
            },
          },
        )
          .then(response =>
            response.json().then(res => {
              if (res.code === 200) {
                setData([]);
                setData([...res.data.content]);
              }
            }),
          )
          .catch(err => {
            console.log(err);
          });
      };
      asyncFetch();
    }, []),
  );
  const commonFun = G => {
    // console.log(G);
    const findRes = source.findIndex(x => x.code === G.code);
    if (findRes === -1) {
      source.push(G);
    }
    if (findRes !== -1) {
      source.splice(findRes, 1, G);
    }
    setSource([...source]);
  };
  const handleUp = curItem => {
    commonFun(curItem);
  };
  const handleDown = curItem => {
    commonFun(curItem);
  };
  const handleChangeState = curItem => {
    commonFun(curItem);
  };
  const costFun = () => {
    let k = 0;
    source.forEach(item => {
      if (item.costState === true) {
        k = k + item.cost * item.num;
      } else {
        k = k + item.diff * item.num;
      }
    });
    return k;
  };
  const saleFun = () => {
    return source.reduce((c, n) => {
      return c + n.sell * n.num;
    }, 0);
  };
  const [hide, setHide] = useState(false);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="输入名称或条码"
            value={String(text)}
            onChangeText={value => {
              setText(value);
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
        <TouchableOpacity
          activeOpacity={0.2}
          pressDuration={0.1}
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginLeft: 8,
            marginBottom: 4,
          }}
          onPress={() => setHide(!hide)}>
          {hide ? (
            <Text style={{fontSize: 20, color: 'rgb(150,150,150)'}}> ◐◐◐</Text>
          ) : (
            <Text style={{fontSize: 20, color: 'rgb(150,150,150)'}}> ◑◑◑</Text>
          )}
        </TouchableOpacity>
        <View style={{backgroundColor: 'rgb(230,230,230)', padding: 3}}>
          {source.map((item, idx) => {
            return (
              <View
                key={item.code}
                style={{
                  backgroundColor: 'rgb(240,240,240)',
                  padding: 3,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 1.5,
                  borderRadius: 3,
                }}>
                <Text>
                  {idx + 1}、{item.name} ▏价格:{item.sell}数量：
                  {item.num} ▏{item.num * item.sell}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.filterBar}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: 'red',
                borderRadius: 9,
                marginRight: 2,
              }}
            />
            <Text
              style={{
                color: 'rgb(100,100,100)',
              }}>
              总价：{saleFun().toFixed(2)}
            </Text>
          </View>
          {hide ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: '#FF7A22',
                  borderRadius: 9,
                  marginRight: 2,
                }}
              />
              <Text
                style={{
                  color: 'rgb(100,100,100)',
                }}>
                成本：{costFun().toFixed(2)}
              </Text>
            </View>
          ) : (
            ''
          )}
          {hide ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: 'green',
                  borderRadius: 9,
                  marginRight: 2,
                }}
              />
              <Text
                style={{
                  color: 'rgb(100,100,100)',
                }}>
                利润：{(saleFun() - costFun()).toFixed(2)}
              </Text>
            </View>
          ) : (
            ''
          )}
        </View>

        <View style={styles.list}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <MemoCard
                item={item}
                onUp={record => {
                  handleUp(record);
                }}
                onDown={record => {
                  handleDown(record);
                }}
                onChangeState={record => {
                  handleChangeState(record);
                }}
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
export default ComputedTab;
let MainWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(220,220,220)',
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
    paddingHorizontal: 15,
    paddingVertical: 8,
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
