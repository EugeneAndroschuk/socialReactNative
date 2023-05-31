import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { updateUser, authStateChange } from "./authSlice";

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
      });
      const { displayName, uid } = auth.currentUser;
      dispatch(updateUser({ userId: uid, login: displayName }));
      console.log("dispatch in authSignUpUser");
    } catch (error) {
      throw error;
    }
    };
  
    export const authSignInUser =
      ({ email, password }) =>
      async (dispatch, getState) => {
        try {
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
        } catch (error) {
          throw error;
        }
    };
      
    export const authStateChangeUser = () =>
      async (dispatch, getState) => {
        await onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            dispatch(updateUser({ userId: user.uid, login: user.displayName }));
            dispatch(authStateChange(true));
            // ...
          } else {
            // User is signed out
            // ...
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
