/*
// Title: App layout provider.
// Description: Application layout provide by this component
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/10/2024
*/

'use client'
import { Provider } from "react-redux"
import store from "lib/app/store"
import RenderLayout from "./RenderLayout"

export default function LayoutProvider({ children }) {
  return (
    <Provider store={store}>
      <RenderLayout>
        { children }
      </RenderLayout>
    </Provider>
  )
}