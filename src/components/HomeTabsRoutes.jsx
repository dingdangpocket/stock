/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeTab from 'src/screens/tabScreens/HomeTab';
import CommunityTab from 'src/screens/tabScreens/CommunityTab';
import DiscoveryTab from 'src/screens/tabScreens/DiscoveryTab';
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
  activeHomeTab: <RecordIconActive width="75%" height="75%" />,
  unActiveHomeTab: <RecordIconUnActive width="75%" height="75%" />,
  activeCommunityTab: <ScanIconActive width="82%" height="82%" />,
  unActiveCommunityTab: <ScanIconUnActive width="75%" height="75%" />,
  activeDiscoveryTab: <DataIconActive width="82%" height="82%" />,
  unActiveDiscoveryTab: <DataIconUnActive width="82%" height="82%" />,
};
const HomeTabsRoutes = () => {
  const {state} = useContext(ContentContext);
  const HomeTabRoutesConfig = [
    {
      name: 'HomeTab',
      component: HomeTab,
      option: {title: '记录'},
      tabBarBadge: null,
    },
    {
      name: 'CommunityTab',
      component: CommunityTab,
      option: {title: '扫码'},
      tabBarBadge: state.communityTabBarBadge,
    },
    {
      name: 'DiscoveryTab',
      component: DiscoveryTab,
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
