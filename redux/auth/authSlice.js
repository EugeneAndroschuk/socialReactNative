import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  name: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action) => (action.payload),
  },
});

export default authSlice;
export const { updateUser } = authSlice.actions;
