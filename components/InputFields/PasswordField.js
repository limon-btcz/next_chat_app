/*
// Title: Password field component.
// Description: App password input field component.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 4/30/2024
*/

import { useState } from "react";
import { EyeCloseIcon, EyeOpenIcon } from "../utils/Icons";
import { AlertText } from "../utils/Alerts";

export default function PasswordField({ field, formData, formDataHandler, errors }) {
  const { name, label, placeholder, required } = field || {};
  const [show_password, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <label className="form_label">{label}</label>
      <input
        name={name}
        type={show_password ? "text" : "password"}
        value={formData?.[name] ?? ""}
        onChange={formDataHandler}
        required={required ?? true}
        placeholder={placeholder}
        className="form_input"
      />
      <span onClick={() => setShowPassword(prev => !prev)} className="absolute z-20 top-[33px] md:top-[31px] right-3 cursor-pointer">
        {show_password ? <EyeOpenIcon w={"w-[18px]"} h={"h-[18px]"} color={"text-black"} /> :
          <EyeCloseIcon w={"w-[18px]"} h={"h-[18px]"} color={"text-black"} />
        }
      </span>
      {
        errors?.[name] ? errors[name].map((e, i) => {
          return <AlertText key={i} type='error' message={e} />
        }) : null
      }
    </div>
  )
}
