import Paho from 'paho-mqtt'
import { View,Text, StyleSheet, Pressable, Image, Alert, TouchableHighlight, PixelRatio }from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {  useEffect} from "react";
export default function About(){
  const insets = useSafeAreaInsets();
  const clientId = `react_native_${Math.random().toString(16)}`
  const client = new Paho.Client(
    "broker.hivemq.com",
    8000,
    clientId 
); 
useEffect(()=>{

  client.connect({
    onSuccess: () =>{
      console.log("Connected!");
     
    },
    onFailure: () =>{
      console.log("Fallo!");
    }
})

return () => {
  client.disconnect();
};

},[])

const handlePublishOn = async () => { 
  
  const mensajeLed = new Paho.Message("1")
    mensajeLed.destinationName = '/swa/commands';
  client.send(mensajeLed)
  console.log(mensajeLed)

 
};
const handlePublishOff = async () => {
 
    
  const mensajeLed = new Paho.Message("0")
  mensajeLed.destinationName = '/swa/commands';
client.send(mensajeLed)
console.log(mensajeLed)


};

return(
<View style={{paddingBottom: insets.bottom, paddingTop: insets.top ,alignItems: 'center',
          justifyContent: 'center' }}>
<Text>
                Activacion de la Alarma
            </Text>          
              <TouchableHighlight
              underlayColor={"#09f"}
              onPress={handlePublishOn}
              style={styles.buton} >
                <Text style={{fontSize: 17, fontWeight:'400', backgroundColor: '#A569BD',}}>Encender</Text>
              </TouchableHighlight>
                   
              <TouchableHighlight
              underlayColor={"#09f"}
              onPress={handlePublishOff}
              style={styles.buton} >
                <Text style={{fontSize: 17, fontWeight:'400', backgroundColor: '#A569BD',}}>Apagar</Text>
              </TouchableHighlight>
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



/*
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

// Configurar cómo se manejan las notificaciones mientras la aplicación está en primer plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const About = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // Manejar notificaciones cuando la aplicación está en primer plano
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // Manejar la respuesta a la interacción del usuario con la notificación
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const activate = async(expoPushToken) =>{
    try{      
        
    const expo_push_token = expoPushToken
    const title = "Notificacion"
    const body = "Esto es una notificacion"
    const response = await fetch('http://192.168.18.7:8000/send_notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },        
        body: JSON.stringify({expo_push_token: expo_push_token,
            title:title ,
            body:body})
      })   
    const json = await response.json();  
    
      
      }
    catch(error){
      Alert.alert(error.message)
    }
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    }
    else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await activate(expoPushToken);
        }}
      />
    </View>
  );
}
export default About;
*/