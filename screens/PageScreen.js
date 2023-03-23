import React, { Component } from 'react'
import { Text, View,SafeAreaView } from 'react-native'
import NavbarTab from '../components/NavbarTab'

 const PageScreen = ()=>  {
  
    return (
      <SafeAreaView>
        <NavbarTab/>
        <Text> PagesScreen </Text>
      </SafeAreaView>
    )
  
}

export default PageScreen
