import { View,Text, StyleSheet, Pressable, Image, Alert, TouchableHighlight, PixelRatio }from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState , useRef} from "react";
import appFirebase from "../firebase-config";
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'
import { useContext } from "react";
import { AuthContext } from "../authProvider";
import { Video, ResizeMode } from 'expo-av';

export default function Home(){
    const { token , uid} = useContext(AuthContext);
    const [est,setEst] = useState(false)
    const insets = useSafeAreaInsets();
    const [but,setBut]=useState("Iniciar")
    const ws = useRef(null);
    
      const connectWebSocket = async () => {        
        // Incluir el token en la URL del WebSocket
       
        ws.current = new WebSocket(`ws://10.0.3.2:8000/procesamiento?token=${token}`);  
        ws.current.onopen = () => {
          console.log('Conexión WebSocket abierta');
        };  
        ws.current.onmessage = (e) => {
          
          const mess = e.data
          console.log(mess);
        };  
        ws.current.onclose = (e) => {
          console.log('Conexión WebSocket cerrada');
        };  
        ws.current.onerror = (e) => {
          console.error('WebSocket error', e.message);
        };
        
      } 
const setestado = async () =>{
  setEst(!est)
  if(est) {
  await  connectWebSocket() 
    setBut("Detener") 
 
  }
  if(!est && ws.current && ws.current.readyState === WebSocket.OPEN){
   await ws.send("off")
   await ws.current.close();
   setBut("Iniciar") 
  
  
  }

}
const video = useRef(null);
const [status, setStatus] = useState({});
      

    return(
        <View style={{paddingBottom: insets.bottom, paddingTop: insets.top ,alignItems: 'center',
          justifyContent: 'center' }}>
            <Text>
                Iniciar detección
            </Text>          
              <TouchableHighlight
              underlayColor={"#09f"}
              onPress={setestado }
              style={styles.buton} >
                <Text style={{fontSize: 17, fontWeight:'400', backgroundColor: '#A569BD',}}>{but}</Text>
              </TouchableHighlight>
              <Video
            ref={video}
              style={styles.video}
              source={{
                uri: "rtsp://admin:forbidenmemoris4@192.168.18.65:554/Streaming/Channels/1",
              }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View  >
      <TouchableHighlight
         style={styles.buton}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        >
          <Text  >{status.isPlaying ? 'Pause' : 'Play'}</Text>
          </TouchableHighlight>
        </View>
          
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
    video:{
      width:'90%',
      height:'50%',
      resizeMode:'cover',
      backgroundColor: 'blue'
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
   
  })