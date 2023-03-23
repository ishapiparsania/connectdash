import React, { Component,useState } from 'react'
import { Text, View,TextInput,Image,StyleSheet,SafeAreaView,TouchableOpacity } from 'react-native'
import { Appbar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { Editpost} from '../actions/Action/PostAction';
import { useDispatch } from 'react-redux';
import moment from 'moment';

const EditPost =(props)=> {
  const navigation=useNavigation();
  console.log("Edit")
  console.log(props.route.params)
  const dispatch = useDispatch();
   
    const [Post, setPost]= useState(props.route.params.post);
    const taskInputHandler = (enteredText) => 
      {
        setPost(enteredText);

      }

const addPosthandler=()=>{
  if(Post){
  dispatch(Editpost({

     OldData: {
            id: props.route.params.id,
            post: props.route.params.post,
            image:props.route.params.post,
            date:  props.route.params.date,
            name:props.route.params.name,
            profimage:props.route.params.profimage,


        },
      id:props.route.params.id,
      post:Post,
      image:props.route.params.image,
      name:props.route.params.name,
      date:moment(new Date()).format("MM/DD/YYYY hh:mm:ss A"),
      profimage:props.route.params.profimage
  }));  
     
  navigation.navigate("HomeScreen")
  }
  
  }
    
    return (
      <SafeAreaView style={{backgroundColor:'white',flex:1}}>
        <Appbar.Header  style={{backgroundColor:'transparent',borderWidth:1,borderBottomColor:'grey',borderTopColor:'white'}}>
        <View>
        <TouchableOpacity onPress={()=>navigation.navigate("HomeScreen")}>
        <Image  style={styles.ImageStyle1} source={require('../assets/back.png')} />
      </TouchableOpacity>   
      </View>
      <Appbar.Content title="Edit Post" titleStyle={{fontSize: 25}}/>
      <TouchableOpacity onPress={addPosthandler}>
              <View style={{backgroundColor:'#166ada',borderRadius:4,padding:9,width:65,alignItems:'center'}}>
                <Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>SAVE</Text> 
              </View>
          </TouchableOpacity>
      
    </Appbar.Header>
      <View>
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
               {props.route.params.image?
               <View style={{
                    width:"100%",
                    height:400,
                    paddingTop:5
                }}>
                  <Image source={{uri :props.route.params.image}} style={styles.Imagestyle} />
                   </View>:<></>}
                   
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

export default EditPost
