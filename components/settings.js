import React, { Component } from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput ,Alert, ScrollView,KeyboardAvoidingView,Modal} from 'react-native';
import Head from './header';
import firebase from 'firebase';
import db from '../config';
import header from '../components/header'



export default class setttings extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:'',
            firstName:'',
            lastName:'',
            address:'',
            mobileNum:'',
            docId:'',
        }
    }
    getUserDetails=()=>{
        var email = firebase.auth().currentUser.email;
        db.collection('users').where('email_id','==',email).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
              console.log(doc.data().email_id)
          var data = doc.data()
            this.setState({
              emailId   : data.email_id,
              firstName : data.first_name,
              lastName  : data.last_name,
              address   : data.address,
              mobileNum   : data.mobile_num,
              docId     : doc.id
            })
          });
        })
      }

      updateUserDetails=()=>{
        db.collection('users').doc(this.state.docId)
        .update({
          "first_name": this.state.firstName,
          "last_name" : this.state.lastName,
          "address"   : this.state.address,
          "mobile_num"   : this.state.mobileNum,
        })
    
        alert("Profile Updated Successfully")
    
      }
    
    componentDidMount(){
     this.getUserDetails()
   
 }
    render(){
   
        return(
          <View style={styles.container} >
          <header title="Settings" navigation={this.props.navigation}/>
          <View style={styles.formContainer}>
              
              <TextInput
              style={styles.formTextInput}
              placeholder={"first_name"}
              maxLength={8}
              onChangeText={(text)=>{
                this.setState({
                  firstName: text
                })
              }}
              value={this.state.firstName}/>

            <TextInput
            style={styles.formTextInput}
            placeholder="last_name"
            maxLength={8}
            onChangeText={(text)=>
            {
            this.setState({
              lastName: text
            })
            }}
            value={this.state.lastName}
           />
            
            <TextInput
            style={styles.formTextInput}
            placeholder="email_address"
            keyboardType={'email-address'}
            value={this.state.emailId}
            />
            
            <TextInput
            style={styles.formTextInput}
            placeholder="mobile"
            maxLength={10}
            onChangeText={(text)=>{
            this.setState({
              mobileNum: text
            })
          }}
            value={this.state.mobileNum}
           />
            <TextInput
              style={styles.formTextInput}
              placeholder="address"
              onChangeText={(text)=>{
                this.setState({
                  address: text
                })
              }}
            value={this.state.address}
            />
             <TouchableOpacity style={styles.button}
              onPress={()=>{
                this.updateUserDetails()
              }}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            </View>
            </View>
        )
         
    }
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer:{
    flex:1,
    width:'100%',
    alignItems: 'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
  },
  buttonText:{
    fontSize:25,
    fontWeight:"bold",
    color:"#fff"
  }
})