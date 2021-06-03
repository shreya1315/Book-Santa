import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import donate from '../screens/donate';
import RecieverDetails from '../screens/RecieverDetails'

export const AppStackNavigator =createStackNavigator({
    BookDonateList:{
        screen:donate,
        navigationOptions:{
            headerShown:true
        }
    },
    RecieverDetails:{
        screen:RecieverDetails,
        navigationOptions:{
            headerShown:true
        }
    },
},
{
initialRouteName:'BookDonateList'
}
)