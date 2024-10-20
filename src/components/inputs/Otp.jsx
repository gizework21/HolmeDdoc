import React, { useState, useEffect } from "react";
import Label from "./Label";
import ErrorMessage from '../ErrorMessage';

// const initalOtpState = {
//   otp_1: "",
//   otp_2: "",
//   otp_3: "",
//   otp_4: "",
//   otp_5: "",
//   otp_6: "",
// };
const HELPER_ARRAY = [1, 2, 3, 4, 5, 6];

const Otp = ({ handleCodeChange, otpCode, pasted, ...props }) => {
  // const [otpCode, setOtpCode] = useState(initalOtpState);

  // const confirmOtp = async (e) => {
  //   e.preventDefault();
  //   let otpString = "";
  //   for (let i = 1; i <= 6; i++) {
  //     otpString += otpCode[`otp_${i}`];
  //   }
  //   setOtp(otpString);
  // };

  // const handleCodeChange = (e) => {
  //   if(e.target.value.length > 1){
  //       e.target.value = e.target.value.slice(1, 2);
  //   }
  //   else if (e.target.value > 1) {
  //     e.target.value = e.target.value.slice(0, 1);
  //   }
  //   console.log(e.target.value)

  //   setOtpCode((otpCode) => {
  //     return {
  //       ...otpCode,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  // };

  const inputFocus = (e) => {
    if(pasted){
      e.target.form.elements[5].focus();
      return
    }
    if (e.key === "Delete" || e.key === "Backspace") {
      const next = e.target.tabIndex - 2;
      if (next > -1) {
        e.target.form.elements[next].focus();
      }
    } else {
      const next = e.target.tabIndex;
      if (next < 6) {
        e.target.form.elements[next].focus();
      }
    }
  };

  const size = props.largeInput ? 'h-12 w-12 2xl:h-16 2xl:w-16'  : 'h-12 w-12'

  return (
    //   remove the width below
    <form className="w-full space-y-2"> 
      {!props.noLabel && <Label 
        label={"Enter OTP"}
      />}
      <div className="flex items-center justify-between w-full">
        {HELPER_ARRAY.map((el) => (
          <input
            key={el}
            type="number"
            name={`otp_${el}`}
            className={`${size} border-[1px] border-green text-center caret-transparent otp-input rounded-md`}
            value={otpCode[`otp_${el}`]}
            max="1"
            onChange={handleCodeChange}
            onKeyUp={inputFocus}
            tabIndex={el}
            disabled={el === 1 ? false : !otpCode[`otp_${el-1}`]}
            required
          />
        ))}
      </div>
      <ErrorMessage errorMessage={props.errorMessage} />
    </form>
  );
};

export default Otp;
