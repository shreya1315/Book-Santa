import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import firebase from 'firebase';
import db from '../config';
import { Icon, ListItem } from "react-native-elements";
import MyHeader from '../components/header'



export default class Notification extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            allNotifications:[]
        }
        this.notificationRef=null
    }
    getNotification=()=>{
        this.requestRef=db.collection('all_notification')
        .where('notifaction_status','==',"unread")
        .where("donor_id","==",this.state.userId)
        .onSnapshot((snapshot)=>{
            var allNotifications=[];
            snapshot.docs.map((doc)=>{
                var notification=doc.data();
                notification["doc_id"]=doc.id;
                allNotifications.push(notification)
            
            })
            this.setState({
                allNotifications:allNotifications
            })
        })
    }
    componentDidMount(){
        this.getNotification();

    }
    componentWillUnmount(){
        this.notificationRef()
    }
    keyExtractor=(item,index) => index.toString()

    renderItem=({item,index})=>{
        return(
            <ListItem
            key={index}
            leftElement={<Icon name ="book" type="font-awesome"  color="#696969" />}
            title={item.book_name}
            titleStyle={{color:"black", fontWeight:"bold"}}
            subtitle={item.message}
            bottomDivider
            />
        )
    }
    render(){
        return(
            <View>
             <View style={{flex:0.1}}>
             <MyHeader title={"Notifications"} navigation={this.props.navigation}/>


             </View>
            </View>
        )
    }
}