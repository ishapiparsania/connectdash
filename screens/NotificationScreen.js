import React, { Component } from 'react'
import { Text, View,SafeAreaView,Pressable,Image } from 'react-native'
import NavbarTab from '../components/NavbarTab'
import { USERS } from '../Data/User'
import moment from 'moment';


 const NotificationScreen = ()=>  {
    const today = moment();
    const tomorrow  = moment().add(1,'days');
    const todayD = today.format('DD/MM/YYYY')
    const tomorrowD = tomorrow.format('DD/MM/YYYY')
    const from_date = today.clone().startOf('week');
    const to_date = today.clone().endOf('week');
    const fromD = from_date.format('DD/MM/YYYY');
    const toD = to_date.format('DD/MM/YYYY')
    console.log(USERS)
    USERS.sort(function(a, b) {
    a = a.time.toString().split('/');
    b = b.time.toString().split('/');
    return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
    });
    console.log(USERS)
  
    return (
      <SafeAreaView>
        <NavbarTab/>
         <View>
            <View>
            <Pressable titleSize={18}>
                <Text style={{
                    fontWeight:"900",
                    fontSize:18,
                    color:"#1A6ED8",
                    height:40,
                    width:"90%",
                    backgroundColor:"#D8DADF",
                    marginHorizontal:10,
                    marginVertical:10,
                    paddingTop:7,
                    textAlign:"center"
                }}>Mark All as Read</Text>
            </Pressable>
            
                {USERS.map((post,index) =>(
                    <View>
                        {/* {post.time?:} */}
                    <View key={index} style={{ 
                        borderBottomWidth:1,
                        borderBottomColor:"#D8DADF",
                        flexDirection:"row",
                        alignItems:"center"
                        }}>
                        
                        <Image source={{uri:post.profile_img}} style={{
                            width:30,
                            height:30,
                            borderRadius:50,
                            marginVertical:10,
                        }}/>
                        <View>
                            <View style={{flexDirection:"row",alignItems:"center",paddingVertical:10}}>
                                <Text style={{fontSize:17,fontWeight:"bold"}} lineBreakMode={true}>{"  "}{post.name}</Text>
                                <Text style={{fontSize:17,paddingBottom:10}}>{"  "}{post.Notification}</Text>
                                </View>
                                <Text>{" "}{post.time}</Text>
                            </View>
                    </View>
                    </View>
                ))}
            </View>
        </View>
     </SafeAreaView>
    )
  
}

export default NotificationScreen
