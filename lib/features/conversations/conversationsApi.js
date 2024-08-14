/*
// Title: Conversation API
// Description: Conversation api request handled here.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/07/2024
*/

import { io } from "socket.io-client";
import apiSlice from "../api/apiSlice";
import messagesApi from "../messages/messagesApi";
import { api_base_url } from "Config/Config";

const conversationsApi = apiSlice.injectEndpoints({
  overrideExisting: module.hot?.status() === "apply",
  endpoints: builder => ({
    getConversations: builder.query({
      query: email =>
        `conversations?participants_like=${email}&_sort=created_at&_order=desc&_page=1&_limit=${process.env.NEXT_PUBLIC_CONVERSATIONS_PER_PAGE}`,
      transformResponse(apiResponse, meta) {
        const total = meta.response.headers.get("X-Total-Count");
        return {
          total,
          data: apiResponse
        }
      },
      onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved}) {
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
            socket.on("conversation", data => {
              updateCachedData(draft => {
                const conversation = draft.data.find(c => c.id == data.id);
                if(conversation?.id) {
                  conversation.last_message = data.last_message;
                  conversation.sent_at = data.sent_at;
                } else {
                  draft.data.push(data)
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
    getMoreConversations: builder.query({
      query: ({ email, page}) => 
        `conversations?participants_like=${email}&_sort=created_at&_order=desc&_page=${page}&_limit=${process.env.NEXT_PUBLIC_CONVERSATIONS_PER_PAGE}`,
      onQueryStarted({ email }, { queryFulfilled, dispatch }) {
        queryFulfilled.then(result => {
          if (result.meta.response.status === 200) {
            // update conversations cache pessimistically
            dispatch(apiSlice.util.updateQueryData(
                "getConversations", email,
                draft => {
                  const combinedData = [...draft.data, ...result.data];
                  const uniqueData = Array.from(new Set(combinedData.map(item => item.id)))
                    .map(id => combinedData.find(item => item.id === id));

                  return {
                    ...draft,
                    data: uniqueData
                  }
                }
              )
            )
          }
        }).catch(error => {
          console.log(error);
          // we will handle this later if needed...
        })
      }
    }),
    getConversation: builder.query({
      query: ({ userEmail, partnerEmail }) =>
        `conversations?participants_like=${userEmail}-${partnerEmail}&participants_like=${partnerEmail}-${userEmail}`,
    }),
    addConversation: builder.mutation({
      query: data => ({
        url: "conversations",
        method: "POST",
        body: data,
      }),
      onQueryStarted(arg, { queryFulfilled, dispatch }) {
        queryFulfilled.then(result => {
          if (result.meta.response.status === 201) {
            const users = arg.users;
            const sender = users.find((user) => user.email === arg.sender);
            const receiver = users.find((user) => user.email !== arg.sender);

            // update messages data to db
            dispatch(
              messagesApi.endpoints.addMessage.initiate({
                conversation_id: result.data.id,
                sender,
                receiver,
                message: arg.last_message,
                created_at: arg.sent_at,
              })
            )
          }
        })
        .catch(error => {
          console.log(error);
          // we will handle this later if needed...
        });
      },
    }),
    editConversation: builder.mutation({
      query: ({ id, data }) => ({
        url: `conversations/${id}`,
        method: "PUT",
        body: data,
      }),
      onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // handle request Promiss
        queryFulfilled.then(result => {
          if (result.meta.response.status === 200) {
            const users = arg.data.users;
            const sender = users.find(user => user.email === arg.data.sender);
            const receiver = users.find(user => user.email !== arg.data.sender);

            // update messages data to db
            dispatch(
              messagesApi.endpoints.addMessage.initiate({
                conversation_id: arg.id,
                sender,
                receiver,
                message: arg.data.last_message,
                created_at: arg.data.sent_at,
              })
            )
          }
        })
        .catch(error => {
          console.log(error);
          // we will handle this later if needed...
        });
      },
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetConversationQuery,
  useAddConversationMutation,
  useEditConversationMutation,
} = conversationsApi;
export default conversationsApi;
