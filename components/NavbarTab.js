import React, { Component } from 'react'
import { Text, View,Image ,StyleSheet, TouchableOpacity,TouchableHighlight} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

const NavbarTab=()=> {
    const navigation=useNavigation();
    const [home, sethome] = useState(true);
    const [friend, setfriend] = useState(false);

    const toggleFriend = ()=>{
        setfriend(!friend)
        sethome(!home)
       navigation.push("FriendScreen")
        
    }
      console.log(home);
    return (
    
    <View>
            <View style={{
                flexDirection:"row",
                justifyContent:"space-around",
                borderBottomColor:"#05050538",
                borderBottomWidth:1,
                padding:5,
            }}>    
               {/* Home */}
                   <TouchableHighlight activeOpacity={0.5} underlayColor="#1A6ED8" onPress={() => navigation.push("HomeScreen")}>
                         <Image source={require("../assets/home.png")} 
                         style={styles.ImageStyle}
                            
                         />
                    </TouchableHighlight>
                    {/* Friends */}
                    <TouchableHighlight activeOpacity={0.5} underlayColor="#1A6ED8" onPress={() => navigation.push("FriendScreen")}>
                         <Image source={require("../assets/friend1.png")} 
                          style={styles.ImageStyle}
                         />
                    </TouchableHighlight>
                    {/* Messages */}
                    <TouchableHighlight activeOpacity={0.5} underlayColor="#1A6ED8" onPress={() => navigation.push("ProfileScreen")}>
                         <Image source={require("../assets/user2.png")} 
                          style={styles.ImageStyle}
                         />
                    </TouchableHighlight>
                      {/* Pages */}
                    {/* <TouchableHighlight activeOpacity={0.5} underlayColor="#4267B2" onPress={() => navigation.push("PageScreen")}>
                         <Image source={require("../assets/page.png")} 
                          style={styles.ImageStyle}
                         />
                    </TouchableHighlight> */}
                    {/* Notifications */}
                    <TouchableHighlight activeOpacity={0.5} underlayColor="#1A6ED8" onPress={() => navigation.push("NotificationScreen")}>
                         <Image source={require("../assets/notification.png")} 
                          style={styles.ImageStyle}
                         />
                         {/* Videos */}
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={0.5} underlayColor="#1A6ED8" onPress={() => navigation.push("Menu")}>
                         <Image source={require("../assets/menu.png")} 
                          style={styles.ImageStyle}
                         />
                    </TouchableHighlight>
                  
                    

            </View>
        </View>
    )
  
}

const styles = StyleSheet.create({
        ImageStyle:{
            width:35,
            height:35,
            resizeMode:"contain"
        },

        

    });

export default NavbarTab
