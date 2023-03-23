import React, { Component, useEffect } from 'react'
import { Text, View,TextInput,StyleSheet,TouchableOpacity,FlatList,Image} from 'react-native'
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addPost} from '../actions/Action/PostAction';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper'
import moment from 'moment';
// import Video from 'react-native-video'

const CreatePost =()=> {
  const dispatch = useDispatch();
  const navigation=useNavigation();
  const dataNew = useSelector(state => state);
  console.log(dataNew)
  const data= dataNew.getPostReducer.post
  const [postarray,setpostarray]=useState([])
  const [edit,setEdit]=useState(false)
  console.log(dataNew)
  const [Post, setPost] = useState("");
  const[name,setname]=useState("")
  const[profimage,setprofimage]=useState("https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png")
  const[image,setImage]=useState("");
  const[video,setVideo]=useState("");
  
  const takePhotoLibrary=()=>{
    ImagePicker.openPicker({
      width: 300,height: 400,cropping: true
    }).then(image => {
      console.log(image);
      setImage(image.path)
    });
    }

 const takeVideoLibrary=()=>{
    console.log("hii video picker here")
    ImagePicker.openPicker({
      mediaType: "video",
    }).then((video) => {
      console.log(video);
      setVideo(video.path)

      });
 }

  const taskInputHandler = (enteredText) => 
  {
    setPost(enteredText);

  }


  const addPosthandler=()=>{
  if(Post!='' || image!='' ){
    if(data.length>=1){
      let LastId = data[data.length-1]
    let newId = LastId.id+1;
    taskInputHandler('');
    dispatch(addPost({
      id:newId,
      post:Post,
      image:image,
      name:name,
      date:moment(new Date()).format("MM/DD/YYYY hh:mm:ss A"),     
      profimage:profimage,
  }));  
    }else{ 
  let newId = 1;
  dispatch(addPost({
      id:newId,
      post:Post,
      image:image,
      name:name,
      date:moment(new Date()).format("MM/DD/YYYY hh:mm:ss A"),
      profimage:profimage
  }));  
  }   
  navigation.navigate("HomeScreen")
  }
  setImage('')
  }

  useEffect(()=>{
    AsyncStorage.getItem("UserData").then(valuen => {
    console.log(valuen)
      if (valuen !== null ) {
        try{
        var value= JSON.parse(valuen);
          if(value.isLoggedin === '1'){
          setname(value.name)
          setprofimage(value.profimage)
          }
        }catch(error){
        console.log(error)
        }
      }

    })
  })

  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
      <Appbar.Header  style={{backgroundColor:'transparent',borderWidth:1,borderBottomColor:'grey',borderTopColor:'white'}}>
        <View>
        <TouchableOpacity onPress={()=>navigation.navigate("HomeScreen")}>
        <Image  style={styles.ImageStyle1} source={require('../assets/back.png')} />
      </TouchableOpacity>   
      </View>
      <Appbar.Content title="Create Post" titleStyle={{fontSize: 25}}/>
      <TouchableOpacity onPress={addPosthandler}>
              <View style={{backgroundColor:'#166ada',borderRadius:4,padding:9,width:65,alignItems:'center'}}>
                <Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>POST</Text> 
              </View>
          </TouchableOpacity>
      
    </Appbar.Header>
        <View style={{marginTop:15}}>
              <View style={{flexDirection:"row"}}>
            <Image source={{uri:profimage}} 
            style={{
                width:40,
                height:40, 
                borderRadius:50,
                borderColor:"#166ada",
                borderWidth:2.5
              }}
            />
          <View>
              <Text style={{fontWeight:'bold',fontSize:20}}>{"  "}{name}</Text>
              
          </View>
        </View>

            {image?<View>
              <View style={{height:100,backgroundColor:'white',marginTop:9}}>
        
                <TextInput
                  style={styles.input}
                  value={Post}
                  onChangeText={taskInputHandler}
                  placeholder={"what's on your mind ?  "}
                  placeholderTextColor = "grey"
                  autoCapitalize={"none"}
                  />
              </View>
                   <View style={{
                    width:"100%",
                    height:400,
                    paddingTop:5
                }}>
                  <Image source={{uri :image}} style={styles.Imagestyle} />
                  </View>
            </View>
            :<View>
              <View style={{height:500,backgroundColor:'white',marginTop:9}}>
        
                <TextInput
                  style={styles.input}
                  value={Post}
                  onChangeText={taskInputHandler}
                  placeholder={"what's on your mind ?  "}
                  placeholderTextColor = "grey"
                  autoCapitalize={"none"}
                  />
              </View>
          <View style={{flexDirection:'row',justifyContent:'flex-start',height:50,backgroundColor:'white',borderWidth:1,borderColor:'grey'}}>
            <TouchableOpacity>
                      <Image source={require("../assets/photo.png")} 
                      style={{
                          height:40,
                          width:40,
                          resizeMode:"contain"
                      }}
                      />
            </TouchableOpacity>
            <TouchableOpacity onPress={takePhotoLibrary}>
            <View style={{paddingLeft:40}}>
            <Text style={{fontSize:20}}>Photo</Text>
            </View>
            </TouchableOpacity>
            </View>
            
              </View>}
      </View>
      
  </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  input:{
      padding:10,
      backgroundColor:'#fff',
      fontSize:30
  },


    Imagestyle:{
      width:"100%",
            height:"100%",
            resizeMode:"cover"
    },
    ImageStyle1:{
            width:35,
            height:35,
            // right:20
        },
        video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

});

export default CreatePost
