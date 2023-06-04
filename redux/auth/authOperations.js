import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { updateUser, authStateChange } from "./authSlice";
import { db, storage } from "../../firebase/config";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  createUserProfile,
  getUserAvatarUrl,
} from "../../servises/userServises";

// async function createUserProfile(userId, login, email, url) {
//   try {
//     //uploading UserAvatar to Firebase
//     if (url !== null) {
//       const response = await fetch(url);
//       const file = await response.blob();
//       const uniqueAvatarId = Date.now().toString();
//       const storageRef = ref(storage, `userAvatar/${uniqueAvatarId}`);
//       await uploadBytes(storageRef, file);
//       const avatarUrl = await getDownloadURL(
//         ref(storage, `userAvatar/${uniqueAvatarId}`)
//       );
//       await setDoc(doc(db, "users", userId), {
//         login,
//         email,
//         avatarUrl,
//       });

//       return avatarUrl;
//     } else {
//       await setDoc(doc(db, "users", userId), {
//         login,
//         email,
//         avatarUrl: null,
//       });

//       return null;
//     }
    
//   } catch (err) {
//     console.error("Error adding document: ", err);
//     throw err;
//   }
// }

// async function getUserAvatarUrl(userId) {
//   const docRef = doc(db, "users", userId);
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     return docSnap.data().avatarUrl;
//   } 
// }

export const authSignUpUser =
  ({ email, password, login }, userAvatar) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
      });
      const { displayName, uid } = auth.currentUser;
      const avatarUrl = await createUserProfile(
        uid,
        displayName,
        email,
        userAvatar
      );
      dispatch(
        updateUser({
          userId: uid,
          login: displayName,
          email: email,
          avatarUrl: avatarUrl,
        })
      );
    } catch (error) {
      throw error;
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      getUserAvatarUrl(user.uid).then(res => {
        dispatch(updateUser({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          avatarUrl: res,
        })
      );
      dispatch(authStateChange(true));});
    }
  });
};

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};
