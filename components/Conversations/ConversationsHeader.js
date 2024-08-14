/*
// Title: Conversation header
// Description: Conversation section header.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/10/2024
*/
'use client'
import { useState } from "react";
import { PenSquareIcon } from "../utils/Icons"
import { SendMessageModal } from "../utils/Modal"

export default function ConversationsHeader() {
  const [opened, setOpened] = useState(false);

  const controlModal = () => {
    setOpened(prev => !prev);
  }

  return (
    <div className="text-grey-500 h-[65px] p-4 border-b border-gray-300 flex md:justify-end justify-center items-center">
      <button
        className="flex justify-center items-center"
        type="button"
        onClick={controlModal}
      >
        <span className="mr-1 hidden sm:block">Send message</span>
        <PenSquareIcon />
      </button>
      {opened && <SendMessageModal control={controlModal} />}
    </div>
  )
}
