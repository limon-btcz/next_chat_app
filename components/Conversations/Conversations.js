/*
// Title: App coversations list
// Description: Application coversatins list component.
// single conversation render by this.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/07/2024
*/

'use client'
import { useDispatch, useSelector } from 'react-redux';
import { ConversationLoading } from '../utils/Loading';
import Conversation from './Conversation'
import ConversationsHeader from './ConversationsHeader'
import conversationsApi, { useGetConversationsQuery } from '@/lib/features/conversations/conversationsApi';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Conversations() {
  const dispatch = useDispatch();
  const { user: { email } = {} } = useSelector(state => state.auth) || { user: {} };
  const { data, isLoading, isError, error } = useGetConversationsQuery(email);
  const { total, data: conversations } = data || {};
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // call the getMoreCoversations
  useEffect(() => {
    if(page > 1) {
      dispatch(conversationsApi.endpoints.getMoreConversations.initiate({ email, page }));
    }
  }, [page, email])

  // check has_more data
  useEffect(() => {
    if(total > 0) {
      const has_more_data = Math.ceil(total / Number(process.env.NEXT_PUBLIC_CONVERSATIONS_PER_PAGE)) > page;
      setHasMore(has_more_data);
    }
  }, [total, page])

  const renderConversation = () => {
    if(isLoading && !isError) {
      return (
        <>
          <ConversationLoading />
          <ConversationLoading />
        </>
      )
    } else if(!isLoading && isError) {
      return <li className="px-2 py-4">Something went wront! Try again later.</li>
    }
    if(conversations && conversations.length === 0) {
      return <li className="px-2 py-4">No conversation is available.</li>
    }
    return (
      <InfiniteScroll
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        height={window.innerHeight - 148}
        dataLength={conversations.length}
        next={() => setPage(prev => prev + 1)}
      >
        {conversations.map(conversation => {
            return <Conversation key={conversation.id} data={conversation} />
          })
        }
      </InfiniteScroll>
    )
  }

  return (
    <div className="col-span-3 border-r border-gray-300">
      <ConversationsHeader />
      <ul className="overflow-auto h-[calc(100vh_-_148px)]">
        {renderConversation()}
      </ul>
    </div>
  )
}
