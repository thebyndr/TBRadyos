
import React, { useEffect,useState } from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../src/screens/Home/index'
import Login from '../src/screens/Auth/login'
import Register from '../src/screens/Auth/register'
import auth from '@react-native-firebase/auth'
import My from '../screens/My/index'
import Profile from '../src/screens/Profile/index'
const Stack =createNativeStackNavigator();
const HomeStack=()=>{
return(
    <Stack.Navigator initialRouteName={'HomeIndex'}>
<Stack.Screen name="Anasayfa" component={Home}/>

    </Stack.Navigator>
)

}

const AuthStack=()=>{
    return(
        <Stack.Navigator initialRouteName={'Login'}>
    <Stack.Screen name="Giriş Ekranı" component={Login}/>
    <Stack.Screen name="Kayıt Ekranı" component={Register}/>
        </Stack.Navigator>
    )
    
    }

const Tab=createBottomTabNavigator()
const customTabBarStyle={
    headerShown:false,
    tabBarActiveTintColor:'white',
    tabBarInactiveTintColor:'white',
    tabBarActiveBackgroundColor:'red',
    tabBarInactiveBackgroundColor:'black'
}
const AppTabs=()=>{
return(
    <Tab.Navigator
    screenOptions={customTabBarStyle}
    >
        <Tab.Screen name="Anasayfa" component={Home}
        options={{
            tabBarIcon:({color})=>(
                <Icon  name={Platform.OS === "ios" ? "ios-add" : "home-outline"}
  color={color}
  size={25}/>
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
        <Tab.Screen name="Profil" component={Profile}
           options={{
            tabBarIcon:({color})=>(
                <Icon  name={Platform.OS === "ios" ? "ios-add" : "person-circle-outline"}
  color={color}
  size={25}/>
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