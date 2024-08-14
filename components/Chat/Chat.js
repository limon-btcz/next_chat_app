/*
// Title: App chat component.
// Description: chat child components render by this component.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/10/2024
*/

'use client'
import { useGetMessagesQuery } from "@/lib/features/messages/messagesApi";
import MessageForm from "../Form/MessageForm";
import ChatHeader from "../Header/ChatHeader";
import Messages from "../Messages/Messages";
import { useSelector } from "react-redux";
import Blank from "./Blank";

export default function Chat({ conversation_id }) {
  const { user: { email } = {} } = useSelector(state => state.auth) || { user: {} };
  const { data, isLoading, isError, error } = useGetMessagesQuery(conversation_id);
  const { total, data: messages } = data || {};

  const renderChatbody = () => {
    if(isLoading && !isError) {
      return (
        <Blank message={"loading..."}/>
      )
    } else if(!isLoading && isError) {
      return <Blank message={"Something went wront! Try again later."} />
    }
    if(messages && messages.length === 0) {
      return <Blank message={"Invalid request!"}/>
    }

    const { sender, receiver } = messages[0];
    const partnerInfo = sender.email === email ? receiver : sender;
    return (
      <>
        <ChatHeader partnerInfo={partnerInfo} />
        <Messages data={messages} total={total} conversation_id={conversation_id} />
        <MessageForm partnerInfo={partnerInfo} />
      </>
    )
  }

  return renderChatbody();
}
