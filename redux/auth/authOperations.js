// import db from "../../firebase/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { updateUser } from "./authSlice";

export const authSignUpUser =
  ({ email, password, name }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth().currentUser;
      await user.updateProfile({
        displayName: name,
      });
      dispatch(updateUser({ userId: user.uid, name: displayName }));
      console.log("user", user);
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
          // dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
          console.log("user", user);
        } catch (error) {
          throw error;
        }
      };

// export const authSignUpUser = createAsyncThunk(
//   "auth/authSignUpUser",
//   async ({ email, password }, thunkAPI) => {
//     try {
//       createUserWithEmailAndPassword(auth, email, password).then(
//         (userCredential) => {
//           // Signed in
//           const user = userCredential.user;
//           console.log(user);
//           return user;
//           // ...
//         }
//       );
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const authSignUpUser =
//   ({ email, password }) =>
//   async (dispatch, getState) => {
//     try {
//       const data = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       data.then((res) => console.log(res.user));
//     } catch (error) {
//       throw error;
//     }
//   };

// export const authSignUpUser = async ({ email, password }) => {
//   await createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user;
//       console.log(user);
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//     });
// };
