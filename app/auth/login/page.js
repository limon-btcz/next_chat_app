/*
// Title: Login page
// Description: User login page.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 4/30/2024
*/

import AuthForm from '@/components/Form/AuthForm'

export const metadata = {
  title: `${process.env.NEXT_APP_NAME} Login`
}

export default function Login() {
  return (
    <div>
      <AuthForm />
    </div>
  )
}
