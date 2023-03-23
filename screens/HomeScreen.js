import React, { Component,useEffect } from 'react'
import { Text, TouchableOpacity, View,Image,StyleSheet, SafeAreaView ,ScrollView,FlatList,RefreshControl,Modal,Pressable} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../components/Header'
import NavbarTab from '../components/NavbarTab'
import PostOption from '../components/PostOption'
import { useState } from 'react';
import { LogBox } from 'react-native';
import ShowPost from '../components/ShowPost'
import constants from '../constants/color'


const HomeScreen=()=> {
    const navigation=useNavigation();
    const [refresh,setRefresh] = useState(false)
    const pullMe = ()=>{
      setRefresh(true)
      setTimeout(()=>{
      setRefresh(false)
      },4000)
      
    }

    useEffect(()=>{
      LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
      LogBox.ignoreAllLogs();//Ignore all log notifications
})
  
    return (
      <SafeAreaView style={{backgroundColor:'#fff',flex:1}}>
        <Header/>
        <NavbarTab navigation={navigation}/>          
         <ScrollView>
        <PostOption/>
        <ShowPost/> 
        </ScrollView>
      </SafeAreaView>
    )
  
}


export default HomeScreen
