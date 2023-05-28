// import firebase from "firebase";
// import "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCWn2pCkIimj9q2XJxp7hlq3l5e8DG31GE",
  authDomain: "social-react-native-2d33b.firebaseapp.com",
  databaseURL: "https://social-react-native-2d33b.firebaseio.com",
  projectId: "social-react-native-2d33b",
  storageBucket: "social-react-native-2d33b.appspot.com",
  messagingSenderId: "sender-id",
  appId: "115638661091",
  measurementId: "G-measurement-id",
};

// Initialize Firebase
// export default firebase.initializeApp(firebaseConfig);


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
