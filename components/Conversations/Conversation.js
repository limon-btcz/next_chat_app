/*
// Title: App conversation
// Description: Application single conversation component.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/10/2024
*/

import Link from 'next/link'
import { RoundUserImage } from '../utils/Images'
import moment from 'moment';
import { conversationPartnerInfo, getPartnerAvatar,  } from '../utils/Helper';
import { useSelector } from 'react-redux';

export default function Conversation({ data }) {
  const { id, users, last_message, sent_at, sender } = data || {};
  const { user: { email } = {} } = useSelector(state => state.auth) || { user: {} };
  const { username: partnerName, email: partnerEmail } = conversationPartnerInfo(users, email);

  return (
    <li className="border-gray-300 border-b">
      <Link href={`/?conversation=${id}`} className="conversation_link">
        <RoundUserImage image={getPartnerAvatar(partnerEmail, 40)} />
        <div className="w-full pb-2 hidden md:block">
          <div className="flex justify-between">
            <span className="conversation_span">{partnerName}</span>
            <span className="conversation_span font-normal">{moment(sent_at).fromNow()}</span>
          </div>
          <span className="conversation_span font-normal">{email === sender ? `you: ${last_message}` : last_message}</span>
        </div>
        <div className="hidden sm:block md:hidden">
          <span className="conversation_span font-normal">{moment(sent_at).fromNow()}</span>
        </div>
      </Link>
    </li>
  )
}
