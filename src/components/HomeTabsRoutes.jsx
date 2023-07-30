/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RecordTab from 'src/screens/tabScreens/RecordTab';
import ScanTab from 'src/screens/tabScreens/ScanTab';
import DataTab from 'src/screens/tabScreens/DataTab';
import {ContentContext} from 'src/context/ContextProvider';
import {TouchableOpacity} from 'react-native';
import {useContext} from 'react';
import {
  RecordIconActive,
  RecordIconUnActive,
  ScanIconActive,
  ScanIconUnActive,
  DataIconActive,
  DataIconUnActive,
} from 'src/icons';
const Tab = createBottomTabNavigator();
const IconSet = {
  activeRecordTab: <RecordIconActive width="75%" height="75%" />,
  unActiveRecordTab: <RecordIconUnActive width="75%" height="75%" />,
  activeScanTab: <ScanIconActive width="82%" height="82%" />,
  unActiveScanTab: <ScanIconUnActive width="75%" height="75%" />,
  activeDataTab: <DataIconActive width="78%" height="78%" />,
  unActiveDataTab: <DataIconUnActive width="82%" height="82%" />,
};
const HomeTabsRoutes = () => {
  const {state} = useContext(ContentContext);
  const HomeTabRoutesConfig = [
    {
      name: 'RecordTab',
      component: RecordTab,
      option: {title: '记录'},
      tabBarBadge: null,
    },
    {
      name: 'ScanTab',
      component: ScanTab,
      option: {title: '扫码'},
      tabBarBadge: null,
    },
    {
      name: 'DataTab',
      component: DataTab,
      option: {title: '统计'},
      tabBarBadge: null,
    },
  ];
  // const {dispatch} = useContext(ContentContext);
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      detachInactiveScreens={false}
      lazy={false}
      // sceneContainerStyle={{backgroundColor:"red"}}
      tabBarOptions={{
        activeTintColor: 'rgba(10,10,10,0.9)',
        inactiveTintColor: 'rgba(10,10,10,0.5)',
        labelStyle: {fontSize: 12},
        style: {height: 55},
        // activeBackgroundColor: "rgba(10,10,0,0.9)",
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          return focused
            ? IconSet['active' + route.name]
            : IconSet['unActive' + route.name];
        },
        tabBarButton: props => (
          <TouchableOpacity activeOpacity={0.85} {...props} />
        ),
      })}>
      {HomeTabRoutesConfig.map(item => {
        return (
          <Tab.Screen
            key={item.name}
            name={item.name}
            options={{
              title: item.option.title,
            }}
            component={item.component}
          />
        );
      })}
    </Tab.Navigator>
  );
};
export default HomeTabsRoutes;
