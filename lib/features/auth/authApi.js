/*
// Title: Application Auth API
// Description: Auth API requests handled here.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/07/2024
*/

import apiSlice from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    registerOrLogin: builder.mutation({
      query: ({url, data}) => ({
        url,
        body: data,
        method: "POST",
      })
    })
  })
});

export const { useRegisterOrLoginMutation } = authApi;