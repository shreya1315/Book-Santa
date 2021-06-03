import React from 'react';
import { Image} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import donate from '../screens/donate';
import { AppStackNavigator } from './AppStackNavigator'

import request from '../screens/request';

const TabNavigator = createBottomTabNavigator({
  home:{
    screen: AppStackNavigator,
    navigationOptions:{
      tabBarIcon:<Image source={{
      uri:'https://img.icons8.com/clouds/2x/home-page.png'}}
       style={{ width: 65, height: 65 }}/>,
       tabBarLabel:"Donate Books"
    }
  },
  requestItems:{
    screen:request,
    navigationOptions:{
      tabBarIcon:<Image source={{uri:'https://simg.nicepng.com/png/small/835-8358734_feather-pen-paper-feather-pen-and-paper-icon.png',}}
      style={{ width: 40, height: 40 }}/>,
      tabBarLabel:"Request Item"
    }
  }
})
export default TabNavigator;