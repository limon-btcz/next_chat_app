/*
// Title: Auth Slice
// Description: Auth states stored here.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/07/2024
*/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  user: undefined
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.user = action.payload; // only get the user object
      state.loggedIn = true;
    },
    userLogout: state => {
      state.user = undefined;
      state.loggedIn = false;
    }
  }
});

export const { userLogin, userLogout } = authSlice.actions;
export default authSlice.reducer;