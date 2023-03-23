import React, { Component } from 'react'
import { Text, View,ScrollView,TouchableOpacity,RefreshControl,FlatList,Image,Modal,StyleSheet,Pressable,TextInput } from 'react-native'
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { hp,wp } from './Dimension';
import { RemovePost } from '../actions/Action/PostAction';
import { AddLike,AddComment } from '../actions/Action/PostAction';

const ShowPost =()=> {
    const dispatch = useDispatch();
    const navigation=useNavigation();
    const dataNew = useSelector(state => state);
    const [like,setLike] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [CommentVisible, setCommentVisible] = useState(false);
    const [Comment,setComment]= useState('');
    const[profimage,setprofimage]=useState("https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png")
    const [showMore, setShowMore] = useState(false);
    const postarray=[]
    const data= dataNew.getPostReducer.post
    const datalike=dataNew.getPostLikeReducer.like
    const dataComment=dataNew.getPostCommentReducer.comment
    // console.log("datacomment")
    // console.log(dataComment)
    // console.log(dataNew)
    console.log("datalike")

    console.log(datalike)
    
    data.forEach(element=>{
        postarray.push(element)   
    })


    const res = postarray.map((el1) => ({  
        el1,
    count: datalike.find((el2) => el2.postid === el1.id),
    comment : dataComment.filter((el3)=>el3.postid === el1.id),
    }))
    console.log("hiii res")
    console.log(res)


    useEffect(()=>{
    AsyncStorage.getItem("UserData").then(valuen => {
    console.log(valuen)
    if (valuen !== null ){
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

    },[data,datalike,dataComment])

    


    const taskInputHandler = (enteredText) => 
        {
            setComment(enteredText);
        }

    const removePost = (item) => {
        console.log(item)
        const postIndex = data.indexOf(item);
        if (postIndex > -1) {
        dispatch(RemovePost(item));
        }   
    };

    const EditPost = (item) =>{
        console.log("Hiii")
        console.log(item)
    navigation.navigate("EditPost",item)
    setModalVisible(!modalVisible)
    }

    const showComment = (item) =>{
        console.log("here comment item")
        console.log(item)
        setCommentVisible(!CommentVisible)
    }

    const addLikeHandler=(item)=>{
        // console.log("hiii")
        // console.log(datalike)
        // console.log(datalike.length)

        if (datalike.find((data) => data.postid === item.id) !== undefined){         
            const removefirst = datalike.findIndex(data => 
                (data.postid === item.id))
                console.log(removefirst)
                const newcount = datalike[removefirst].count +1
                datalike.splice(removefirst , 1);
            dispatch(AddLike({
                postid:item.id,
                count:newcount
            }));

        console.log("item exist");
        } else {
    console.log("Not exist item");
        let countlike = 1
        dispatch(AddLike({
        postid:item.id,
        count:countlike
        }));

    } 
    
    }
    const addCommenthandler=(item)=>{
        taskInputHandler('');
        if(Comment!=''){
            console.log("here")
            console.log(dataComment)
            console.log(data)
            if(dataComment.find((data)=> data.postid === item.id) !== undefined){
                const index= dataComment.findIndex(data => 
                    (data.postid === item.id))
                    console.log(index)
                    const newcount = dataComment[index].commentid +1
                    dispatch(AddComment({
                            postid:item.id,
                            comment:Comment,
                            commentid:newcount,
                            name:item.name
                        }));
            }
            else{
            let commentid=1 
            // let commentcount=1   
            dispatch(AddComment({
                postid:item.id,
                comment:Comment,
                commentid:commentid,
                name:item.name,
                // commentcount:commentcount
            }));
            } 
        }
        else{
            console.log('write something')
        }
    }

    postarray.sort(function(a, b) {
    a = new Date(a.date).getTime();
    b = new Date(b.date).getTime();
    return b > a ? 1 : -1; 
    });

    res.sort(function(a, b) {
    a = new Date(a.el1.date).getTime();
    b = new Date(b.el1.date).getTime();
    return b > a ? 1 : -1; 
    });

    return (
    <View>
        <ScrollView>
        <FlatList 
            data={res}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item})=>( 
                <View style={{padding:10,borderTopColor:"#05050538",borderTopWidth:14,marginTop:10}}>
                    <View style={{flexDirection:"row",alignItems:"flex-start",justifyContent:"space-between"}}>
                    <View style={{flexDirection:"row"}}>
                        <Image source={{uri:profimage}} style={{width:45,height:45, borderRadius:50,borderColor:"#166ada",borderWidth:2.5}}/>
                    <View>
                        <Text style={{fontWeight:'bold',fontSize:22}}>{"  "}{item.el1.name}</Text>
                        <View style={{flexDirection:"row",alignItems:"center",marginTop:4}}>
                        <Text style={{fontSize:15}}>{"  "}{moment.utc(item.el1.date).subtract({hours:5,minutes:30}).startOf('seconds').fromNow()}</Text>
                        <Image source={{uri:"https://cdn-icons-png.flaticon.com/512/44/44386.png"
                        }} style={{width:12,height:12,marginLeft:5}} />
                        </View>
                    </View>
                </View>

                <View style={{flexDirection:'row',alignContent:'space-between'}}>
                    <TouchableOpacity onPress={()=>removePost(item.el1)}>
                        <Image source={require('../assets/delete.png')} style ={styles.ImageStyle1}/>     
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>EditPost(item.el1)}>
                        <Image source={require('../assets/edit.png')} style ={styles.ImageStyle1}/>
                    </TouchableOpacity>
                </View>
                </View>
                <View>
                   {item.el1.post.length > 30 ? (
                showMore ? (
                <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                    <Text style={{paddingHorizontal:10,paddingTop:12,fontSize:15}}>{item.el1.post}</Text>
                    <Text style={styles.seeMore}>Show less</Text>
                </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                        <Text style={{paddingHorizontal:10,paddingTop:12,fontSize:15}}>
                        {`${item.el1.post.slice(0, 30)}... `}
                        <Text style={styles.seeMore}>See more</Text>

                        </Text>
                    </TouchableOpacity>
                    )
                ) : (
                    <Text style={{paddingHorizontal:10,paddingTop:12,fontSize:15}}>{item.el1.post}</Text>
                )}
                    </View>

                    {/* post image  */}
                    {item.el1.image?
                    <View style={{width:"100%",height:400,paddingTop:5}}>
                        <Image source={{uri: item.el1.image}}
                        style={{width:"100%",height:"100%",resizeMode:"cover"}}/>
                    </View>
                    :<></>}

                    <View style={{flexDirection:'row',paddingRight:29,marginTop:20}}>
                    
                    {item.count!==undefined? 
                
                    <View style={{flexDirection:'row'}}>
                    <Image source={require('../assets/like1.png')} style={{height:22,width:22,marginBottom:4}}/>
                    <Text style={{left:20,color:`#696969`}}>{item.count.count} likes</Text>
                    </View>

                    :<Text></Text>} 

                    {item.comment.length!==0?                
                    <Text style={{left:30,color:`#696969`,paddingLeft:180}}>{item.comment.length} comments</Text>
                     :<Text></Text>} 

                     </View>

                     <View style={{borderTopColor:"#05050538",borderTopWidth:1,}}>
                    </View>

                    <View style={{paddingTop:5,flexDirection:"row",justifyContent:'space-around'}}>
                    <View style={{paddingTop:5,flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>addLikeHandler(item.el1)}>
                    
                    <Image 
                    source={require('../assets/like.png')}
                    style={{width:25,height:25}}/>
                    </TouchableOpacity>
                    <Text style={{color:`#696969`,fontSize:16,left:8}}>Like</Text>
                    </View>
                    <View style={{paddingTop:5,flexDirection:"row"}}>
                    <TouchableOpacity style={{left:10}} onPress={()=>showComment(item)}>
                    <Image 
                    source={require('../assets/comment.png')}
                    style={{width:25,height:25}}/>
                    </TouchableOpacity>
                    <Text style={{left:17,color:`#696969`,fontSize:16}}>Comment</Text>   
                    </View>             
                </View>

            {CommentVisible?
                <View style={{}}>
                    {item.comment.length!==0?
                    <View>
                <FlatList 
                    data={item.comment}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({item})=>(
                    <View  style={{flexDirection:"row",marginTop:5,alignItems:"center"}}>
                    <Image source={{uri: profimage}}
                    style={{width:30,height:30,borderRadius:50,marginRight:5}} />
                    <View style={{backgroundColor:"#F0F2F5",borderRadius:25,minWidth:100,
                        height:50,
                        paddingHorizontal:15,
                        justifyContent:"center"
                    }}>
                        <Text style={{fontWeight:'bold'}}>{item.name}</Text>

                        <Text>{item.comment}</Text>
                        </View>
                    </View>
                    )}/>
                </View>
                    
                :<></>}
                <View style={{flexDirection:'row'}}>
                    <TextInput
                        placeholder="Write a comment ..."
                        onChangeText={taskInputHandler}
                        value={Comment}
                        placeholderTextColor='grey'
                        style={styles.input}
                        backgroundColor="#F0F2F5"
                    />

                    <TouchableOpacity onPress={()=>addCommenthandler(item.el1)}>
                        <View>
                        {/* <Text style={{color:'#000',padding:20}}>Add</Text>  */}
                        <Image source={require('../assets/send.png')} style={styles.sendstyle}/>

                        </View>
                    </TouchableOpacity>
                </View>
                </View>   
                    :<></>} 
                
    </View>
    )
        }/>
        </ScrollView>
    </View>
    )

    }

    const styles = StyleSheet.create({

        input:{
        padding:10,
        borderRadius:20,
        marginVertical:10,
        backgroundColor:'#fff',
        width:wp('85%')
        },

        ImageStyle1:{
            width:22,
            height:22,
            bottom:2
        },
        sendstyle:{
            width:30,
            height:30,
            top:10,
            left:10
            // bottom:2
        },
        Imagestyle:{
        width:300,
        height:190,
        borderRadius:30,
        borderWidth:2,
        borderColor:'white'
        
        },

        profileImage:{
            width:50,
            height:50,
            borderRadius:75,

        },
        listItem:{
            backgroundColor:'white',
            paddingLeft:10,
            paddingBottom:10
            },

    centeredView: {
        flex: 1,
        marginTop:hp('80%')
    },
    modalView: {
        backgroundColor: "white",
        shadowColor: "#000",
        width:'100%',
        height:hp('90%'),
    },

    ModalText:{
    fontSize:23,
    fontWeight:'bold'
    },
    ModalList:{
    padding: 20,

    },
    listItem:{
    backgroundColor:'white',
    paddingLeft:wp('15%'),
    paddingBottom:10
    },
    listItem1:{
        backgroundColor:'white',
        padding:10,
        paddingLeft:15,
        borderColor:'black',
        borderWidth:2,
        marginVertical:10,
        borderRadius:15,
        marginRight:15,
        marginLeft:15,
        },

    CommentBox:{
        backgroundColor:'white',
        paddingTop:4,
        marginVertical:10

    },
    seeMore: {
    paddingHorizontal: 15,
    color: 'grey',
    fontSize: 15,
    fontWeight:'600'
  },
  height: Platform.OS === 'ios' ? 200 : 100

});



export default ShowPost