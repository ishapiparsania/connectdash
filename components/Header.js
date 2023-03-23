import React, { Component,useState,useEffect } from 'react'
import { Text, View,Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Header=()=> {
    const navigation=useNavigation();
 
    return (
      <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            backgroundColor:'#fff',
            paddingHorizontal:10 }}>
        <View>
        <TouchableOpacity>
        
        <Text style={{fontSize:34,fontWeight:'bold',paddingTop:10,color:'#1A6ED8'}}>ConnectDash</Text>
        </TouchableOpacity>
        
        </View>
        <View style={{flexDirection:'row',padding:15}}>
            <TouchableOpacity>
            <Image source={require("../assets/add.png")} 
            style={{width:30,height:30,resizeMode:"contain"}}/>
            </TouchableOpacity>
            <TouchableOpacity>
            <Image source={require("../assets/search.png")} 
            style={{width:30,height:30,resizeMode:"contain",paddingRight:50}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("MessageScreen")}>

            <Image source={require("../assets/message.png")} 
            style={{width:30,height:30,resizeMode:"contain"}}/>
            </TouchableOpacity>
            


        </View>
      </View>
    )
  
}

export default Header
