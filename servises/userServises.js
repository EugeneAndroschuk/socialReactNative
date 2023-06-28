import { db, storage } from "../firebase/config";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { updateAvatar } from "../redux/auth/authSlice";

export async function createUserProfile(userId, login, email, url) {
  try {
    //uploading UserAvatar to Firebase
    if (url !== null) {
      const response = await fetch(url);
      const file = await response.blob();
      const uniqueAvatarId = Date.now().toString();
      const storageRef = ref(storage, `userAvatar/${uniqueAvatarId}`);
      await uploadBytes(storageRef, file);
      const avatarUrl = await getDownloadURL(
        ref(storage, `userAvatar/${uniqueAvatarId}`)
      );
      await setDoc(doc(db, "users", userId), {
        login,
        email,
        avatarUrl,
      });

      return avatarUrl;
    } else {
      await setDoc(doc(db, "users", userId), {
        login,
        email,
        avatarUrl: null,
      });

      return null;
    }
  } catch (err) {
    console.error("Error adding document: ", err);
    throw err;
  }
}

export async function updateUserProfile(userId, url) {
  try {
    let newAvatarUrl;
    //uploading UserAvatar to Firebase
    if (url) {
      const response = await fetch(url);
      const file = await response.blob();
      const uniqueAvatarId = Date.now().toString();
      const storageRef = ref(storage, `userAvatar/${uniqueAvatarId}`);
      await uploadBytes(storageRef, file);
      newAvatarUrl = await getDownloadURL(
        ref(storage, `userAvatar/${uniqueAvatarId}`)
      );
    } else newAvatarUrl = null;
      await updateDoc(doc(db, "users", userId), {
        avatarUrl: newAvatarUrl,
      });
    
      return newAvatarUrl;
  } catch (err) {
    console.error("Error adding document: ", err);
    throw err;
  }
}

export async function getUserAvatarUrl(userId) {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().avatarUrl;
  }
}

export async function onLoadUserAvatar() {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) return result.assets[0].uri;
};