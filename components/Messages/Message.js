/*
// Title: App single message
// Description: Single message component.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/10/2024
*/

export default function Message({ user_type, message, title }) {
  // we will check message user_id & auth user id for align.

  return (
    <li title={title} className={`flex ${user_type === "sender" ? "justify-end" : "justify-start"}`}>
      <div className="message_body">
        <span className="block">{message}</span>
      </div>
    </li>
  )
}
