
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
      /*const user = await signInWithEmailAndPassword(auth,email,password)       
      const idToken = user.user.getIdToken()   
      setToken(idToken)    */    
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
