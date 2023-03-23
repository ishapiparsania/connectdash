import React from 'react';

import {
StyleSheet,
Text,
View,Button,TouchableOpacity,TextInput,Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react';
import fb from '../assets/Work1.jpeg'
import styles from '../styles/style';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopBarNavigator from '../navigators/TopBarNavigator';
import { hp,wp } from '../components/Dimension';
import Toast from 'react-native-toast-message';
import { LogBox } from 'react-native';
import constants from '../constants/color'


const Login=()=> {
    const navigation=useNavigation();
    useEffect( () =>
        {   
        LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
        LogBox.ignoreAllLogs();//Ignore all log notifications
        AsyncStorage.getItem("UserData").then(valuen => {                
        if (valuen !== null ) {
            try{
                var value= JSON.parse(valuen);
                console.log(value)
                if(value.isLoggedin === '1'){
                    navigation.navigate("HomeScreen")
                    Toast.show({
                    type:'success',
                    position:'top',
                    visibilityTime:5000,
                    autoHide:true,
                    text1:'Welcome Back',
                })
                }
            }catch(error){
                console.log(error)
            }
            
            }
        })
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailValidError, setEmailValidError] = useState('');
    const [passwordValidError, setPasswordValidError] = useState('');

    const handleValidEmail = val => { 
        if (val.length === 0) {
        setEmailValidError('* email address must be entered');
        } 
        else  {
        setEmailValidError('');
        }
    };
    const handleValidPassword = val => {

        if (val.length === 0) {
        setPasswordValidError('* password must be enter');
        }  else  {
        setPasswordValidError('');
        }
    };
    const setData = async() => {
    if((email === '' && password === '') || email === '' || password === ''){
    Toast.show({
                type:'error',
                position:'top',
                visibilityTime:2000,
                autoHide:true,
                text1:'Email and Password required',
                text2:'please fill out all fields'
            })
    return;
    }else{

    await AsyncStorage.getItem("UserDatadb").then(value => {

    if (value !== null && email !== '' && password !== '') {
    try{
        var updatedData = JSON.parse(value)
        var userD =  updatedData.find(key =>  key.email === email && key.password === password )
        if (userD) {
            var user= {
                email: userD.email,
                password: userD.password,
                name:userD.name,
                token : userD.token,
                isLoggedin:'1',
                coverimg:userD.coverimg ,
                profimage:userD.profimage,
                about:userD.about
            }
            AsyncStorage.setItem('UserData',JSON.stringify(user));
            console.log(user)
            Toast.show({
                type:'success',
                position:'top',
                visibilityTime:2000,
                autoHide:true,
                position:'top',
                text1:'Congrats,Your Login is Successfull',
            })         
            navigation.navigate('HomeScreen');   
        }
        else{
            
            Toast.show({
                type:'error',
                position:'top', 
                visibilityTime:2000,
                autoHide:true,
                text1:'email and password is incorrect',
            })

            navigation.navigate('Login')
        }

    }catch(error){
        console.log(error)
    }

    }else{
        alert("No Data available")
    }
    })
    }


    }
    return (
    <View style={styles.container}>
        <View>
            <Image
                style={styles.tinyLogo}
                source={fb}/>
                <Text style={{fontSize:40,fontWeight:'bold',color:'black',position:'absolute',paddingTop:200,}}>ConnectDash</Text>
        </View>
    <Toast ref={(ref)=>{Toast.setRef(ref)}}/>

    <View style={{ top:hp('45%'),alignItems: 'center', justifyContent: 'center' }}>
    <TextInput
        style={[styles.input,{backgroundColor:'#fff'},styles.shadow]}
        value={email}
        placeholder={"Phone or email"}
        keyboardType='email-address'
        returnKeyType='next'
        placeholderTextColor = "#898F9C"
        onChangeText={value => {setEmail(value);handleValidEmail(value); }}
        autoCapitalize={"none"}
        clearButtonMode="always"
    />

    {emailValidError ? <Text style={{color:"red"}}>{emailValidError}</Text> : null}

    <TextInput

        style={[styles.input,{backgroundColor:'#fff'},styles.shadow]}
        value={password}
        placeholder={"Password"}
        keyboardType='email-address'
        returnKeyType='next'
        placeholderTextColor = "#898F9C"
        clearButtonMode="always"

        onChangeText={value => {setPassword(value);handleValidPassword(value);}}
    />
    {passwordValidError ? <Text style={{color:"red"}}>{passwordValidError}</Text> : null}

    <TouchableOpacity  style={styles.input} onPress = {setData} >
    <Text style={{color:'#ffff',fontSize:18,textAlign:'center'}}>Log In</Text>
    </TouchableOpacity>

    <TouchableOpacity  style={[styles.input,{backgroundColor:'#228b22'}]} onPress={() => navigation.navigate('Register')}>
    <Text style={{color:'#ffff',fontSize:18,textAlign:'center'}}>Create New Account</Text>
    </TouchableOpacity>

    </View>

    </View>
    )
    }

export default Login;
