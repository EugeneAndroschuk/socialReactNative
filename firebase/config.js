// import firebase from "firebase";
// import "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD3U1pthrKMdUVdnuu1mcUMwRW-qvJLTJU",
  authDomain: "social-rn-25894.firebaseapp.com",
  databaseURL: "https://social-rn-25894.firebaseio.com",
  projectId: "social-rn-25894",
  storageBucket: "social-rn-25894.appspot.com",
  messagingSenderId: "sender-id",
  appId: "240839655940",
  measurementId: "G-measurement-id",
};

// Initialize Firebase
// export default firebase.initializeApp(firebaseConfig);


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);