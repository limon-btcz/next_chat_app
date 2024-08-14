/*
// Title: Custom hook for auth token
// Description: Custom hook to check token in local storage
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/07/2024
*/

import { useEffect, useState } from "react";

export default function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const timeout_id = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeout_id);
  }, [value, delay])

  return debounceValue;
}
