/*
// Title: Application Modals
// Description: A application will have lots of modals. all modal defined here.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/07/2024
*/

import { useEffect, useState } from "react";
import { AuthSubmitButton } from "./Buttons";
import { isEmailValid } from "./Helper";
import useDebounce from "hooks/useDebounce";
import { useGetUserQuery } from "@/lib/features/users/usersApi";
import { AlertBox } from "./Alerts";
import conversationsApi, { useAddConversationMutation, useEditConversationMutation } from "@/lib/features/conversations/conversationsApi";
import { useDispatch, useSelector } from "react-redux";

export function SendMessageModal({ control }) {
  const dispatch = useDispatch();
  const [sendTo, setSendTo] = useState("");
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState(null);
  const debouncedValue = useDebounce(sendTo, 500);
  const [checkPartnerEmail, setCheckPartnerEmail] = useState(false);
  const { user: loggedInUser } = useSelector(state => state.auth) || {};
  const { email: loggedInUserEmail } = loggedInUser || {};
  const { data: partnerInfo, isSuccess: partnerInfoGetSuccess } = useGetUserQuery(sendTo, { skip: !checkPartnerEmail});
  const [errors, setErrors] = useState({});
  const [addConversation, {isSuccess: isAddedSuccess}] = useAddConversationMutation();
  const [editConversation, {isSuccess: isEditedSuccess}] = useEditConversationMutation();

  // handle userCheck request to send msg
  useEffect(() => {
    if(isEmailValid(debouncedValue)) {
      setCheckPartnerEmail(true);
    } else {
      setCheckPartnerEmail(false);
    }
  }, [debouncedValue]);

  // partner info check handler and
  // get conversation info if 
  // already conversation exist.
  useEffect(() => {
    if(partnerInfo && partnerInfo.length === 0) {
      setErrors({...errors, message: "User doesn't exist!"});
    }
    
    if(partnerInfo && partnerInfo.length && partnerInfo[0].email === loggedInUserEmail) {
      setErrors({...errors, message: "Invalid request!"});
    } 
    
    if(partnerInfo) {
      setErrors({});
      dispatch(
        conversationsApi
        .endpoints
        .getConversation
        .initiate({ 
          partnerEmail: sendTo,
          userEmail: loggedInUserEmail
        })
      )
      .unwrap()
      .then(response => {
        setErrors({});
        setConversation(response);
      })
      .catch(error => {
        // if we need we will handle this error.
        setErrors({...errors, message: "Something went wrong! Try again later."});
      })
    }
  }, [partnerInfo]);

  // check conversation add/edit and close the modal
  useEffect(() => {
    if(isAddedSuccess || isEditedSuccess) {
      control();
      setMessage("");
      setSendTo("");
    }
  }, [isAddedSuccess, isEditedSuccess]);

  const formHandler = e => {
    e.preventDefault();
    const time_now = new Date().getTime();

    if(conversation.length) {
      editConversation({
        id: conversation[0].id,
        data: {
          ...conversation[0],
          last_message: message,
          sender: loggedInUserEmail,
          sent_at: time_now,
        }
      });
    } else {
      const { id, email, username } = partnerInfo[0] || {};
      const partnerFinalInfo = {id, email, username}
      addConversation({
        participants: `${loggedInUserEmail}-${sendTo}`,
        users: [loggedInUser, partnerFinalInfo],
        last_message: message,
        sender: loggedInUserEmail,
        sent_at: time_now,
        created_at: time_now
      });
    }
  }

  return (
    <>
      <div onClick={control} className="fixed inset-0 z-10 h-full w-full cursor-pointer bg-black/50"></div>
      <div className="absolute left-1/2 top-1/2 z-20 w-10/12 sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-[600px] -translate-x-1/2 -translate-y-1/2 space-y-8 rounded bg-white p-10">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Send message</h2>
        <form className="mt-8 space-y-[18px]" onSubmit={formHandler}>
          <div className="rounded-md shadow-sm space-y-[17px]">
            <div>
              <label className="form_label">{"send to"}</label>
              <input
                name={"send_to"}
                type={"text"}
                onChange={e => setSendTo(e.target.value)}
                required={true}
                placeholder={"send to"}
                className="form_input"
              />
            </div>
            <div>
              <label className="form_label">{"message"}</label>
              <textarea
                className={"form_textarea"}
                name={"message"}
                value={message}
                onChange={e => setMessage(e.target.value)}
                required={true}
                placeholder="your message"
              >{message}</textarea>
            </div>
          </div>
          <AuthSubmitButton title={"Send Message"} disabled={conversation === null || !message} />
          {errors?.message && <AlertBox message={errors.message} type={"error"} />}
        </form>
      </div>
    </>
  )
}