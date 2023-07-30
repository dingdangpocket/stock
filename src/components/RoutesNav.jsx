import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {containStackRoutes} from 'src/router/index';
import HomeTabRoutes from 'src/components/HomeTabsRoutes';
const Stack = createStackNavigator();
const RoutesNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabRoutes}
          options={{header: () => null, title: '首页'}}
        />
        {containStackRoutes.map(item => {
          return (
            <Stack.Screen
              key={item.name}
              name={item.name}
              component={item.component}
              options={{
                headerStyle: {backgroundColor: item.option.backgroundColor},
                title: item.option.title,
                headerTintColor: item.option.color,
              }}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RoutesNav;
