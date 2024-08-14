/*
// Title: Render Layout client
// Description: This component help to render the layout on client
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/10/2024
*/

'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

// componets
import Navbar from "../Navbar/Navbar";
import AuthHeader from "../Header/AuthHeader";
import Conversations from "../Conversations/Conversations";
import { userLogin } from "@/lib/features/auth/authSlice";

// local variables
const auth_paths = ["/auth/login", "/auth/registration", "/auth/forgot_password", "/auth/reset_password", "/auth/verify"];

export default function RenderLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { loggedIn } = useSelector(state => state.auth) || {};

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if(token && auth_paths.includes(pathname)) {
      router.push("/");
    }

    if(!token && !auth_paths.includes(pathname)) {
      router.push("/auth/login");
    }

    if(token && user && !loggedIn) {
      dispatch(userLogin(user));
    }

    setIsLoading(false);
  }, [router, dispatch, pathname, loggedIn]);

  return !isLoading ? (
    !loggedIn && auth_paths.includes(pathname) ? (
      <div className="grid place-items-center h-screen bg-[#F9FAFB]">
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <AuthHeader />
            {children}
          </div>
        </div>
      </div>
    )
    :
    (
      loggedIn && <>
        <Navbar />
        <main className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 border border-grey-300 lg:mx-6">
            <Conversations />
            {children}
          </div>
        </main>
      </>
    )
  )
  :
  <div className="flex items-center justify-center h-screen">
    <p className="font-bold text-lg text-gray-700">loading... Please wait</p>
  </div>
}
