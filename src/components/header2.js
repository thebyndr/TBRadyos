import React, { useEffect,useState } from 'react';
import {ActivityIndicator,View,Text, TextInput,StyleSheet, TouchableOpacity, Alert} from 'react-native'
import auth from '@react-native-firebase/auth'
import Modal from 'react-native-modal'
 import { Formik } from 'formik';
 import * as Yup from 'yup'
 import database from '@react-native-firebase/database';
 import Icon from 'react-native-vector-icons/Ionicons';
 import LinearGradient from 'react-native-linear-gradient';

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
        const [lang,setLang]=useState('tr')
        database()
        .ref('/data3'+'/'+currentUser.uid)
        .on('value',snapshot => {
    
            setLang(snapshot.val().lang)
       
        })
        
useEffect(()=>{

   setCurrentUser(auth().currentUser)
},[])

        const save=(values,{resetForm,setSubmitting})=>{
            const reference=database()
            .ref('/data2')
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
        
return(


    <View style={style.header}>

    <View style={style.right}>
<Text style={style.name}>{lang=="tr"?"Radyolarım":"My Radios"}</Text>
    </View>
    <View style={style.left}>
    <TouchableOpacity style={style.addCont} onPress={()=>setVisible(true)}>
    <Icon  name={Platform.OS === "ios" ? "ios-add" : "add-circle-outline"}
  color={'white'}
  size={55}/>
        </TouchableOpacity>
       
    </View>

    <Modal isVisible={visible}>
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <LinearGradient  style={{justifyContent:'center',alignItems:'center',width:280,height:350,borderRadius:25}} colors={['#4f9a94','white' ]}>

     <TouchableOpacity onPress={()=>setVisible(false)} style={{zIndex:999,position:'absolute',right:-25,top:-25,width:35,height:35,backgroundColor:'white',borderRadius:70,alignItems:'center',justifyContent:'center'}}>
<Text style={{fontSize:20,fontWeight:'700',color:'black'}}>X</Text>

     </TouchableOpacity>
     
     
     
       <Formik initialValues={{
      name:'',
      url:''
  }}
  
  onSubmit={save}
  
  validationSchema={
      Yup.object().shape({
     name:Yup.string().required('Radyo Adını Giriniz'),
     url:Yup.string().required('URL Adresini Giriniz')
        })
  }
  >
{({values,handleSubmit,errors,handleChange,isValid,isSubmitting})=>(

    <View style={style.forminput}>
<Text style={{
    color:'white',
        fontFamily:'sans-serif-medium',
         fontSize:25,
         marginBottom:10}}>
             Radyo Ekle
             </Text>
        <View style={style.inputContainer}>
<TextInput 
value={values.name}
autoCapitalize='none'
placeholder='Radyo Adı '
placeholderTextColor={'gray'}
onChangeText={handleChange('name')}
style={style.input}
/>
{(errors.name)&&<Text style={{color:'red',fontSize:18,fontFamily:'sans-serif-condensed'}}>{errors.name}</Text>}
        </View>

        <View style={style.inputContainer}>
<TextInput

value={values.url}
autoCapitalize='none'
placeholder='URL Adresi'
placeholderTextColor={'gray'}
onChangeText={handleChange('url')}
style={style.input}
/>
{(errors.url)&&<Text style={{fontFamily:'sans-serif-condensed',color:'red',fontSize:18}}>{errors.url}</Text>}
        </View>
        
     
<TouchableOpacity
style={style.kayitolbutton}
 onPress={handleSubmit}
 
>
    <Text style={style.kayitolbutton2}>Ekle</Text>
</TouchableOpacity>


    </View>
)}

  </Formik>
       </LinearGradient>
        
       </View>

   </Modal>
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
            backgroundColor:'white'
        },
        forminput:
        {
            alignItems:'center',
        justifyContent:'center',
        flex:1,
        borderRadius:10,
        width:'100%',
       
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