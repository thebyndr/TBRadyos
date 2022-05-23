import React from 'react';
 import {View,Text, TextInput,StyleSheet, TouchableOpacity} from 'react-native'
 import { Formik } from 'formik';
 import * as Yup from 'yup'
 import auth from '@react-native-firebase/auth'
import { PropTypes } from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';
import database from '@react-native-firebase/database';
const Register=(props)=>{
    const register =(values,{setSubmitting,resetForm})=>{
        console.log(values)
// setSubmitting(false)
// resetForm({});

try{
 auth().createUserWithEmailAndPassword(values.email,values.password).then(() => {
  resetForm({})
    //Kullanıcı kayıt olduysa
   lang()
   props.navigation.navigate('Anasayfa')
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

    console.error(error);
  });

}
catch(e)
{
    alert(e.message)
}
    }
    const lang=()=>{
        database().ref('/data3'+'/'+auth().currentUser.uid).update({
            lang:"tr"
       
        })
    }
    return(

<LinearGradient style={style.container} colors={['#00897b','#00897b','white' ]}>
<Text style={{flex:1,marginTop:25,fontSize:35,color:'white',fontFamily:'serif'}}>Kayıt Ol</Text>

  <Formik initialValues={{
      email:'',
      password:'',
      name:'',
      
  }}
  
  onSubmit={register}
  
  validationSchema={
      Yup.object().shape({
     email:Yup.string().email('Geçersiz Mail').required('Mailinizi Giriniz'),
     password:Yup.string().required('Şifrenizi Giriniz'),
    name:Yup.string().required('Kullanıcı Adınızı Giriniz'),
 
    })
  }
  >
{({values,handleSubmit,errors,handleChange,isValid,isSubmitting})=>(

    <View style={style.forminput}>

   <View style={style.inputContainer}>
<TextInput 
value={values.name}
autoCapitalize='none'
placeholder='Kullanıcı Adı'
placeholderTextColor={'gray'}
onChangeText={handleChange('name')}
style={style.input}
/>
{(errors.name)&&<Text style={{color:'red',fontSize:18,fontFamily:'sans-serif-condensed'}}>{errors.name}</Text>}
        </View>

        <View style={style.inputContainer}>
<TextInput 
value={values.email}
autoCapitalize='none'
placeholder='Email '
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
placeholder='Şifre'
placeholderTextColor={'gray'}
onChangeText={handleChange('password')}
style={style.input}
keyboardType='number-pad'
/>
{(errors.password)&&<Text style={{fontFamily:'sans-serif-condensed',color:'red',fontSize:18}}>{errors.password}</Text>}
        </View>
        
     

    
<TouchableOpacity
style={style.kayitolbutton}
 onPress={handleSubmit}

>
    <Text style={style.kayitolbutton2}>Kayıt Ol</Text>
</TouchableOpacity>
<Text style={{fontWeight:'700',fontSize:15,marginTop:25}}>Hesabınız Varsa </Text>
<TouchableOpacity
style={{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#102027',
    borderRadius:5,
    width:85,
    
    height:43
}}
 onPress={()=>props.navigation.navigate('Giriş Ekranı')}

>
    <Text style={{
        color:'white'
        ,fontSize:20,
        fontWeight:'700'
    }}>Giriş</Text>
</TouchableOpacity>
</View>
    
)}

  </Formik>

  

</LinearGradient >

    )
}
const style=StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center'
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
   borderLeftColor:'purple',
    borderRightColor:'purple'
},
forminput:
{alignItems:'center',
justifyContent:'center',
flex:5,
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
    backgroundColor:'#dad7cd',
    borderRadius:5,
    width:85,
    
    height:43
},

kayitolbutton2:{
color:'#102027'
,fontSize:20,
fontWeight:'700'}
})
export default Register 