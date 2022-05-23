
import React, { useEffect,useState } from 'react';
import {ActivityIndicator,View,Text, TextInput,StyleSheet, TouchableOpacity, Alert} from 'react-native'
import MusicControl from 'react-native-music-control';
import Icon from 'react-native-vector-icons/Ionicons';

const Controls=({name,loading,paused,onPressPaused,onPressPlay,onClosePlayer})=>{

return(


<View style={style.container}>

{loading 
? <ActivityIndicator size="large" color="white"></ActivityIndicator> 

:<View style={{flexDirection:'row',alignItems:'center'}}>
<TouchableOpacity onPress={(paused)? onPressPlay:onPressPaused}>

    <Icon  name={Platform.OS === "ios" ? "ios-add" : paused ? "play":"pause"}
  color={'white'}
  size={40}/> 
 



</TouchableOpacity>

</View>


}
<Text style={{fontSize:25,color:'white',fontFamily:'sans-serif-condensed'}}>{name}</Text>

<TouchableOpacity onPress={onClosePlayer} style={{alignItems:'center',justifyContent:'center'}}>
<Icon  name={Platform.OS === "ios" ? "ios-add" : "close-circle"}
  color={'white'}
  size={40}/> 
 
</TouchableOpacity>


</View>

)
}

const style=StyleSheet.create({

    container:{
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center'

    }
})

export default Controls