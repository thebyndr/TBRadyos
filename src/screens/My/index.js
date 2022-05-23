import React,{useEffect,useState} from 'react';
 import {View,Text,TextInput,TouchableOpacity,StyleSheet,FlatList,ScrollView} from 'react-native'
 import auth from '@react-native-firebase/auth'
 import Modal from 'react-native-modal'
 import { Formik } from 'formik';
 import * as Yup from 'yup'
 import database from '@react-native-firebase/database';
 import { inject,observer } from 'mobx-react';
 import Icon from 'react-native-vector-icons/Ionicons';
 import Header from '../../components/header2'
 import LinearGradient from 'react-native-linear-gradient';

const My=(props)=>{
// console.log(props)
const currentUser= auth().currentUser;
const [data,setData]=useState([
])
const [currentForm,setCurrentForm]=useState({
    key:'',
    name:'',
    url:'',
})


const logout =()=>{
auth().signOut().then((res)=>{
   
})
}

useEffect(()=>{
   
    database()
    .ref('/data2')
    .orderByChild('uid')
    .startAt(auth().currentUser.uid)
    .endAt(auth().currentUser.uid)
    .on('value', snapshot => {
        let newArray=[]
        snapshot.forEach((item)=>{
            let ItemObject=item.val();
            ItemObject['key']=item.key
           newArray.push(ItemObject)
          
        })
     setData(newArray)
    });
},[])

const [visible,setVisible]=useState(false)


const update=(values,{resetForm,setSubmitting})=>{

database()
.ref(`/data2/`)
.update({
    ...values
})
.then(()=>{
    alert('verirler güncellendi')
    setVisible(false)
    setSubmitting(false)
})
.catch((e)=>{
alert(e.message)
setSubmitting(false)

})

//     const reference=database()
//     .ref('/data')
// .push()


    // reference.set({
    //   name: values.name,
    //   url:values.url,
    //   uid:currentUser.uid
    // })
    // .then(() => {

    //     alert('Radyo Eklendi')
    //     resetForm({})
    //     setVisible(false)

    // })
    // .catch((e)=>{
    //     alert(e.message)
    //     setSubmitting(false)
    // })
}

const openModal=(item)=>{
setCurrentForm({
    key:item.key,
    name:item.name,
    url:item.url
})
setVisible(true)
}
const openStream=(item)=>{
    props.PlayerStore.savePlayer(item.url,item.name);
    database().ref('/data5'+'/'+currentUser.uid).update({
        RadioName:item.name
        
       
    })
    }
    
    const deleteRadio=(item)=>{
        
       
        database().ref('/data2'+'/'+item.key).remove()
        //  console.log(item.key)
         }
const renderItem=({item})=>{
   

  return item.name==""? <Text>Boş</Text>
 :
 <TouchableOpacity onPress={()=>openStream(item)}  style={style.itemContainer}>
 
 <TouchableOpacity onPress={()=>deleteRadio(item)} style={{position:'absolute',right:0,top:0}}>
 <Icon  name={Platform.OS === "ios" ? "ios-add" : "remove-circle-outline"}
  color={'red'}
  size={30}
  
      />
 </TouchableOpacity>
   <TouchableOpacity onPress={()=>openStream(item)} style={style.itemContainerin}>
 <Text style={style.item}>{item.name}</Text>
</TouchableOpacity>
    </TouchableOpacity>
    
 
   
}



    return(
        <LinearGradient style={{flex:1}} colors={['#4f9a94','black' ]}>
<ScrollView style={style.container}>
<Header/>
   <View style={style.itemTopCont}>
       <FlatList 
       data={data}
       renderItem={renderItem}
       numColumns={2}/>


   </View>
   <Modal isVisible={visible}>
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       
       <View style={{justifyContent:'center',alignItems:'center',width:250,backgroundColor:'white',height:250,borderRadius:25}}>
    
     <TouchableOpacity onPress={()=>setVisible(false)} style={{zIndex:999,position:'absolute',right:-25,top:-25,width:35,height:35,backgroundColor:'white',borderRadius:70,alignItems:'center',justifyContent:'center'}}>
<Text style={{fontSize:20,fontWeight:'700',color:'black'}}>X</Text>

     </TouchableOpacity>
     
     
     
       <Formik initialValues={{
      name:currentForm.name,
      url:currentForm.url
  }}
  
  onSubmit={update}
  
  validationSchema={
      Yup.object().shape({
     name:Yup.string().required('Radyo Adını Giriniz'),
     url:Yup.string().required('URL Adresini Giriniz')
        })
  }
  >
{({values,handleSubmit,errors,handleChange,isValid,isSubmitting})=>(

    <View style={style.forminput}>

        <View style={style.inputContainer}>
<TextInput 
value={values.name}
autoCapitalize='none'
placeholder='Radyo Adı '
placeholderTextColor={'white'}
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
placeholderTextColor={'white'}
onChangeText={handleChange('url')}
style={style.input}
/>
{(errors.url)&&<Text style={{fontFamily:'sans-serif-condensed',color:'red',fontSize:18}}>{errors.url}</Text>}
        </View>
        
     
<TouchableOpacity
style={style.kayitolbutton}
 onPress={handleSubmit}
 disabled={!isValid || isSubmitting}
>
    <Text style={style.kayitolbutton2}>Güncelle</Text>
</TouchableOpacity>


    </View>
)}

  </Formik>
       </View>
        
       </View>

   </Modal>
</ScrollView>
</LinearGradient>
    )
}
const style=StyleSheet.create({
    container:{
    
        flex:1
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#1b3a4b',
        alignItems:'center',
        padding:15
    },
    right:{
        flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'},
name:{
    color:'white',
    fontFamily:'serif',
  fontWeight:'700',
    fontSize:25
},
exitCont:{
marginLeft:5
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
    itemTopCont:{
paddingHorizontal:10,
marginTop:15

    }
    ,

itemContainer:{
    flex:1,
    borderRightWidth:8,
borderTopWidth:4,
    borderLeftColor:'white',
    borderRightColor:'white',
    borderLeftWidth:0,
    borderBottomWidth:0,
    borderBottomColor:'#01897b',
    borderTopColor:'white',
    marginBottom:15,
    marginHorizontal:10,
    paddingVertical:15,
    justifyContent:'center',
    alignItems:'center',
    height:120,
    borderRadius:15,
    backgroundColor:'#4ebaaa'
    },
itemContainerin:{
   
 
  
    justifyContent:'center',
    alignItems:'center',
 
  
    },
item:{
    color:'white',
    fontSize:20
    ,fontFamily:'sans-serif-medium'
},
//MODAL

input:{
    width:230,
    height:50, 
    borderRadius:15,
    backgroundColor:'#006466',
    color:'white',
    fontSize:15,
    fontWeight:'700'
},

forminput:
{
    alignItems:'center',
justifyContent:'center',
flex:1,
borderRadius:25,
width:'100%',
backgroundColor:'#1b3a4b'
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
    marginTop:25,
    height:43
},

kayitolbutton2:{
color:'#006466'
,fontSize:20,
fontWeight:'700'}

})
export default inject('PlayerStore')(observer(My))