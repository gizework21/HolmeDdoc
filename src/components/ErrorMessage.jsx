import React from 'react'

const ErrorMessage = (props) => {

  let messageClass = "text-xs mt-2";
  if (props.errorMessage) {
    messageClass += " text-red-500";
  }
  
  return (
    <label
        className={
          props.errorMessage
            ? `visible ${messageClass}`
            : `invisible ${messageClass}`
        }
      >
        {props.errorMessage ? props.errorMessage : "&nbsp;"}
    </label>
  )
}

export default ErrorMessage