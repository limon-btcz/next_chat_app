/*
// Title: App store
// Description: This application state managed by redux.
// store will update in next update
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 4/30/2024
*/

import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "lib/features/api/apiSlice";
import authSlice from "lib/features/auth/authSlice";
// import conversationsSlice from "lib/features/conversations/conversationsSlice";
// import messagesSlice from "lib/features/messages/messagesSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    // conversations: conversationsSlice,
    // messages: messagesSlice
  },
  devTools: process.env.NEXT_PUBLIC_MODE !== "production",
  middleware: getDefaultMiddlewares => getDefaultMiddlewares().concat(apiSlice.middleware)
});

export default store;