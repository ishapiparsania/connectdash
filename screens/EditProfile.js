import React, { Component, useState,useEffect } from 'react'
import { Text, View,SafeAreaView,StyleSheet,TouchableOpacity,Image,TextInput } from 'react-native'
import { hp,wp } from '../components/Dimension'
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PublicDetails from '../components/PublicDetails';
  
 const EditProfile = ()=>  {

  const[profimg,setprofimg]=useState("https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png");
  const [About, setAbout] = useState("");
  const[name,setname]=useState("");

  useEffect(()=>{
    AsyncStorage.getItem("UserData").then(valuen => {
      if (valuen !== null ) {
        try{
        var value= JSON.parse(valuen);
        console.log(value)
          if(value.isLoggedin === '1'){
          setprofimg(value.profimage)
          setname(value.name)
          // setAbout(value.about)

          }
        }catch(error){
        console.log(error)
        }
      }
    })
    

    
  },[profimg,About]);


    const takePhotoLibrary = async()=>{
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
                          profimage:image.path,
                          coverimg:userD.coverimg
                      }
                      AsyncStorage.setItem('UserData',JSON.stringify(user));
                      setprofimg(image.path)
                    
                  }
                  else{  
                  }
              }catch(error){
                  console.log(error)
              } 
          })
      });
      }

      const taskInputHandler = (enteredText) => 
  {
    setAbout(enteredText);
    console.log(About)

  }

  const addAboutHandler = ()=>{
    // setAbout("")
     AsyncStorage.getItem("UserDatadb").then(value => {
              try{
                  var updatedData = JSON.parse(value)
                    console.log(updatedData)

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
                          profimage:userD.profimg,
                          coverimg:userD.coverimg,
                          about:About
                      }
                      AsyncStorage.setItem('UserData',JSON.stringify(user));
                      // setAbout(About)
                    
                  }
                  else{  
                  }
              }catch(error){
                  console.log(error)
              } 
          })
    

  }
    

    return (
      <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}> 
      <View style={{flexDirection:'row',justifyContent:'space-between',padding:20}}>
      <Text style={{fontWeight:'bold',fontSize:21}}>Profile Picture</Text>
      <Text style={{fontSize:18,color:'#1A6ED8'}}>Add</Text>


      </View>
      <TouchableOpacity onPress={takePhotoLibrary}>
            <View style={{alignSelf:'center'}}>
                <Image source={{uri:profimg}} style={styles.profileImage} />
            </View>
        </TouchableOpacity> 
      <View style={{padding:5,borderTopColor:"#05050538",borderTopWidth:1,marginTop:10}}>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between',padding:20}}>
      <Text style={{fontWeight:'bold',fontSize:21}}>About</Text>
      <TouchableOpacity onPress={addAboutHandler}>
      <Text style={{fontSize:18,color:'#1A6ED8'}}>Add</Text>
      </TouchableOpacity>
      </View>
      <TextInput
          style={{alignSelf:'center',fontSize:20, color:'grey'}}
          value={About}
          onChangeText={taskInputHandler}
          placeholder={"Describe Yourself ..."}
          placeholderTextColor = "grey"
          autoCapitalize={"none"}
          />
      {/* <Text style={{alignSelf:'center',fontSize:20, color:'grey'}}>Describe Yourself ...</Text> */}
      <View style={{padding:5,borderTopColor:"#05050538",borderTopWidth:1,marginTop:10}}>
      </View>
      <Text style={{fontWeight:'bold',fontSize:21,padding:20}}>Details</Text>
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
        <View style={{padding:5,borderTopColor:"#05050538",borderTopWidth:1,marginTop:10}}>
      </View>
        
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    profileImage:{
      // top:hp('6%'),
      width:180,
      height:180,
      borderRadius:120,
      borderWidth:6,
      borderColor:'#fff',
      backgroundColor:'#d3d3d3'  
  },
  imageStyle :{
    position: 'absolute',
    borderTopRightRadius:15,
    borderTopLeftRadius:15,
    height:hp('34%'),
    width:wp('90%'),
    position: 'absolute',
    top:hp('2%'),
    marginRight:5,
    marginLeft:20,
    backgroundColor:'#d3d3d3'  

},
  input:{
  width:wp('80%'),
  padding:12,
  borderRadius:5,
  backgroundColor:'#1A6ED8', 
  borderBottomWidth: 0.3 ,
  
  marginLeft:20

},
input1:{
  width:wp('11%'),
  borderRadius:5,
  backgroundColor:'#d3d3d3', 
  borderBottomWidth: 0.3 ,

  marginLeft:7

},
 ImageStyle:{
            width:30,
            height:30,
            resizeMode:"contain",
            left:10
        },
  
    font:{
            color:'grey',
            fontWeight:'400',
            fontSize:18,
            paddingLeft:30

        },
    
});

export default EditProfile
