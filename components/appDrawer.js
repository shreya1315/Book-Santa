import { StyleSheet, Text, View,TouchableOpacity ,TextInput,Image} from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import Menu  from './barMenu';
import {createDrawerNavigator} from 'react-navigation-drawer'
import TabNavigator from './TabNavigator';
import settings  from './settings';
import MyDonationScreen from '../screens/MyDonationScreen';
import NotificationScreen from '../screens/NotificationScreen';

export const SideDrawer=createDrawerNavigator({
    Home:{
        screen:TabNavigator
    },
    MyDonations:{
        screen:MyDonationScreen
    },
    MyNotifications:{
       screen:NotificationScreen 
    },
    Settings:{
        screen:settings
    }
    },    
    {
        contentComponent:Menu
    },

    {
        initialRouteName:'Home'
    }

)

