import * as React from 'react';
import { StyleSheet, Text, View,TouchableOpacity ,TextInput,Image,KeyboardAvoidingView,SafeAreaP} from 'react-native';
import db from '../config';
import firebase from 'firebase';

import { SafeAreaProvider} from 'react-native-safe-area-context';
import MyHeader from '../components/header'


export default class Request extends React.Component{

    constructor(){
        super();
        this.state={
            userId: firebase.auth().currentUser.email,
            bookName:"",
            reasonToRequest:"",
        }
    }
    createUniqueId=()=>{
        return Math.random().toString(36).substring(7);
    }

    addRequest=(bookName,reasonToRequest)=>{
        var userId=this.state.userId
        var randomRequestId=this.createUniqueId()
        db.collection('requestedbooks').add({
            "user_id":userId,
            "book_name":bookName,
            "reason_To_Request":reasonToRequest,
            "request_id":randomRequestId,
        })
        
        this.setState({
            bookName:"",
            reasonToRequest:""
        })
        
        return alert("Book requested Successfully ")
        }
    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader title="Request Book" navigation ={this.props.navigation}/>

                <SafeAreaProvider>
           
               <KeyboardAvoidingView >
                <TextInput
                style={styles.formTextInput}
                placeholder="enter book name"
                onChangeText={(text)=>this.setState({bookName:text})}  
                value={this.state.bookName}
                />

                <TextInput
                style={[styles.formTextInput,{height:100}]}
                multiline
                numberOfLines={8}
                placeholder="why do you need the book"
                onChangeText={(text)=>this.setState({reasonToRequest:text})}  
                value={this.state.reasonToRequest}
                />

                 <TouchableOpacity
                 style={styles.button}
                 onPress={()=>{this.addRequest(this.state.bookName,this.state.reasonToRequest)}}
                 
                 >
                <Text>Request</Text> 
                     
                </TouchableOpacity>                 

               </KeyboardAvoidingView>
             
</SafeAreaProvider>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:"center",
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
        width:'75%',
        height:50,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        backgroundColor:'#ff5722',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:8
        },
        shadowOpacity:0.44,
        shadowRadius:10.32,
        elevation:16,
        marginTop:20
    },
})