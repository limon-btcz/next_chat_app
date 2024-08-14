/*
// Title: User API
// Description: User api request handled here.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/07/2024
*/

import apiSlice from "../api/apiSlice";

const usersApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: email => `users?email=${email}`
    })
  })
});

export const { useGetUserQuery } = usersApi;