import {initializeApp} from "firebase/app"
// Import the functions you need from the SDKs you need


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAxV11L0b_o1bbJclwBIZRtjywxoTm-9_Y",
  authDomain: "homesecurity-f0dd6.firebaseapp.com",
  projectId: "homesecurity-f0dd6",
  storageBucket: "homesecurity-f0dd6.appspot.com",
  messagingSenderId: "225800710622",
  appId: "1:225800710622:web:6a4653300c213847cd554f",
  measurementId: "G-CW4WDP8QSC"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase
