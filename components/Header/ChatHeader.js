/*
// Title: App chat component header.
// Description: Application chat component header.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/10/2024
*/

import { getPartnerAvatar } from '../utils/Helper';
import { RoundUserImage } from '../utils/Images'

export default function ChatHeader({ partnerInfo }) {
  const { email, username } = partnerInfo || {};

  return (
    <div className="flex h-[65px] items-center p-3 border-b border-gray-300">
      <RoundUserImage image={getPartnerAvatar(email, 40)} />
      <span className="conversation_span font-bold">{username}</span>
    </div>
  )
}