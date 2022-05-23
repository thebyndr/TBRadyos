
import React, { useEffect,useState } from 'react';

import {View,Text, TextInput,StyleSheet, TouchableOpacity, Alert} from 'react-native'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import Video from 'react-native-video'
import MusicControl, { Command } from 'react-native-music-control';
import Controls from './Controls';
import { inject,observer } from 'mobx-react';
import { observe } from 'mobx';
const Player=(props)=>{
// console.log(props)
const [pause,setPause]=useState(false)
const [loading,setLoading]=useState(true)
useEffect(()=>{
    
MusicControl.enableBackgroundMode(true)
MusicControl.enableControl('play',true)

 MusicControl.enableControl('pause',true)
MusicControl.enableControl('nextTrack',false)
MusicControl.enableControl('previewTrack',false)

MusicControl.on('play',onPlay)


MusicControl.on('pause',onPause)


},[])
const [name,setName]=useState()
const [name2,setName2]=useState()
MusicControl.updatePlayback({
    state:pause==false? MusicControl.STATE_PLAYING :MusicControl.STATE_PAUSED, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
 })


const onPlay=()=>{
    
database()
.ref('/data4')
.on('value',snapshot=> {

 
    database()
    .ref('/data5'+'/'+auth().currentUser.uid)
    .on('value',snapshot2 => {
   
      
    



    MusicControl.setNowPlaying({
      
        // title:props.PlayerStore.player?.name,
       
        title:snapshot2.val().RadioName,

        artwork:snapshot.val().photo=="my"
        ?{uri:snapshot.val().photo2}
        :require('../../assets/TBRadyosLOGO.png'), // URL or RN's image require()
        notificationIcon:'../../assets/TBRadyosLOGO.jpg',
        artist: snapshot.val().name,
        color: snapshot2.val().color, 
        colorized: true,
    isLiveStream: true,
    })
   
})
})
  
  
   
    
    
MusicControl.updatePlayback({
    state: MusicControl.STATE_PLAYING, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
 })
  
setPause(false)
}

const onPause=()=>{
    
  setPause(true)
    
}

const onLoadStart=()=>{
   
    setLoading(true)
}
const onProgress=()=>{

  if(loading){
      setLoading(false)
  }
}
const closePlayer=()=>{
    props.PlayerStore.closePlayer()
    
}
const onError=(error)=>{
console.log(error)
closePlayer()
}
if(props.PlayerStore.player==null) return <View></View>
return(
    <View style={style.container}>
<Controls
loading={loading}
paused={pause}
name={props.PlayerStore.player?.name}
onPressPlay={onPlay}
onPressPaused={onPause}
onClosePlayer={closePlayer}
/>

<Video
onError={onError}
paused={pause}
onProgress={onProgress}
onLoadStart={onLoadStart}
source={{uri:props.PlayerStore.player?.url}}
playInBackground={true}
playWhenInactive={true}
poster={'../../assets/TBRadyosLOGO.jpg'}

>

</Video>
</View>
)
    
}
const style=StyleSheet.create({
    container:{
        backgroundColor:'#00897b',
        padding:20,
        justifyContent:'center'
    }
})
export default inject('PlayerStore')(observer(Player))