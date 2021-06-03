import { StyleSheet, Text, View,TouchableOpacity, TextInput ,Alert,Image,ScrollView} from 'react-native';
import React ,{Component} from 'react';
import Introanimation from '../components/intro'
import Signup from './signUp'
import donate from './donate';
export default class Home extends React.Component{

   
  constructor()
    {
      super();    
    }
    render()
    {
    return
    (
    <View>
    <Text style={styles.text}>Welcome To the world of Books!</Text>
    <TouchableOpacity
    onPress={()=>{this.props.navigation.navigate('TabNavigator',{screen:donate})}}
    style={{width:30,backgroundColor:"green",marginTop:80}}>
    <Text>Hi</Text></TouchableOpacity>
    </View>
    )
    }
}

    const styles=StyleSheet.create({
    text:{
        textAlign:"center",
        marginTop:-80,
        fontWeight:"bold",
       fontSize:20
    },
    explain:{
        width:350,
        height:350,
        marginLeft:90
    }
})