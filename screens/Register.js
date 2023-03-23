import React from 'react';

import {
  StyleSheet,
  Text,
  View,Button,TextInput,TouchableOpacity
} from 'react-native';
import { useEffect } from 'react';


import { useNavigation } from '@react-navigation/native'
import { useState } from 'react';
import styles from '../styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { LogBox } from 'react-native';



const Register=()=> {
    const navigation=useNavigation();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [emailValidError, setEmailValidError] = useState('');
    const [passwordValidError, setPasswordValidError] = useState('');
    useEffect(()=>{
      LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
      LogBox.ignoreAllLogs();//Ignore all log notifications
})


    const handleValidEmail = val => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (val.length === 0) {
      setEmailValidError('* email address must be enter');
      } else if (reg.test(val) === false) {
      setEmailValidError('* enter valid email address i.e  abc@gmail.com');
      } else if (reg.test(val) === true) {
      setEmailValidError('');
      
      }
  };


  const handleValidPassword = val => {
      let reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      if (val.length === 0) {
      setPasswordValidError('* password must be enter');
      } else if (reg.test(val) === false) {
      setPasswordValidError('* enter valid password i.e Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');
      } else if (reg.test(val) === true) {
      setPasswordValidError('');
      }
  };

const register = async() => {
    if(email !== '' && password !== '' && name!=='' ){
        if(emailValidError === '' && passwordValidError===''){
            const arrayData = [];
            const userDetails = {
                email : email,
                password : password,
                name:name,
                token : Math.random(),
                coverimg:"" ,
                profimage:"https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png",
                about:"",
            }
            arrayData.push(userDetails);
            console.log(arrayData)
                    try{
                        AsyncStorage.getItem("UserDatadb").then(value => {
                        if (value !== null) {  
                               
                            const d = JSON.parse(value);
                            d.push(userDetails);
                            AsyncStorage.setItem("UserDatadb", JSON.stringify(d)).then(
                        () => {
                        
                            navigation.navigate('Login');
                            Toast.show({
                                type:'success',
                                position:'top',
                                text1:'Congrats,Your Registeration is Successfull',
                        
                            })
                    
                        }
                        );
                        } 
                        else {
                            
                        AsyncStorage.setItem(
                            "UserDatadb",
                            JSON.stringify(arrayData)
                

                        ).then(() => {
                            navigation.navigate('Login')
                           Toast.show({
                            type:'success',
                            position:'top',
                            visibilityTime:2000,
                            autoHide:true,
                            position:'top',
                            text1:'Registered Successfully',
                           
                    })
                            
                        });
                    }
                    });
            }catch(error){
                console.log(error);

            }
            }else{
                Toast.show({
                        type:'error',
                        position:'top',
                        visibilityTime:5000,
                        autoHide:true,
                        text1:'please provide valid email and password',
                        text2:'* enter valid email address i.e  abc@gmail.com',
                        // text2:''
                        
                    })
               
                return;
            }
        }else{  
            Toast.show({
                        type:'error',
                        position:'top',
                        visibilityTime:2000,
                        autoHide:true,
                        text1:'please fill out all fields'
                        
                    })
            return;
            }

        }
  


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'#fff' }}>
         <Toast ref={(ref)=>{Toast.setRef(ref)}}/>

       <TextInput
                style={[styles.input,{backgroundColor:'#fff'},styles.shadow]}
                value={name}
                placeholder={"Enter your name"}
                returnKeyType='next'
                placeholderTextColor = "#898F9C"
                onChangeText={value => {setName(value)}}
                autoCapitalize={"none"}
            />
      
      <TextInput
                style={[styles.input,{backgroundColor:'#fff'},styles.shadow]}
                value={email}
                placeholder={"Phone or email"}
                keyboardType='email-address'
                returnKeyType='next'
                placeholderTextColor = "#898F9C"
                onChangeText={value => {setEmail(value);handleValidEmail(value); }}
                autoCapitalize={"none"}
            />

        <TextInput
    
               style={[styles.input,{backgroundColor:'#fff'},styles.shadow]}
                value={password}
                placeholder={"Password"}
                secureTextEntry
                returnKeyType='next'
                placeholderTextColor = "#898F9C"
                onChangeText={value => {setPassword(value);handleValidPassword(value);}}
                autoCapitalize={"none"}
            />


            <TouchableOpacity  style={styles.input} onPress ={register}>
              <Text style={{color:'#ffff',fontSize:18,textAlign:'center'}}>Register</Text>
          </TouchableOpacity>

      <Button
        title="Already have an account?"
        onPress={() => navigation.navigate('Login')}
      />
      
    </View>
  )
}

export default Register;
