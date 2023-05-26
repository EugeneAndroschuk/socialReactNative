// import firebase from "firebase";
// import "firebase/auth";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCkqV0oSHSgte7A9WcbZe72ok-OEPZdVp0",
  authDomain: "react-native-social-b5b53.firebaseapp.com",
  databaseURL: "https://react-native-social-b5b53.firebaseio.com",
  projectId: "react-native-social-b5b53",
  storageBucket: "react-native-social-b5b53.appspot.com",
  messagingSenderId: "sender-id",
  appId: "355585596679",
  measurementId: "G-measurement-id",
};

// Initialize Firebase
// export default firebase.initializeApp(firebaseConfig);


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
