/*
// Title: Render form fields
// Description: App form fields render by this component.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 4/30/2024
*/

import { useEffect, useRef } from "react";
import PasswordField from "./PasswordField";
import { AlertText } from "../utils/Alerts";

export default function RenderFields({ fields, formData, formDataHandler, errors }) {
  const inputRef = useRef();

  useEffect(() => {
    const focusInputField = () => {
      if(inputRef.current) {
        inputRef.current.focus();
      }
    }

    focusInputField();
  }, []);

  const renderFields = fields => {
    return fields.map(field => {
      const { type, focus, label, name, placeholder, required } = field || {};
      switch(type) {
        case "text":
        case "email":
          return (
            <div key={name}>
              <label className="form_label">{label}</label>
              <input
                ref={focus ? inputRef : null}
                name={name}
                type={type}
                value={formData?.[name] ?? ""}
                onChange={formDataHandler}
                required={required ?? true}
                placeholder={placeholder}
                className="form_input"
              />
              {
                errors?.[name] ? errors[name].map((e, i) => {
                  return <AlertText key={i} type='error' message={e} />
                }) : null
              }
            </div>
          )
        case "password":
          return <PasswordField key={name} field={field} formData={formData} formDataHandler={formDataHandler} errors={errors} />
        case "textarea":
          return (
            <div key={name}>
              <label className="form_label">{label}</label>
              <textarea
                className={"form_textarea"}
                name={name}
                value={formData[name] ?? ""}
                onChange={formDataHandler}
                required={required ?? true}
                placeholder={placeholder}
              >{formData[name] ?? ""}</textarea>
              {errors?.[name] ? errors[name].map((e, i) => {
                return <AlertText key={i} type='error' message={e} />
              }) : null}
            </div>
          )
        default:
          console.log(`new form field type found - ${type}`);
      }
    })
  }

  return renderFields(fields);
}
