import React,{useEffect,useState} from 'react';
 import {View,Text,TextInput,Image,TouchableOpacity,StyleSheet,FlatList,ScrollView} from 'react-native'
 import auth from '@react-native-firebase/auth'
 import Modal from 'react-native-modal'
 import { Formik } from 'formik';
 import * as Yup from 'yup'
 import database from '@react-native-firebase/database';
 import { inject,observer } from 'mobx-react';
 import Header from '../../components/header'
 import LinearGradient from 'react-native-linear-gradient';
 import Icon from 'react-native-vector-icons/Ionicons';

const Home=(props)=>{
    

    const arrayRadio = [
        {name:"Alem FM",
           url:"http://turkmedya.radyotvonline.com/turkmedya/alemfm.stream/playlist.m3u8"
          },
          {name:"Kral FM",
          url:"https://ssldyg.radyotvonline.com/smil/smil:kralfm.smil/playlist.m3u8"
          },
          {name:"Joy Türk",
          url:"https://playerservices.streamtheworld.com/api/livestream-redirect/JOY_TURK2.mp3"
          },
          {name:"İstanbul FM",
          url:"http://45.32.154.169:9300"
          },
          {name:"PowerTürk",
          url:"http://mpegpowerturk.listenpowerapp.com/powerturk/mpeg/icecast.audio"
          },
          {name:"SlowTürk",
          url:"https://radyo.duhnet.tv/slowturk"
          },
          {name:"FenomenTürk",
          url:"http://fenomen.listenfenomen.com/fenomenturk/256/icecast.audio"
          },
          {name:"Ankara Havası",
          url:"http://37.247.98.8/stream/30/"
          },
          {name:"90'lar",
          url:"http://37.247.98.8/stream/166/"
          },
          
                  
                 ]
                
                   
                    
               
AutoRadios=()=>{
    const reference=database()
    .ref('/data')
    .push()
    
  
    
    arrayRadio.map((value)=>{
      
        reference.set({
          name:value.name,
          url: value.url,
          uid:auth().currentUser.uid
        })
    })
}


const currentUser= auth().currentUser;
const [data,setData]=useState([

])

const [lang2,setLang2]=useState()


// useEffect(()=>{
   
//     database()
//     .ref('/data')
//     .on('value', snapshot => {
//         let newArray=[]
//         snapshot.forEach((item)=>{
//            newArray.push(item.val())
//         })
//      setData(newArray)
//     });
// },[])
const [visible,setVisible]=useState()
useEffect(()=>{
    
    database()
    .ref('/data3'+'/'+currentUser.uid)
    .on('value',snapshot => {
    
    
setLang2(snapshot.val().lang)
      console.log('adas')    
    
        snapshot.val().lang=="tr"
   ?
    database()
    .ref('/data')
    .orderByChild('uid')
    .startAt("tr")
    .endAt("tr")
    .on('value', snapshot => {
        let newArray=[]
     
        snapshot.forEach((item)=>{
            let ItemObject=item.val();
            ItemObject['key']=item.key
           newArray.push(ItemObject)
        //    console.log(ItemObject)
        })
     setData(newArray)
     
    })
    :
    database()
    .ref('/data')
    .orderByChild('uid')
    .startAt("en")
    .endAt("en")
    .on('value', snapshot => {
        let newArray=[]
     
        snapshot.forEach((item)=>{
            let ItemObject=item.val();
            ItemObject['key']=item.key
           newArray.push(ItemObject)
        //    console.log(ItemObject)
        })
     setData(newArray)
     
    })
});
},[])



const openStream=(item)=>{
props.PlayerStore.savePlayer(item.url,item.name);
database().ref('/data5'+'/'+currentUser.uid).update({
    RadioName:item.name
    
   
})
}

const heart=(item)=>{
    item.heart==0
    ?

    database()
  .ref('/data'+'/'+item.key)
  .update({
    heart:1
  })
  .then(() => console.log('Data updated.'))
  :
  database()
  .ref('/data'+'/'+item.key)
  .update({
    heart:0
  })
  .then(() => console.log('Data updated.'))

}
const radyolarimaEkle=(item)=>{
    database()
    .ref('/data2')
    .on('value',snapshot => {
console.log(snapshot.val())
    })

// database().ref('/data'+'/').child('value',snapshot=>{
    
   
//    console.log(snapshot.val())
// })



    database()
            .ref('/data2'+"/"+currentUser.uid+item.key)
        .update({
            name: item.name,
            url:item.url,
            uid:currentUser.uid,
        })
        
        
           
           
            
          
            .then(() => {
        lang2=="tr"?
              setVisible(true)
        :
        setVisible(true)
            })
            .catch((e)=>{
                alert(e.message)
                
            })
}

const renderItem=({item})=>{
    return <TouchableOpacity onPress={()=>openStream(item)}  style={style.itemContainer}>
 

     <TouchableOpacity onPress={()=>{radyolarimaEkle(item),heart(item)}} style={{position:'absolute',right:0,top:0}}>

     <Icon  name={Platform.OS === "ios" ? "ios-add" : "heart-circle-outline"}
     color={'#FF1B1C'}
     size={35}
     
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
        <View style={{alignSelf:'center',width:250,height:330,borderRadius:40,justifyContent:'center',alignItems:'center',backgroundColor:'green'}}>
<Text style={{color:'white',fontSize:15}}>{lang2=="tr"?"RADYOLARIMA EKLENDİ":"ADDED TO MY RADIOS"}</Text>

        <TouchableOpacity onPress={()=>setVisible(false)}>
        <Icon  name={Platform.OS === "ios" ? "ios-add" : "checkmark-done-outline"}
     color={'white'}
     size={95}
     
         /></TouchableOpacity>
<TouchableOpacity onPress={()=>setVisible(false)}>
    <Text style={{color:'white',fontFamily:'serif',fontWeight:'700'}}>{lang2=="tr"?"TAMAM":"OK"}</Text>
</TouchableOpacity>
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
borderLeftColor:'#4ebaaa',
borderRightColor:'white',
borderLeftWidth:0,
borderBottomWidth:0,
borderBottomColor:'white',
borderTopColor:'white',
marginBottom:15,
marginHorizontal:10,
paddingVertical:15,
justifyContent:'center',
alignItems:'center',
height:120,
borderRadius:15,
backgroundColor:'#00897b'
},
itemContainerin:{
   
 
  
    justifyContent:'center',
    alignItems:'center',
 
  
    },
item:{
    color:'white',
    fontSize:17
    ,fontFamily:'serif'
},
//MODAL

input:{
    width:230,
    height:50, 
    borderRadius:15,
    backgroundColor:'#006466'
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
export default inject('PlayerStore')(observer(Home))