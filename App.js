import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity ,TextInput,Image} from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';


import Signup from './screens/signUp';
import Home from './screens/home'
import donate from './screens/donate';
import request from './screens/request';
import {SideDrawer} from './components/appDrawer';
//import TabNavigator from './components/TabNavigator'

export default function App() {
  return (
   
    <AppContainer/>

  )
  
}
 const Navigator = createSwitchNavigator({

  Signup:{screen:Signup},
   Drawer:{screen:SideDrawer}
  

 })

 const AppContainer =  createAppContainer(Navigator);

