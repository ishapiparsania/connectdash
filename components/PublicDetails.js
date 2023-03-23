import React, { Component } from 'react'
import { Text, View,Image,StyleSheet, TouchableHighlight } from 'react-native'
import { wp } from './Dimension';
import { useNavigation } from '@react-navigation/native'


const PublicDetails =()=> {  
    const navigation=useNavigation();

    return (
        
      <View style={{flexDirection:'column',paddingLeft:12,paddingTop:10}}>
        <View style={{flexDirection:'row'}}>
            <Image source={require('../assets/city.png')} style={styles.ImageStyle}/>
            <Text style={styles.font}>Current City</Text>
        </View>
        <View style={{flexDirection:'row',paddingTop:5}}>
            <Image source={require('../assets/work.png')} style={styles.ImageStyle}/>
            <Text style={styles.font}>Work Experience</Text>
        </View>
        <View style={{flexDirection:'row',paddingTop:5}}>
            <Image source={require('../assets/edu.png')} style={styles.ImageStyle}/>
            <Text style={styles.font}>School</Text>
        </View>
        <View style={{flexDirection:'row',paddingTop:5}}>
            <Image source={require('../assets/hometown.png')} style={styles.ImageStyle}/>
            <Text style={styles.font}>Hometown</Text>
        </View>
        <View style={{flexDirection:'row',paddingTop:5}}>
            <Image source={require('../assets/certi.png')} style={styles.ImageStyle}/>
            <Text style={styles.font}>Certifications</Text>
        </View>
        <View style={{flexDirection:'row',paddingTop:5}}>
            <Image source={require('../assets/dots.png')} style={styles.ImageStyle}/>
            <Text style={[styles.font,{color:'black'}]}> See your About info</Text>
        </View>  
        <TouchableHighlight  underlayColor='grey' style={styles.input} onPress={()=>navigation.navigate("EditProfile")}>
           <Text style={{alignSelf:'center',color:'#1A6ED8',fontWeight:'500',fontSize:18}}> Edit public details</Text>
        </TouchableHighlight>
      </View>
    )
}
const styles = StyleSheet.create({
        ImageStyle:{
            width:30,
            height:30,
            resizeMode:"contain",
        },
        font:{
            color:'grey',
            fontWeight:'400',
            fontSize:18,
            paddingLeft:12

        },
        input:{
            width:wp('92%'),
            padding:12,
            borderRadius:5,
            marginVertical:10,
            backgroundColor:'rgba(223, 245, 255, 0.8)', 
            borderBottomWidth: 0.3 ,
            

        },

    });


export default PublicDetails
