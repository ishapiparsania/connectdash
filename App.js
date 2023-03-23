import React from 'react';

import {StyleSheet,Text,View,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import HomeScreen from './screens/HomeScreen';
import RequestScreen from './screens/RequestScreen';
import FriendScreen from './screens/FriendScreen';
import MessageScreen from './screens/MessageScreen';
import NotificationScreen from './screens/NotificationScreen';
import EditProfile from './screens/EditProfile';
import PageScreen from './screens/PageScreen';
import Menu from './screens/Menu';
import CreatePost from './screens/CreatePost';
import TopBarNavigator from './navigators/TopBarNavigator';
import reduxStore from './store/reduxStore'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import ProfileScreen from './screens/ProfileScreen';
import EditPost from './screens/EditPost'



const App=()=> {
  const Stack = createNativeStackNavigator();
  const {store,persistor}=reduxStore();

  return (
    <Provider store={store}>
<PersistGate loading={null} persistor={persistor}>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerTintColor: 'white',
        headerShown: false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerBackTitle:'',headerTitle:'Create Account'}}   />
        {/* <Stack.Screen name="TopBarNavigator" component={TopBarNavigator} options={{headerTintColor: 'white',
        headerShown: false}} /> */}
         <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}   />
         <Stack.Screen name="FriendScreen" component={FriendScreen} options={{headerShown:false}}   />
         <Stack.Screen name="MessageScreen" component={MessageScreen} option={{headerTitle:"Chats",headerBackTitleVisible:false}}   />
         <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{headerShown:false}}   />
         <Stack.Screen name="EditProfile" component={EditProfile} option={{headerBackVisible:false}}/>
         <Stack.Screen name="PageScreen" component={PageScreen} options={{headerShown:false}}   />
        <Stack.Screen name="RequestScreen" component={RequestScreen} options={{headerShown:false}}   />
        <Stack.Screen name="Menu" component={Menu} options={{headerShown:false}}   /> 
        <Stack.Screen name="CreatePost" component={CreatePost}  options={{headerShown:false}}  /> 
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown:false}} /> 
        <Stack.Screen name="EditPost" component={EditPost}  options={{headerShown:false}}/>        
      </Stack.Navigator>
    </NavigationContainer>
    </PersistGate>
  </Provider>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
