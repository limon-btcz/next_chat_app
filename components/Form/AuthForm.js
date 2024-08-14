/*
// Title: App auth form component.
// Description: Application auth form render from here.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/10/2024
*/

'use client'
import { usePathname, useRouter } from "next/navigation"
import RenderFields from "../InputFields/RenderFields";
import { useEffect, useState } from "react";
import { RenderAuthLink } from "../utils/Links";
import { authRequestPath, formFields } from "../utils/Helper";
import { AuthSubmitButton } from "../utils/Buttons";
import { useRegisterOrLoginMutation } from "@/lib/features/auth/authApi";
import { AlertBox } from "../utils/Alerts";
import { useDispatch } from "react-redux";
import { userLogin } from "@/lib/features/auth/authSlice";

export default function AuthForm() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const fields = ["text", "email", "password"];
  const [registerOrLogin, { isLoading, data, isSuccess, isError, error, reset }] = useRegisterOrLoginMutation();

  useEffect(() => {
    if(data && isSuccess) {
      setFormData({});
      setErrors({});
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch(userLogin(data.user));
      reset();
      if(pathname === "/auth/registration") {
        router.push("/auth/login");
      } else if(pathname === "/auth/login") {
        router.push("/");
      }
    }
  }, [data, isSuccess, isError]);

  const trimValue = (value) => {
    if(typeof value === "string") {
      return value.trim();
    }

    return value;
  }

  const formDataHandler = e => {
    if(fields.includes(e.target.type)) {
      setFormData({...formData, [e.target.name]: trimValue(e.target.value)});
    } else {
      console.log(`new event type found - ${e.target.type}`);
    }
  }

  const formDataValidation = data => {
    const err = {};
    formFields(pathname).forEach(field => {
      if (!(field.name in data) || data[field.name] === "") {
        err[field.name] = ["The field is required!"];
      }
    });

    if(pathname === "/auth/register") {
      if(!"password" in err && !"password_confirmation" in err && data.password !== data.password_confirmation) {
        err.password = ["The password confirmation does not match!"];
      }
    }

    if(Object.keys(err).length) {
      setErrors(err)
      return false
    }

    return true;
  }

  const formHandler = e => {
    e.preventDefault();

    if(formDataValidation(formData)) {
      const requestUrl = authRequestPath(pathname);
      if(requestUrl) {
        registerOrLogin({url: requestUrl, data: formData});
      } else {
        console.log("something went wrong when submit the form request!")
      }
    }
    // we not ready for form request. 
    // in next update we will complete this operation.
  }

  return (
    <form className="space-y-[18px]" onSubmit={formHandler}>
      <div className="rounded-md shadow-sm space-y-[17px]">
        <RenderFields fields={formFields(pathname)} formData={formData} formDataHandler={formDataHandler} errors={errors} />
      </div>
      <RenderAuthLink />
      <AuthSubmitButton title={pathname === "/auth/login" ? "Sign in" : "Submit"} disabled={isLoading} />
      { 
        isError ? 
          <AlertBox type={'error'} message={error.data} />
        : 
          null 
      }
    </form>
  )
}