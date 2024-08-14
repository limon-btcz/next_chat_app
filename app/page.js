/*
// Title: App home page
// Description: Application home page
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 4/30/2024
*/

import Blank from "@/components/Chat/Blank";
import Chat from "@/components/Chat/Chat";

// local variables
const blank_msg = "No messages selected! Select an user from left sidebar to view all messages";

export default function Page({ searchParams }) {
  const renderComponent = () => {
    if(searchParams.conversation) {
      const { conversation } = searchParams;
      return <Chat conversation_id={conversation} />
    }
    return <Blank message={blank_msg} />
  }

  return (
    <div className="col-span-9">
      {renderComponent()}
    </div>
  )
}