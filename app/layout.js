/*
// Title: App root layout
// Description: Application layout will render from here.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 4/30/2024
*/

import LayoutProvider from "@/components/Layout/LayoutProvider";
import "./globals.css";

export const metadata = {
  title: `${process.env.NEXT_APP_NAME}`
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutProvider>
          {children}
        </LayoutProvider>
      </body>
    </html>
  )
}