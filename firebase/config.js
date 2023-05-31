// import firebase from "firebase";
// import "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBX2a6T1pv7F4n_sv84KnDEytIXEhjYZsw",
  authDomain: "social-41e1f.firebaseapp.com",
  databaseURL: "https://social-41e1f.firebaseio.com",
  projectId: "social-41e1f",
  storageBucket: "social-41e1f.appspot.com",
  messagingSenderId: "sender-id",
  appId: "431100237283",
  measurementId: "G-measurement-id",
};

// Initialize Firebase
// export default firebase.initializeApp(firebaseConfig);


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);