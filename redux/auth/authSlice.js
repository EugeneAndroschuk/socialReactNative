import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  login: null,
  email: null,
  avatarUrl: null,
  stateChange: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action) => ({
      ...state,
      userId: action.payload.userId,
      login: action.payload.login,
      email: action.payload.email,
      avatarUrl: action.payload.avatarUrl,
    }),
    updateAvatar: (state, action) => ({
      ...state,
      avatarUrl: action.payload.avatarUrl,
    }),
    authStateChange: (state, action) => ({
      ...state,
      stateChange: action.payload,
    }),
    signOutUser: (state, action) => ({
      userId: null,
      login: null,
      stateChange: false,
    }),
  },
});

export default authSlice;
export const { updateUser, authStateChange, signOutUser, updateAvatar } =
  authSlice.actions;
