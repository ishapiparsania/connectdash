import React from 'react'
import { View, Text, Image, TouchableOpacity ,StyleSheet,TextInput} from 'react-native'
import { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const PostOption = () => {
const navigation=useNavigation();
const[profimage,setprofimage]=useState("https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png")
    useEffect(()=>{
        AsyncStorage.getItem("UserData").then(valuen => {
        console.log(valuen)
        if (valuen !== null ) {
            try{
            var value= JSON.parse(valuen);
            if(value.isLoggedin === '1'){
            setprofimage(value.profimage)
            }
            }catch(error){
            console.log(error)
            }
        }
        })
        })


return (
<View>
    <View style={{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        paddingTop:10,
    }}
    >
        <View>
            <TouchableOpacity>
            <Image source={{uri:profimage}} 
            style={styles.profileImage}
                />
            </TouchableOpacity>
        </View>
            <View style={{
                justifyContent:"flex-start",
                paddingRight:90
        }}>
                <TouchableOpacity onPress={()=>navigation.navigate("CreatePost")}>
                <View style={styles.input}>
                    <Text>
                        what's on your mind ?
                    </Text>
                </View>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity>
                <Image source={require("../assets/photo.png")} 
                style={{
                    height:30,
                    width:30,
                    resizeMode:"contain"
                }}
                />
                </TouchableOpacity>
            </View>
    </View>
</View>
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
profileImage:{
width:50,
height:50,
borderRadius:75,

},
input:{
padding:10,
borderRadius:20,
marginVertical:10,
backgroundColor:'#fff',
borderWidth:1,
borderColor:'grey',
width:'150%'
},

});

export default PostOption;