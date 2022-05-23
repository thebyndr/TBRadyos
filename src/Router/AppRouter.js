
import React, { useEffect,useState } from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import database from '@react-native-firebase/database';

import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home/index'
import Login from '../screens/Auth/login'
import Register from '../screens/Auth/register'
import auth from '@react-native-firebase/auth'
import My from '../screens/My/index'
import Profile from '../screens/Profile/index'
const Stack =createNativeStackNavigator();

const HomeStack=()=>{
return(
    <Stack.Navigator initialRouteName={'HomeIndex'}>
<Stack.Screen name="Anasayfa" component={Home}/>

    </Stack.Navigator>
)

}
const styleLogReg={
    headerShown:false,
}

const AuthStack=()=>{
    return(
        <Stack.Navigator initialRouteName={'Login'} screenOptions={styleLogReg}>
    <Stack.Screen name="Giriş Ekranı"  component={Login}/>
    <Stack.Screen name="Kayıt Ekranı" component={Register}/>
        </Stack.Navigator>
    )
    
    }
    
const Tab=createBottomTabNavigator()
const customTabBarStyle={
    headerShown:false,
    tabBarActiveTintColor:'white',
    tabBarInactiveTintColor:'white',
    tabBarActiveBackgroundColor:'#00897b',
    tabBarInactiveBackgroundColor:'#005549'
}


const AppTabs=()=>{
    
    const [lang,setLang]=useState('tr')
    database()
    .ref('/data3'+'/'+auth().currentUser.uid)
    .on('value',snapshot => {

        setLang(snapshot.val().lang)
   
    })
    
  
          
    
       
   
return(
  
    <Tab.Navigator
    screenOptions={customTabBarStyle}
    >
        <Tab.Screen name={lang=="tr" ? "Anasayfa":"Homepage"} component={Home}
        options={{
            tabBarIcon:({color})=>(
                <Icon  name={Platform.OS === "ios" ? "ios-add" : "home-outline"}
  color={color}
  size={30}/>
)
        }}
        />
          <Tab.Screen name={lang=="tr" ? "Radyolarım":"My Radios"}  component={My}
        options={{
            tabBarIcon:({color})=>(
                <Icon  name={Platform.OS === "ios" ? "ios-add" : "radio"}
  color={color}
  size={30}/>
)
        }}
        />
        {/* <Tab.Screen name="Radyolarım" component={My}
            options={{
                tabBarIcon:({color})=>(
                    <Icon  name={Platform.OS === "ios" ? "ios-add" : "list-outline"}
      color={color}
      size={25}/>
    )
            }}
        /> */}
        <Tab.Screen name={lang=="tr" ? "Profil":"Profile"}  component={Profile}
           options={{
            tabBarIcon:({color})=>(
                <Icon  name={Platform.OS === "ios" ? "ios-add" : "person-circle-outline"}
  color={color}
  size={30}/>
)
        }}
        />
    </Tab.Navigator>
   
)


}


const AppNavigationContainer =()=>{
    const[isSignedIn,setIsSignedIn]=useState(false)
    
    useEffect(()=>{
auth().onAuthStateChanged(user=>{
   if(user){
       setIsSignedIn(true)
   }
   else{
    setIsSignedIn(false)
   }
})
    }
        
    ,[])
    

    return(
        <NavigationContainer>

           {isSignedIn ? <AppTabs/> : <AuthStack/>}

        </NavigationContainer>
    )
}
export default AppNavigationContainer;