/*
// Title: App auth pages header
// Description: Auth page header.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 4/30/2024
*/

import { usePathname } from "next/navigation";
import { authPageTitle } from "../utils/Helper";

export default function AuthHeader() {
  const pathname = usePathname();

  return (
    <div>
      {/* logo */}
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {authPageTitle(pathname)}
      </h2>
    </div>
  )
}
