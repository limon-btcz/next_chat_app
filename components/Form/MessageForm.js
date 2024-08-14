/*
// Title: Message input.
// Description: Message request will handle in this component.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/07/2024
*/

'use client'
import { useEffect, useState } from "react";
import { SendIcon } from "../utils/Icons";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { useEditConversationMutation } from "@/lib/features/conversations/conversationsApi";


export default function MessageForm({ partnerInfo }) {
  const [message, setMessage] = useState("");
  const conversation_id = useSearchParams().get("conversation");
  const { user: loggedInUser } = useSelector(state => state.auth) || {};
  const { email: loggedInUserEmail } = loggedInUser || {};
  const [editConversation, { isSuccess, isLoading }] = useEditConversationMutation();

  useEffect(() => {
    if(isSuccess) {
      setMessage("");
    }
  }, [isSuccess]);

  const formHandler = e => {
    e.preventDefault();
    const time_now = new Date().getTime();

    editConversation({
      id: parseFloat(conversation_id),
      data: {
        participants: `${loggedInUserEmail}-${partnerInfo.email}`,
        users: [loggedInUser, partnerInfo],
        last_message: message,
        sender: loggedInUserEmail,
        sent_at: time_now,
      }
    });
  }

  return (
    <div className="flex items-center w-full p-3 border-t border-gray-300">
      <form className="flex items-center w-full" onSubmit={formHandler}>
        <textarea
          type="text"
          placeholder="Message"
          rows={1}
          value={message ?? ""}
          onChange={e => setMessage(e.target.value)}
          className="appearance-none block w-full py-2 pl-4 mx-3 bg-gray-100 focus:ring focus:ring-sky-500 rounded-md outline-none focus:text-gray-700 resize-none"
          name="message"
          required
        >{message}</textarea>

        <div>
          <button type="submit" disabled={isLoading}>
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  )
}
