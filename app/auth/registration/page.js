/*
// Title: Registration page
// Description: User registration page.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 4/30/2024
*/

import AuthForm from '@/components/Form/AuthForm'

export const metadata = {
  title: `${process.env.NEXT_APP_NAME} Registration`
}

export default function Registration() {
  return (
    <div>
      <AuthForm />
    </div>
  )
}
