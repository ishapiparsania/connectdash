import React, { Component } from 'react'
import { Text, View,SafeAreaView,Image } from 'react-native'
import NavbarTab from '../components/NavbarTab'
import { useNavigation } from '@react-navigation/native'
import { USERS } from '../Data/User'
import { wp } from '../components/Dimension'

 const MessageScreen = ()=>  {
  
    return (
      <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>

       <View>
           <Text style={{fontSize:20,fontWeight:"900",paddingLeft:10,paddingVertical:10,borderBottomColor:"#D8DADF",borderBottomWidth:1}}>Messages</Text>
           <View style={{borderTopColor:"#05050538",borderTopWidth:1,}}>
                    </View>

           {USERS.map((message,index) =>(
               <View style={{
                   flexDirection:"row",
                   paddingTop:20
               }}
               key={index}
               >
               <Image source={{uri: message.profile_img}} style={{width:35,height:35,borderRadius:50}} />
               <View style={{
                   flexDirection:"column",
                   position:"relative",
               }}>
               <Text style={{fontWeight:"900",fontSize:17,paddingBottom:10}}>{"   "}{message.name}</Text>
               <Text style=
               {{
                   color:"#fff", 
                   position:"absolute",
                   bottom:15,
                   left:5,
                   height:15,
                   width:15,
                   alignItems:"center",
                   justifyContent:"center",
                   backgroundColor:"red",
                   borderRadius:50,
                   fontSize:11,
                   fontWeight:"900",
                   paddingLeft:3
                   }}>{message.unread}</Text>
               <Text style={{fontSize:17,color:"black",paddingBottom:10}}>{"      "}{message.messages}</Text>
               <View style={{borderTopColor:"#05050538",borderTopWidth:1,width:wp('100%'),left:-40}}>
                    </View>
               </View>
               </View>
           ))}
        </View>
      </SafeAreaView>
    )
  
}

export default MessageScreen
