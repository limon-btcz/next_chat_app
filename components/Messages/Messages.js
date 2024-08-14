/*
// Title: Messages parent component.
// Description: message component render by this.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/07/2024
*/

import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import moment from "moment";
import { useEffect, useState } from "react";
import messagesApi from "@/lib/features/messages/messagesApi";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Messages({ data, total, conversation_id }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { user: { email } = {} } = useSelector(state => state.auth) || { user: {} };

  // call the getMoreCoversations on page change
  useEffect(() => {
    if(page > 1) {
      dispatch(messagesApi.endpoints.getMoreMessages.initiate({ id: conversation_id, page}));
    }
  }, [page, conversation_id])

  // check has_more data
  useEffect(() => {
    if(total > 0) {
      const has_more_data = Math.ceil(total / Number(process.env.NEXT_PUBLIC_MESSAGES_PER_PAGE)) > page;
      setHasMore(has_more_data);
    }
  }, [total, page])


  const renderMessages = () => {
    return data.slice().sort((a, b) => a.created_at - b.created_at).map(conversation => {
      const { id, message, sender, created_at } = conversation || {};
      const user_type = sender.email !== email ? "receiver" : "sender";
      return <Message key={id} user_type={user_type} message={message} title={moment(created_at).fromNow()} />
    })
  }

  return (
    <div id="scrollableDiv" className="w-full h-[calc(100vh_-_213px)] p-6 flex flex-col-reverse overflow-y-auto">
      <InfiniteScroll
        dataLength={data.length}
        hasMore={hasMore}
        inverse={true}
        scrollableTarget="scrollableDiv"
        next={() => setPage(prev => prev + 1)}
      >
        {hasMore && <h4 className="text-center">Loading...</h4>}
        <ul className="space-y-2">
          {renderMessages()}
        </ul>
      </InfiniteScroll>
    </div>
  )
}
