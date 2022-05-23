import React, { useEffect,useState } from 'react';
import {ActivityIndicator,View,Text, TextInput,StyleSheet, TouchableOpacity, Alert} from 'react-native'
import auth from '@react-native-firebase/auth'
import Modal from 'react-native-modal'
 import { Formik } from 'formik';
 import * as Yup from 'yup'
 import database from '@react-native-firebase/database';
 import Icon from 'react-native-vector-icons/Ionicons';
const Header =()=>{
    const logout =()=>{
        auth().signOut().then((res)=>{
           
        })
        }
        const [currentUser,setCurrentUser]=useState({
           displayName:'',
           uid:'' 

        })
        // const currentUser= auth().currentUser;
        const [visible,setVisible]=useState(false)
        
useEffect(()=>{

   setCurrentUser(auth().currentUser)
},[])

        const save=(values,{resetForm,setSubmitting})=>{
            const reference=database()
            .ref('/data')
        .push()
        
        
            reference.set({
              name: values.name,
              url:values.url,
              uid:currentUser.uid
            })
            .then(() => {
        
                alert("Radyolarım'a Eklendi.")
                resetForm({})
                setVisible(false)
        
            })
            .catch((e)=>{
                alert(e.message)
                setSubmitting(false)
            })
        }
        const [lang,setLang]=useState()
        database()
        .ref('/data3'+'/'+currentUser.uid)
        .on('value',snapshot => {
    
            setLang(snapshot.val().lang)
       
        })
return(


    <View style={style.header}>

    <View style={style.right}>
<Text style={style.name}>{lang=="tr"?"Profil":"Profile"}</Text>
    </View>
    <View style={style.left}>
    <TouchableOpacity style={style.addCont} onPress={logout}>
    <Icon  name={Platform.OS === "ios" ? "ios-add" : "exit-outline"}
  color={'red'}
  size={55}/>
        </TouchableOpacity>
       
    </View>

     
     
     

</View>
)
}
const style=StyleSheet.create({

    header:{
        flexDirection:'row',
        justifyContent:'space-between',
     
        alignItems:'center',
        padding:15
    },
    left:{
        flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'},
    name:{
        color:'white',
        fontFamily:'sans-serif-medium',
      
        fontSize:25
    },
    exitCont:{
    marginLeft:40
    },
    exit:{
        color:'white',
        fontFamily:'sans-serif-light',
     
        fontSize:25
    },
    addCont:{
        marginLeft:5
        },
        add:{
            color:'white',
            fontFamily:'sans-serif-light',
            fontSize:25
        },
        input:{
            width:230,
            height:50, 
            borderRadius:10,
            backgroundColor:'red'
        },
        forminput:
        {
            alignItems:'center',
        justifyContent:'center',
        flex:1,
        borderRadius:10,
        width:'100%',
        backgroundColor:'black'
        },
        
        inputContainer:{
            alignItems:'center',
            justifyContent:'center',
            marginBottom:25
        },
        kayitolbutton:{
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#263238',
            borderRadius:5,
            width:85,
            marginTop:25,
            height:43
        },
        
        kayitolbutton2:{
        color:'white'
        ,fontSize:20,
        fontWeight:'700'}
        
})
export default Header