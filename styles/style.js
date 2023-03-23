import {
  StyleSheet,
  Text,
  View,Button,TouchableOpacity,TextInput,Image
} from 'react-native';
import { hp,wp } from '../components/Dimension';

const styles = StyleSheet.create({
  input:{
    width:'75%',
    padding:12,
    borderRadius:5,
    marginVertical:10,
    backgroundColor:'#4267B2', 
    borderBottomWidth: 0.3 

},

tinyLogo: {
    position: 'absolute',
    height:hp('35%'),
    width:wp('100%'),
  },
  container:{
    flex:1,backgroundColor:'#fff'
  },
  
});

export default styles
