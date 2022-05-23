import React from 'react';
 import {View,Text,Image, TextInput,StyleSheet, TouchableOpacity, Alert} from 'react-native'
 import { Formik } from 'formik';
 import * as Yup from 'yup'
 import auth from '@react-native-firebase/auth'
import { PropTypes } from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';

const Login=(props)=>{
    const login =(values,{setSubmitting,resetForm})=>{
        // console.log(values)
// setSubmitting(false)
// resetForm({});

try{
 auth().signInWithEmailAndPassword(values.email,values.password).then(() => {
  resetForm({})
    //Kullanıcı kayıt olduysa
   props.navigation.navigate('home')
  })
  .catch(error => {
      //Mail adresi kullanıldıysa
    if (error.code === 'auth/email-already-in-use') {
    alert('Daha önce kullanılmamış bir email giriniz')
    setSubmitting(false)
    }
//mail geçerli değilse
    if (error.code === 'auth/invalid-email') {
     alert('Geçersiz Mail')
     setSubmitting(false)
    }
    if(error.code==='auth/weak-password'){
        alert('Şifre 6 karakterden daha uzun olmalı')
    }
    if(error.code==='auth/wrong-password'){
        alert('Hatalı Şifre')
    }
if(error.code==='auth/user-not-found'){
alert('Hatalı Mail')
setSubmitting(false)
}
    console.error(error);
  });

}
catch(e)
{
    alert(e.message)
}
    }
    return(

<LinearGradient style={style.container} colors={['#00897b','#00897b','black' ]}>
<View style={{alignSelf:'center',alignItems:'center',marginTop:100,marginBottom:75}}>
<Image source={require('../../../assets/TBRadyosLOGO.png')}
                resizeMode="center"
                style={{width:150,height:150}}
              
              />
</View>
  <Formik initialValues={{
      email:'',
      password:''
  }}
  
  onSubmit={login}
  
  validationSchema={
      Yup.object().shape({
     email:Yup.string().email('*Geçersiz Mail').required('*Mailinizi Giriniz'),
     password:Yup.string().required('*Şifrenizi Giriniz')
        })
  }
  >
{({values,handleSubmit,errors,handleChange,isValid,isSubmitting})=>(

    <View style={{
        alignItems:'center',
justifyContent:'center'

    }}>

        <View style={style.inputContainer}>
<TextInput 
value={values.email}
autoCapitalize='none'
placeholder='Email (abc68@gmail.com)'
placeholderTextColor={'gray'}
onChangeText={handleChange('email')}
style={style.input}

/>
{(errors.email)&&<Text style={{color:'red',fontSize:18,fontFamily:'sans-serif-condensed'}}>{errors.email}</Text>}
        </View>

        <View style={style.inputContainer}>
<TextInput
secureTextEntry={true}
value={values.password}
autoCapitalize='none'
placeholder='Şifre (123456)'
placeholderTextColor={'gray'}
onChangeText={handleChange('password')}
style={style.input}
keyboardType='number-pad'
/>
{(errors.password)&&<Text style={{fontFamily:'sans-serif-condensed',color:'red',fontSize:18}}>{errors.password}</Text>}
        </View>

       
    
     <View style={{flexDirection:'row',marginTop:50}}>
     <TouchableOpacity
style={style.girisbutton}
 onPress={handleSubmit}

>
    <Text style={style.kayitolbutton2}>Giriş</Text>
</TouchableOpacity>

<TouchableOpacity
style={style.kayitolbutton}
 onPress={()=>props.navigation.navigate('Kayıt Ekranı')}

>
    <Text style={{
        color:'white'
        ,fontSize:20,
        fontWeight:'700'
    }}>Kayıt Ol</Text>
</TouchableOpacity>
     </View>



</View>


    
)}

  </Formik>
  

</LinearGradient>

    )
}
const style=StyleSheet.create({
container:{
    flex:1,

},
input:{
    width:270,
    height:50, 
    borderRadius:25,
    backgroundColor:'black',
    color:'white',
    borderWidth:3,
    borderBottomColor:'white',
    borderTopColor:'white',
   borderLeftColor:'red',
    borderRightColor:'red'
},

inputContainer:{
    alignItems:'center',
    justifyContent:'center',
    marginBottom:25
},
girisbutton:{
    alignItems:'center',
    justifyContent:'center',
  
    backgroundColor:'#dad7cd',
    borderRadius:5,
    width:85,
    margin:6,
    height:43
},
kayitolbutton:{
    alignItems:'center',
    justifyContent:'center',
margin:6,
    backgroundColor:'#102027',
    borderRadius:5,
    width:85,
   
    height:43
},

kayitolbutton2:{
color:'#102027'
,fontSize:20,
fontWeight:'700'}
})
export default Login