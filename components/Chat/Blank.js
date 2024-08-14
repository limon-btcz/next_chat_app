/*
// Title: Conversation blank component
// Description: Conversation blank component
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/10/2024
*/

export default function Blank({ message }) {
  return (
    <div className="relative w-full overflow-y-hiddeen h-[calc(100vh_-_85px)] flex flex-col items-center justify-center text-gray-700 p-5 space-y-5">
      <div className="text-center">
        {message}
      </div>
    </div>
  )
}