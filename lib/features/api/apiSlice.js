/*
// Title: App api slice
// Description: Application all api request handle by this slice.
// we use inject method and use this slice as helper.
// all api request will handled in update
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/10/2024
*/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_url } from "Config/Config";
import { userLogout } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: api_url,
  prepareHeaders: headers => {
    const token = localStorage.getItem("token");
    if(token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  }
});

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    try {
      const result = await baseQuery(args, api, extraOptions);
      if(result.meta.response.status === 401) {
        api.dispatch(userLogout());
        localStorage.clear();
      }
      return result;
    } catch (error) {
      // we will handle this if needed to handle the error 
    }
  },
  tagTypes: [],
  endpoints: builder => ({})
});

export default apiSlice;