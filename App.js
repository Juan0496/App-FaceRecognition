import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "react-native-gesture-handler"
import Navigation from './navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './screens/login';
import { firebaseConfig } from './firebase-config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { AuthContext, AuthProvider } from './authProvider';

export default function App() {
  return (
    <AuthProvider>
    <SafeAreaProvider>
    <Navigation/>
    </SafeAreaProvider>
    </AuthProvider>
  );
}

