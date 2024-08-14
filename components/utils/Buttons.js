/*
// Title: App common button
// Description: Application common buttons components.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/07/2024
*/

export function AuthSubmitButton({ title, disabled }) {
  return (
    <div>
      <button
        disabled={disabled}
        type="submit"
        className="auth_btn"
      >
        {title}
      </button>
    </div>
  )
}