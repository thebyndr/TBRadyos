

import React,{Component}from "react";
import { 
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Touchable,
  Image,Alert,
  PermissionsAndroid,
  TouchableOpacity,
  Platform,
  Modal,
  Button
 } from 'react-native';
 import { NavigationContainer } from "@react-navigation/native";

 import Appp from './src/Router/AppRouter';
 import Player from './src/components/player'
import {Provider} from 'mobx-react'
import Store from './src/store'

const App:() => Node=()=>{


  return (
    <SafeAreaView style={{flex:1}}>
<Provider {...Store}>
<Appp/>
<Player/>
</Provider>

    </SafeAreaView>
   );
  }
   export default App;
 
 
 