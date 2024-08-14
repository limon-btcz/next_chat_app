/*
// Title: App navbar
// Description: Application navbar component
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/10/2024
*/

import Image from "next/image";
import Logo from "../../public/logo.png";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { userLogout } from "@/lib/features/auth/authSlice";
import { LogoutIcon } from "../utils/Icons";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.clear();
    dispatch(userLogout());
    router.push("/auth/login");
  }

  return (
    <nav className="border-general sticky top-0 z-40 border-b bg-sky-400 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="w-20 h-20 flex items-center">
            <Link href={"/"}>
              <Image width={80} height={80} src={Logo.src} className="w-auto" alt="" />
            </Link>
          </div>
          <div>
            <button 
              type="button"
              onClick={logoutHandler}
              className="text-white flex items-center"
            >
              <span className="mr-1">
                <LogoutIcon />
              </span>
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
