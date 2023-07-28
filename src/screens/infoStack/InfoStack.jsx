import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  showToast,
} from 'react-native';
const InfoStack = ({route, navigation}) => {
  console.log(route.params);
  const [data, setData] = useState();
  const [barcodes, setBarcodes] = useState(route.params.barcodes);
  useEffect(() => {
    fetch(
      `http://47.109.111.138:8888/product/page?keywords=${barcodes}&pageNum=1&pageSize=300`,
      {
        method: 'GET',
      },
    )
      .then(response =>
        response.json().then(res => {
          if (res.code == 200) {
            setData(res.data.content);
          }
          console.log('搜索数据', res);
        }),
      )
      .catch(err => {
        console.log(err);
      });
  }, [barcodes]);
  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>
        Info:{barcodes}
        {JSON.stringify(data)}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 100,
    width: 160,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
    backgroundColor: 'black',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
export default InfoStack;
