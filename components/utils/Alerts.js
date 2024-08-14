/*
// Title: App alerts
// Description: Application all alert components defined here.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/07/2024
*/

export function AlertText({ type, message }) {
  const textColor = () => {
    if(type === "error") {
      return "text-red-400"
    } else {
      return "text-green-400"
    }
  }
  return (
    <p className={`text-sm font-semibold rounded text-red ${textColor()}`}>
      {message}
    </p>
  )
}

export function AlertBox({ type, message }) {
  const bgColor = () => {
    if(type === "error") {
      return "bg-red-400"
    } else {
      return "bg-green-400"
    }
  }

  return (
    <div className={`px-4 py-2 rounded shadow-lg text-white ${bgColor()}`}>
      <p>
        {message}
      </p>
    </div>
  )
}