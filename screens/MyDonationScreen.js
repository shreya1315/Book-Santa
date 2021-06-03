import React from "react";
import { View, Text, TouchableOpacity, StyleSheet,FlatList,ScrollView } from "react-native";
import {ListItem,Icon} from 'react-native-elements'
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/header'


export default class myDonations extends React.Component{
   
   
    constructor(){
        super();
      this.state={
          userId:firebase.auth().currentUser.email,
          donorName:"",
          allDonations:[],
          
      }
      this.requestRef=null
    }

    static navigationOptions={
        drawerIcon:()=>(
            <Icon name="user" type="font-awesome" color="#000000" alignSelf="flex-start"  />
        )
      }
   

    getDonorDetails=(donorId)=>{
        db.collection("users").where("email_id","==", donorId).get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            this.setState({
              "donorName" : doc.data().first_name + " " + doc.data().last_name
            })
          });
        })
      }

    sendNotification=(bookDetails,requestStatus)=>{
        var requestid=bookDetails.request_id;
        var donorid=bookDetails.donor_id;
            db.collection('all_notification')
            .where('request_id','==',requestid) 
            .where("donor_id",'==',donorid)
            .get()
            .then( snapshot =>{
                snapshot.forEach((doc)=>{
                        var message=""
                        if(requestStatus==="Book Sent"){
                            message= this.state.donorName + "Sent you the Book"
                        }
                        else{
                            message=this.state.donorName+ "Has shown interest in sending in the book"
                        }
                        db.collection("all_notification").doc(doc.id).update({
                            "message":message,
                            "notifaction_status":"unread",
                            "date":firebase.firestore.FieldValue.serverTimestamp()

                        })
                })
                
            })  
          }
    
        
        sendBook=(bookDetails)=>{
        if(bookDetails.request_status==="Book Sent"){
        var requeststatus="Donor Interested"
        db.collection("all_donations").doc(bookDetails.doc_id).update({
           "request_status":"Donor Interested"
        })
        this.sendNotification(bookDetails,requeststatus)
        }
        
        else{
        var requeststatus="Book Sent"
        db.collection("all_donations").doc(bookDetails.doc_id).update({
        "request_status":"Book Sent"
        })
    this.sendNotification(bookDetails,requeststatus)
   }
    }


    getAllDonations=()=>{
       this.requestRef=db.collection('all_donations').where('donor_id','==',this.state.userId)
        .onSnapshot((snapshot)=>{
            var allDonations=[];
            snapshot.docs.map((doc)=>{
                var donation=doc.data();
                donation["doc_id"]=doc.id;
                allDonations.push(donation)
            
            })
            this.setState({
                allDonations:allDonations
            })
        })
    }
    keyExtractor=(item,index) => index.toString()



    renderItem =({item,i}) =>(
        <ListItem
        key={i}
        title={item.book_name}
        subtitle={"Requested By:" +item.requested_by +"|" +"Status:"+item.request_status}
        subtitleStyle={{color:"black",marginLeft:20}}
        leftElement={<Icon name="book" type="font-awesome" color="#696969" alignSelf="flex-start" /> }
        titleStyle={{color:"black",fontWeight:'bold',marginLeft:20}}
        rightElement={
            <TouchableOpacity 
            style={{ backgroundColor:"#6F84D7",width:150,height:50,borderBottomLeftRadius:10,
            borderBottomRightRadius:10,borderTopLeftRadius:10,borderTopRightRadius:10
            
            }}
            onPress={()=>{
                this.sendBook(item)
            }}
            >
                <Text style={{color:'#fff',alignSelf:"center",fontWeight:'bold',marginTop:15}}>Send Book</Text>
            </TouchableOpacity>
        }
        bottomDivider
        />
    )

    componentDidMount(){
        this.getDonorDetails(this.state.userId);
        this.getAllDonations()
    }
    
    render(){
        return(
            <ScrollView>
            <View>
            <MyHeader navigation={this.props.navigation} title="My Donations"/>

                <View>
                    {
                        this.state.allDonations.length===0
                        ?(
                            <View>
                                <Text style={{color:"#000000",fontWeight:'bold',fontSize:40,alignSelf:"center",marginTop:300}}>You don't have any donations currently!</Text>
                            </View>
                        )
                        :(
                        
                            <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.allDonations}
                            renderItem={this.renderItem}

                          
                            />
                            
                        )
                    }
                </View>
            </View>
            </ScrollView>
        )
    }
}