import { StyleSheet, Text, View,TouchableOpacity ,TextInput,Image} from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import {DrawerItems} from 'react-navigation-drawer';
import React from 'react';
import firebase from 'firebase';
import {FaSignOutAlt} from 'react-icons/fa'
export default class Menu extends React.Component{
    
    render(){
        return(
            <View>
             <DrawerItems {...this.props}/>
               <TouchableOpacity
               
               style={styles.button}
               onPress={()=>{
                this.props.navigation.navigate('Signup')
                firebase.auth().signOut()
               }
                 

               
               }
               
               ><Text>LogOut</Text></TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    button:{
        backgroundColor:'#11bbcc',
        
    }
})