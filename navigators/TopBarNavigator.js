import React, { Component } from 'react'
import { Text, View ,Image,StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import HomeScreen from '../screens/HomeScreen'
import RequestScreen from '../screens/RequestScreen'
import Menu from '../screens/Menu'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Dimensions } from 'react-native'
import { wp,hp } from '../components/Dimension'
import { Appbar } from 'react-native-paper'
import Header from '../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'


const Tab = createMaterialTopTabNavigator();

const MyTabs = ()=> {
    const insets = useSafeAreaInsets()
 
    return (
       
  
      <Tab.Navigator
        initialRouteName='HomeScreen'
        tabBarOptions = {{
            activeTintColor: "#e91e63",
            labelStyle : {fontSize :12},
            style:{backgroundColor:'white'}
        }}
            screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: 'white',paddingTop:hp('4%') }
        ,
    }}>

        <Tab.Screen
             name="HomeScreen"
             component={HomeScreen}
             options = {{tabBarLabel:'Home',tabBarIcon: ({ color }) => (
            <Image  style={styles.ImageStyle} source={require('../assets/home.png')} />),
        
        }}
        
        />
         <Tab.Screen
             name="RequestScreen"
             component={RequestScreen}
             options = {{tabBarLabel:'Request',tabBarIcon: ({ color }) => (
            <Image  style={styles.ImageStyle} source={require('../assets/request.png')} />

            ),}}
        
        />
         <Tab.Screen
             name="Menu"
             component={Menu}
             options = {{tabBarLabel:'Menu',tabBarIcon: ({ color }) => (
            <Image  style={styles.ImageStyle} source={require('../assets/menu.png')} />

            ),}}
        
        />
        </Tab.Navigator>   
    )
  
}
 const styles = StyleSheet.create({
        ImageStyle:{
            width:30,
            height:30,
            bottom:4
        },

        ImageStyle1:{
            width:22,
            height:22,
            bottom:2
        },

    });

export default function TopBarNavigator(){
    return(
        
        <Header/>
        //  <MyTabs/>
       
    )
}
