
import React, { useEffect,useState } from 'react';
import {ActivityIndicator,View,Text, TextInput,StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {observable,action,makeAutoObservable } from 'mobx';


class PlayerStore {


    
    player=null
    constructor(){
        makeAutoObservable(this,{
            player:observable,
            savePlayer:action,
            getPlayer:action

        })
      
    }

    getPlayer=()=>{

return this.player

    }

    savePlayer=(url,name)=>{
this.player = {url,name}


    }
closePlayer=()=>{

this.player=null

}

}
export default new PlayerStore();