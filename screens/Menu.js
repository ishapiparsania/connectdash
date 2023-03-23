import React, { Component,useEffect } from 'react'
import { Text, View,SafeAreaView,TouchableOpacity,Image,StyleSheet,TouchableHighlight,Modal } from 'react-native'
import NavbarTab from '../components/NavbarTab'
import { useNavigation } from '@react-navigation/native'
import { hp } from '../components/Dimension'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { wp } from '../components/Dimension'
import { ClearCache } from '../actions/Action/PostAction'

 const Menu = ()=>  {
      const navigation=useNavigation();
      const dispatch = useDispatch();
      const dataNew = useSelector(state => state);
      const data= dataNew.getPostReducer.post;
      // const cache= dataNew.getProfileLikeReducer.getLike;

      const[name,setname]=useState("");

      const[profimage,setprofimage]=useState("https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png");
       const cacheHandler = ()=>{
        dispatch(ClearCache())
    }



      useEffect(()=>{
      AsyncStorage.getItem("UserData").then(valuen => {
      console.log(valuen)
      if (valuen !== null ) {
        try{
        var value= JSON.parse(valuen);
          if(value.isLoggedin === '1'){
          setprofimage(value.profimage)
          setname(value.name)
          }
        }catch(error){
        console.log(error)
        }
      }
    })
    
  },[data,profimage])

      const logOutHandler=async()=>{
            const input=await AsyncStorage.getItem('UserData');
            if(input){
                    var enter={
                        isLoggedin:'0'
                    }
                    AsyncStorage.setItem('UserData',JSON.stringify(enter));
                }
                navigation.navigate('Login')       
            }
    
    return (
      <SafeAreaView style={{flex:1}}>
         <NavbarTab/>
        <View style={{flex:1,
          // backgroundColor:'rgba(187, 202, 215, 0.44)'
          // backgroundColor:'#fff'
          }}>
          <Text style={{fontWeight:'bold',fontSize:30,padding:10}}>Menu</Text>
          <View style={{flexDirection:'row',padding:10}}>
            <TouchableOpacity>
            <Image source={{uri:profimage}} 
            style={styles.profileImage}/>
            </TouchableOpacity>
            <View style={{paddingLeft:20}}>
              <Text style={{fontSize:20,fontWeight:'bold',alignSelf:'center'}}>{name}</Text>
              <TouchableOpacity onPress={()=>navigation.navigate("ProfileScreen")}>
               
                <Text style={{paddingTop:2,fontSize:15,fontWeight:'400',color:'grey'}}>See your  profile</Text>
                
              </TouchableOpacity>
            </View>

        </View>

         <TouchableOpacity style={styles.cache} onPress={cacheHandler}>
            
             <Text style={[styles.text1,{fontSize:18}]}>Clear cache</Text>
             </TouchableOpacity>
        
          <TouchableOpacity onPress={logOutHandler} style={styles.input}>
            <Text style={{alignSelf:'center',color:'#000',fontWeight:'500',fontSize:18}}>
            Logout
            </Text>
          </TouchableOpacity>
          </View>
     </SafeAreaView>
    )
  
}

const styles = StyleSheet.create({

  profileImage:{
    width:50,
    height:50,
    borderRadius:75,

  },

input:{
    top:hp('60%'),
    width:wp('90%'),
    padding:12,
    borderRadius:5,
    alignSelf:'center',
    backgroundColor:"#05050538", 
    borderBottomWidth: 0.3

  }, 
  cache:{
    width:wp('90%'),
    padding:12,
    borderRadius:5,
    backgroundColor:'#05050538', 
    borderBottomWidth: 0.3 ,
    marginLeft:20,
    top:30

  }
}

);

export default Menu
