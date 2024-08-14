/*
// Title: App links component
// Description: Application have many links. this components render links as our needs.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/07/2024
*/

import Link from "next/link";
import { usePathname } from "next/navigation";

// text link helper component
function AuthLinkContainer({ link, title }) {
  return (
    <div className="text-sm">
      <Link
        href={ link }
        className="form_link"
      >
        {title}
      </Link>
    </div>
  )
}

export function RenderAuthLink() {
  const pathname = usePathname();
  const link = pathname === "/auth/login" ? "/auth/forgot_password" : "/auth/login";
  const link_title = pathname === "/auth/login" ? "Forgot your password?" : "Already have an account!";

  const renderLink = (path) => {
    switch(path) {
      case "/auth/login":
      case "/auth/registration":
        return (
          <div className={`flex items-center ${pathname === "/auth/login" ? "justify-between" : "justify-end"}`}>
            {pathname === "/auth/login" ? <AuthLinkContainer link={"/auth/registration"} title={"If haven't any account!"} /> : null}
            <AuthLinkContainer link={link} title={link_title} />
          </div>
        );
      // case "/auth/forgot_password":
      //   return (
      //     <div className="flex items-center justify-end">
      //       <div className="text-sm">
      //         <button
      //           type="button"
      //           onClick={back}
      //           className="form_link"
      //         >
      //           Cancel
      //         </button>
      //       </div>
      //     </div>
      //   );
      default:
        console.log(`new auth link route found! - ${path}`);
        return null
    }
  }

  return renderLink(pathname);
}