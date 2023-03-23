import React, { Component } from 'react'
import { Text, View,ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavbarTab from '../components/NavbarTab'
import { useNavigation } from '@react-navigation/native'
import Friends from '../components/Friends'


 const FriendScreen = ()=>  {
    const navigation=useNavigation();

   return (
      <SafeAreaView>
        <NavbarTab navigation={navigation}/>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Friends />
        </ScrollView>

      </SafeAreaView>
    )
}

export default FriendScreen

