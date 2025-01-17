/*
// Title: App icons
// Description: Application common icons components.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/10/2024
*/

const returnStyle = (props) => {
  const w = props.w || "w-6";
  const h = props.h || "h-6";
  const color = props.color || "";
  return w + " " + h + " " + color + " " + " inline ";
}

export function EyeOpenIcon(props) {
  const style = returnStyle(props);
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={props.stroke || 2} 
      stroke="currentColor" 
      className={style}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" 
      />
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
      />
    </svg>
  );
}

export function EyeCloseIcon(props) {
  const style = returnStyle(props);
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={props.stroke || 2} 
      stroke="currentColor" 
      className={style}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" 
      />
    </svg>
  );
}

export function PenSquareIcon(props) {
  const style = returnStyle(props);
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={props.stroke || 2} 
      stroke="currentColor" 
      className={style}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );
}

export function SendIcon(props) {
  const style = returnStyle(props);
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={props.stroke || 2} 
      stroke="currentColor" 
      className={style}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
      />
    </svg>
  );
}

export function LogoutIcon(props) {
  const style = returnStyle(props);
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={props.stroke || 2} 
      stroke="currentColor" 
      className={style}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
      />
    </svg>
  );
}

