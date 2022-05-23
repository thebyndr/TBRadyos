import React,{useEffect,useState} from 'react';
 import {View,Image,Text,TextInput,TouchableOpacity,StyleSheet,FlatList,ScrollView} from 'react-native'
 import auth from '@react-native-firebase/auth'
 import Modal from 'react-native-modal'
 import { Formik } from 'formik';
 import * as Yup from 'yup'
 import database from '@react-native-firebase/database';
 import { inject,observer } from 'mobx-react';
 import Header from '../../components/headerProfile'
 import LinearGradient from 'react-native-linear-gradient';

const Profile=(props)=>{

const currentUser= auth().currentUser;


const [visible,setVisible]=useState(false)


const update = (values,{setSubmitting,resetForm})=>{
currentUser.updateProfile({
    displayName:values.name
}).then(()=>{
    setSubmitting(false)
})

if(values.password!='' && values.password!=null){
currentUser.updatePassword(values.password).then(()=>{
resetForm({
    password:''
})
    setSubmitting(false)
}).catch((error)=>{
if(error.code==='auth/weak-password'){
alert('Şifre 5 Haneden Daha Büyük Olmalı')
setSubmitting(false)

}
if(error.code==='auth/requires-recent-login'){
    alert('Şifre Güncellenirken Hata Yaşandı.Lütfen Tekrar Deneyiniz.(Çıkış Yapıp Tekrar Giriş Yapabilirsiniz')
    setSubmitting(false)
}


})
}
    
currentUser.updateEmail(values.email).then((res)=>{
    setSubmitting(false)
}).catch((error)=>{

    if (error.code === 'auth/email-already-in-use') {
        alert('Daha önce kullanılmamış bir email giriniz')
        setSubmitting(false)
        }
    //mail geçerli değilse
        if (error.code === 'auth/invalid-email') {
         alert('Geçersiz Mail')
         setSubmitting(false)
        }
        if(error.code==='auth/requires-recent-login'){
            alert('Email Güncellenirken Hata Yaşandı.Lütfen Tekrar Deneyiniz.(Çıkış Yapıp Tekrar Giriş Yapabilirsiniz')
            setSubmitting(false)
        }
    
    })

}
const [lang,setLang]=useState('tr')
database()
.ref('/data3'+'/'+currentUser.uid)
.on('value',snapshot => {

    setLang(snapshot.val().lang)

})

    return(
        <LinearGradient style={{flex:1}} colors={['#4f9a94','black' ]}>

<ScrollView style={style.container}>
<Header/>
<View style={{width:200,height:200,alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
<Image source={require('../../../assets/TBRadyosLOGO.png')}
                resizeMode="center"
                style={{width:150,borderRadius:25}}
              
              />
</View>

   <View style={style.itemTopCont}>
     
   <Formik initialValues={{
      email:currentUser.email,
      password:currentUser.password,
   
      
  }}
  
  onSubmit={update}
  
  validationSchema={
      Yup.object().shape({
     email:Yup.string().email('Geçersiz Mail').required('Mailinizi Giriniz'),
    name:Yup.string().required('Adınızı Giriniz'),
    })
  }
  >
{({values,handleSubmit,errors,handleChange,isValid,isSubmitting})=>(

    <View style={style.forminput}>
 

    
        <View style={style.inputContainer}>
<TextInput 
value={values.email}
autoCapitalize='none'
placeholder={lang=="tr"?'Email Adresiniz':"Email Address"}
placeholderTextColor={'white'}
onChangeText={handleChange('email')}
keyboardType='number-pad'
style={style.input}
/>
{(errors.email)&&<Text style={{color:'red',fontSize:18,fontFamily:'sans-serif-condensed'}}>{errors.email}</Text>}
        </View>

        <View style={style.inputContainer}>
<TextInput

value={values.password}
autoCapitalize='none'
placeholder={lang=="tr"?'Şifre':'Password'}
placeholderTextColor={'white'}
onChangeText={handleChange('password')}
keyboardType='number-pad'
style={style.input}
/>
{(errors.password)&&<Text style={{fontFamily:'sans-serif-condensed',color:'red',fontSize:18}}>{errors.password}</Text>}
        </View>
        
     
<TouchableOpacity
style={style.kayitolbutton}
 onPress={handleSubmit}
 
>
    <Text style={style.kayitolbutton2}>{lang=="tr"?"Güncelle":"Update"}</Text>
</TouchableOpacity>
       

    </View>
)}

  </Formik>


   </View>
 
</ScrollView>
</LinearGradient>
    )
}
const style=StyleSheet.create({
    container:{
        
        flex:1
        
    },
  



    itemTopCont:{
paddingHorizontal:10,
alignItems:'center',
justifyContent:'center',
flex:1,
marginTop:60
    },
    
itemContainer:{
flex:1,
borderWidth:1,
borderColor:'white',
marginBottom:15,
marginHorizontal:10,
paddingVertical:15,
justifyContent:'center',
alignItems:'center',
minHeight:100,
borderRadius:15,
backgroundColor:'#006466'
},
item:{
    color:'white',
    fontSize:20
    ,fontFamily:'sans-serif-light'
},
//MODAL

input:{
    width:230,
    height:50, 
    borderRadius:10,
    backgroundColor:'#00897b',
    color:'white',
    fontSize:15,
    borderWidth:2,
borderColor:'white'
  
},
forminput:
{
    alignItems:'center',
justifyContent:'center',
flex:1,
borderRadius:25,
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
    backgroundColor:'#005549',
    borderRadius:7,
    width:100,
    marginTop:25,
    height:50,
    borderWidth:2,
    borderColor:'white'
},

kayitolbutton2:{
color:'white'
,fontSize:20,
fontWeight:'500'}

})
export default inject('PlayerStore')(observer(Profile))