/*
// Title: Application messages API
// Description: All messages API request handled here
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/07/2024
*/

import { api_base_url } from "Config/Config";
import apiSlice from "../api/apiSlice";
import { io } from "socket.io-client";

const messagesApi = apiSlice.injectEndpoints({
  overrideExisting: module.hot?.status() === "apply",
  endpoints: builder => ({
    getMessages: builder.query({
      query: id => `messages?conversation_id=${id}&_sort=created_at&_order=desc&_page=1&_limit=${process.env.NEXT_PUBLIC_MESSAGES_PER_PAGE}`,
      transformResponse(apiResponse, meta) {
        const total = meta.response.headers.get("X-Total-Count");
        return {
          total,
          data: apiResponse
        }
      },
      onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        const socket = io(api_base_url, {
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttemps: 10,
          transports: ["websocket"],
          agent: false,
          upgrade: false,
          rejectUnauthorized: false
        });

        cacheDataLoaded.then(result => {
          if(result.meta.response.status === 200) {
            socket.on("message", data => {
              updateCachedData(draft => {
                if(Number(draft.data[0]?.conversation_id) === data.conversation_id) {
                  return {
                    ...draft,
                    data: [...draft.data, data]
                  }
                }
              })
            })
          }
        }).catch(error => {
          console.log(error);
          // we will handle this later if needed to handle.
        });

        cacheEntryRemoved.then(() => {
          if(socket) socket.close();
        }).catch(error => {
          console.log(error);
          // we will handle this later if needed to handle.
        });
      }
    }),
    getMoreMessages: builder.query({
      query: ({ id, page }) => `messages?conversation_id=${id}&_sort=created_at&_order=desc&_page=${page}&_limit=${process.env.NEXT_PUBLIC_MESSAGES_PER_PAGE}`,
      onQueryStarted({ id }, { queryFulfilled, dispatch }) {
        queryFulfilled.then(result => {
          if(result.meta.response.status === 200) {
            dispatch(apiSlice.util.updateQueryData(
                "getMessages", id,
                draft => {
                  return {
                    ...draft,
                    data: [...draft.data, ...result.data]
                  }
                }
              )
            )
          }
        })
      }
    }),
    addMessage: builder.mutation({
      query: data => ({
        url: "messages",
        method: "POST",
        body: data
      })
    })
  })
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
export default messagesApi;