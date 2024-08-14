/*
// Title: Application components loader
// Description: Loader components
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/10/2024
*/

export function ConversationLoading() {
  return (
    <li className="animate-pulse my-2 last:mb-0 px-2">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        <div className="flex-1 space-y-2 py-1 ml-2">
          <div className="h-2 bg-gray-200 rounded w-2/4"></div>
          <div className="h-2 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </li>
  )
}