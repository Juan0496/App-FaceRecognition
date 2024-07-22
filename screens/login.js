import { View,Text, StyleSheet, Pressable, Image, Alert, TouchableHighlight } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import appFirebase from "../firebase-config";
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'
import React from "react";
import { ScrollView } from "react-native";
import {BlurView} from 'expo-blur'
import {useNavigation} from '@react-navigation/native'
import 'firebase/firestore'
import { useContext } from "react";
import { AuthContext } from "../authProvider";
export default function Login(props){
  const { setToken , setUid} = useContext(AuthContext);
  const navigation = useNavigation();
  const [email, setEmail]= React.useState('')
  const [password, setPassword]= React.useState('')
  
  const auth =  getAuth(appFirebase)

  const handleSignIn = async() =>{
    try{      
      /*const user = await signInWithEmailAndPassword(auth,email,password)       
      const idToken = user.user.getIdToken()   
      setToken(idToken)    */    
    const response = await fetch('http://0.0.0.0:8000/sigin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:email,password:password})
      })   
    const json = await response.json();  
    const token  = json.status[0]
    const uid  = json.uid[0]
    setToken(token) 
    setUid(uid)
    
    props.navigation.navigate('TabGroup')
      
      }
    catch(error){
      Alert.alert(error.message)
    }
  }
    const insets = useSafeAreaInsets();
    return(
      <View style={[styles.container, {paddingBottom: insets.bottom, paddingTop: insets.top }]}>
        <Image source={{}} style={[styles.image, StyleSheet.absoluteFill]}/>
        <ScrollView
          contentContainerStyle={{
            flex:1,
            width:'100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        > 
          <BlurView intensity={90}>
            <View style={styles.login}>
              <Text> Hola! </Text>
              <Text style={{fontSize: 17, fontWeight:'400', backgroundColor: '#A569BD',}}>
               Usuario</Text>
              <TextInput
                  onChangeText={(text)=>setEmail(text)}
                  placeholder = "alguien.example@mimail.com"
                  style={styles.cuenta} />
                  <Text style={{fontSize: 17, fontWeight:'400', backgroundColor: '#A569BD',}}>
                Contraseña</Text>
              <TextInput
                  onChangeText={(text)=>setPassword(text)}
                  placeholder = "micontraseña01"
                  style={styles.cuenta} 
                  secureTextEntry={true}/>   
              <TouchableHighlight
              underlayColor={"#09f"}
              onPress={handleSignIn}
              style={styles.buton} >
                <Text style={{fontSize: 17, fontWeight:'400', backgroundColor: '#A569BD',}}>Ingresar</Text>
              </TouchableHighlight>
            </View>
          </BlurView>
        </ScrollView>
        
      </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      borderBlockStartColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    
    },
    image:{
      width:'100%',
      height:'100%',
      resizeMode:'cover',
    },
    login:{
      width: 350,
      height: 500,
      borderColor: '#F08080',
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
      
    },
    cuenta: {
      width:250,
      height:40,
      borderBlockColor: "#F08080",
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
      backgroundColor: '#A569BD',
      marginBottom: 20     
    },
    buton:{
      width: 250,
      height:40,
      borderRadius: 10,
      backgroundColor: '#A569BD',
      alignItems:'center',
      justifyContent: 'center',
      marginVertical:10,
    }
   
  });