/*
// Title: App round images
// Description: Application image components.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/10/2024
*/

import Image from "next/image";
import EmptyUser from "../../public/empty_user_avatar.png";

export function RoundUserImage({ image }) {
  return (
    <div className="round_image_container">
      <Image width={40} height={40} className="round_image" src={image ?? EmptyUser.src} alt="" />
    </div>
  )
}