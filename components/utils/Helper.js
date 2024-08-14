/*
// Title: App helper functions
// Description: Application all helper functions assigned here.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/10/2024
*/

import gravatarUrl from "gravatar-url"

export const formFields = (path) => {
  if(path === "/auth/login") {
    return [
      {
        type : "email",
        name : "email",
        label : "email",
        placeholder: "your email",
        required : true
      },
      {
        type : "password",
        name : "password",
        label : "password",
        placeholder: "your password",
        required : true
      },
    ]
  } else if(path === "/auth/registration") {
    return [
      {
        type : "text",
        name : "username",
        label : "username",
        placeholder: "username",
        required : true
      },
      {
        type : "email",
        name : "email",
        label : "email",
        placeholder: "your email",
        required : true
      },
      {
        type : "password",
        name : "password",
        label : "password",
        placeholder: "type password",
        required : true
      },
      // {
      //   type : "password",
      //   name : "password_confirmation",
      //   label : "confirm password",
      //   placeholder: "confirm password",
      //   required : true
      // },
    ]
  } else if(path === "/auth/forgot_password") {
    return [
      {
        type : "text",
        name : "email",
        label : "your email",
        placeholder: "enter your email",
        required : true
      }
    ]
  } else if(path === "/auth/reset_password") {
    return [
      {
        type : "password",
        name : "password",
        label : "new password",
        placeholder: "type new password",
        required : true
      },
      {
        type : "password",
        name : "password_confirmation",
        label : "confirm password",
        placeholder: "confirm password",
        required : true
      }
    ]
  } else {
    console.log(`new pathname found for form template. the new pathname was - ${path}`);
    return []
  }
}

export const authPageTitle = (path) => {
  switch(path) {
    case "/auth/login":
      return "Sign in to your account"
    case "/auth/registration":
      return "Create your account"
    // case "/auth/forgot_password":
    //   return "Forgot Password"
    // case "/auth/reset_password":
    //   return "Reset Password"
    default:
      console.log(path);
      return "Oops! Page not found."
  }
}

export const authRequestPath = (frontend_path) => {
  // we temporary use the json-server-auth.
  // we will move to our own server.
  switch(frontend_path) {
    case "/auth/login":
      return "login"
    case "/auth/registration":
      return "register"
    default:
      console.log(`new path found for auth request - ${frontend_path}`);
      return null
  }
}

export const conversationPartnerInfo = (participants, loggedin_user_email) => {
  return participants.find(p => p.email !== loggedin_user_email);
}

export const getPartnerAvatar = (email, size) => {
  return gravatarUrl(email, {size});
}

export const isEmailValid = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}