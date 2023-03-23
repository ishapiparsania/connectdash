import React, { Component,useEffect,useState } from 'react'
import { Text, View,TouchableOpacity,Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';


const CoverImage =()=> {
    const [coverimg,setcoverimg]=useState("")

    const takePhotoLibrary1 = async()=>{
      ImagePicker.openPicker({
        width: 300,height: 400,cropping: true
      }).then(image => {
        console.log(image.path);
        AsyncStorage.getItem("UserDatadb").then(value => {
              try{
                  var updatedData = JSON.parse(value)
                  var userD =  updatedData.find(key =>  key.name === name )
                  if (userD) {
                    console.log(userD)
                    updatedData.findIndex(key =>  key.name === name )
                      var user= {
                          email: userD.email,
                          password: userD.password,
                          token : userD.token,
                          name:userD.name,
                          isLoggedin:'1',
                          profimage:userD.profimage,
                          coverimg:image.path

                      }
                      AsyncStorage.setItem('UserData',JSON.stringify(user));
                      setcoverimg(image.path)
                    
                  }
                  else{  
                  }
              }catch(error){
                  console.log(error)
              } 
          })
      });
      }

  
    return (
      <View >
        <TouchableOpacity onPress={takePhotoLibrary1}>
            <View>
          <Image  source={{uri:coverimg}} style={styles.imageStyle} />
          </View>
          </TouchableOpacity>
      </View>
    )
}

export default CoverImage
