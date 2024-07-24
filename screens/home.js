import { View,Text, StyleSheet,  TouchableHighlight}from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState , useRef, useEffect} from "react";

import { useContext } from "react";
import { AuthContext } from "../authProvider";

export default function Home(){

    const { token } = useContext(AuthContext);
    const [est,setEst] = useState(false)
    const [proceso,setProceso] = useState(false)
    const insets = useSafeAreaInsets();
    const [butc,setButc]=useState("Iniciar")
    const [butd,setButd]=useState("Iniciar")
    const ws = useRef(null); 
   const [mensaje,setMensaje]=useState(" ")
  
       // Incluir el token en la URL del WebSocket
       const connectWebSocket = async() =>{ 
        ws.current = new WebSocket(`ws://10.0.3.2:8000/procesamiento?token=${token}`);  
        ws.current.onopen = () => {
          console.log('Conexión WebSocket abierta');
        };  
        ws.current.onmessage = (e) => {
          
          const mess = e.data
          setMensaje(mess)
          console.log(mess)
          
          
        };  
        ws.current.onclose = (e) => {
          console.log('Conexión WebSocket cerrada');
        };  
        ws.current.onerror = (e) => {
          console.error('WebSocket error', e.message);
        };
      } 
       
  
const setConection = async () =>{
  setEst(!est)
  
  if(est) {
  await  connectWebSocket()    
  setButc("Detener")  
  await MqttConect()
  }
  if(!est && ws.current && ws.current.readyState === WebSocket.OPEN){   
  
   await ws.current.close();  
   setButc("Iniciar")   

  }
}


const setmensaje = async () =>{
 
  setProceso(!proceso)
  console.log(proceso)
  
  if(proceso && ws.current && ws.current.readyState === WebSocket.OPEN){
   await ws.current.send("on")
  setButd("Detener")

  }
  else if (!proceso && ws.current && ws.current.readyState === WebSocket.OPEN){
    await ws.current.send("off")
    setButd("Iniciar")
   
    }
  else if(!ws.current && ws.current.readyState !== WebSocket.OPEN){
    print("cliente desconectado")
  }
}

   return(
        <View style={{paddingBottom: insets.bottom, paddingTop: insets.top ,alignItems: 'center',
          justifyContent: 'center' }}>
            <Text>
                Conectar
            </Text>          
              <TouchableHighlight
              underlayColor={"#09f"}
              onPress={setConection }
              style={styles.buton} >
                <Text style={{fontSize: 17, fontWeight:'400', backgroundColor: '#A569BD',}}>{butc}</Text>
              </TouchableHighlight>
              <Text>
                Iniciar detección
            </Text>          
              <TouchableHighlight
              underlayColor={"#09f"}
              onPress={setmensaje }
              style={styles.buton} >
                <Text style={{fontSize: 17, fontWeight:'400', backgroundColor: '#A569BD',}}>{butd}</Text>
              </TouchableHighlight>
              <Text>
                {mensaje}
            </Text>  
           
             
 
          
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
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: 'white'
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