import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState, useEffect, useRef } from 'react';
import useToggle from "../../hooks/useToggle"
import Label from './Label'

export default function InputDropdown({ options, selectedOption, selectOption, placeholder, showDropdownIcon, label, ...otherProps }) {
    const [showDropdown, toggleShowDropdown] = useToggle(false)
    const [searchTerm, setSearchTerm] = useState(selectedOption?.title ? selectedOption.title : '')
    const [selected, setSelected] = useState({})
    const dropdownEl = useRef()
    // console.log(showDropdown)

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value)
        selectOption(e.target.value)
    }

    const handleSelectedChange = (selectedOption) => {
        setSearchTerm(selectedOption.title)
        setSelected(selectedOption)
        selectOption(selectedOption.title)
        toggleShowDropdown(false)
    }

    // console.log(selected, searchTerm)

    const filteredOptions = options.filter(option => option.title.includes(searchTerm))

    const hideDropdown = (e) => {
        if (!dropdownEl.current.contains(e.target)) {
            toggleShowDropdown(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', hideDropdown, true)

        return () => {
            window.removeEventListener('click', hideDropdown, true)
        }
    }, [])

    let messageClass = "";
    let borderColor = "";

    if (otherProps.errorMessage) {
      borderColor = "border-red-500";
      messageClass = "text-red-500 text-xs";
    } else {
      borderColor = "border-green";
    }
    let inputStyle = "h-full w-full rounded-md border-green px-4 outline-none"
    let iconStyle = "bg-[white] border-green h-full flex items-center justify-center pr-[5px]"
    if(showDropdownIcon){
        inputStyle += ' rounded-r-none border-green border-y-[1px] border-l-[1px]'
        iconStyle += ' border-y border-r border-l-none rounded-r-md'
    }else{
        inputStyle += ' border-[1px]'
        iconStyle += ' hidden'
    }

    return (
        <div ref={dropdownEl} className="relative h-[fit-content] w-full border-none shadow-none" 
        >
            <div className='flex flex-col'>
                <Label label={label} />
                <div className="h-[38px] w-full flex items-center justify-center">
                    <input 
                        className={inputStyle} 
                        onFocus={toggleShowDropdown}
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        placeholder={placeholder}
                    />
                    <div className={iconStyle}>
                        <ChevronDownIcon className='h-[15px] w-[15px] text-green' />
                    </div>
                </div>
                <label
                    className={
                        otherProps.errorMessage
                        ? `visible ${messageClass}`
                        : `invisible ${messageClass}`
                    }
                >
                    {otherProps.errorMessage ? otherProps.errorMessage : "&nbsp;"}
                </label>
            </div>
            {showDropdown && <div className="absolute top-16 bg-white z-20 px-4 py-3 max-h-[20rem] overflow-auto cursor-pointer shadow-md rounded-md w-full">
                <ul className='space-y-1'>
                    {
                        filteredOptions.map(item => <li key={item.id} className={`${selected.id === item.id && 'text-green'}`} onClick={() => handleSelectedChange(item)}>{item.title}</li>)
                    }
                </ul>
            </div>}
        </div>
    );
}

// const [state, setState] = useState(null)
//<InputDropdown showDropdownIcon={true} options={SearchItems} placeholder={"Select"} selectedOption={state} selectOption={val => setState(val)} />


// let inputStyle = "h-full w-full rounded-md border-green py-[9.3px] px-4 outline-none"
// let iconStyle = "bg-[white] border-green py-[10.2px] md:py-[10px] h-full flex items-center justify-center pr-[5px]"
// if(showDropdownIcon){
//     inputStyle += ' rounded-r-none border-green border-y-[1px] border-l-[1px]'
//     iconStyle += ' border-y border-r border-l-none rounded-r-md'
// }else{
//     inputStyle += ' border-[1px]'
//     iconStyle += ' hidden'
// }


// import React, { useState } from "react";
// import Label from "./Label";

// const initalOtpState = {
//   otp_1: "",
//   otp_2: "",
//   otp_3: "",
//   otp_4: "",
//   otp_5: "",
//   otp_6: "",
// };
// const HELPER_ARRAY = [1, 2, 3, 4, 5, 6];

// const Otp = ({ setOtp }) => {
//   const [otpCode, setOtpCode] = useState(initalOtpState);

//   const confirmOtp = async (e) => {
//     e.preventDefault();
//     let otpString = "";
//     for (let i = 1; i <= 6; i++) {
//       otpString += otpCode[`otp_${i}`];
//     }
//     setOtp(otpString);
//   };

//   const handleCodeChange = (e) => {
//     if(e.target.value.length > 1){
//         e.target.value = e.target.value.slice(1, 2);
//     }
//     else if (e.target.value > 1) {
//       e.target.value = e.target.value.slice(0, 1);
//     }
//     console.log(e.target.value)

//     setOtpCode((otpCode) => {
//       return {
//         ...otpCode,
//         [e.target.name]: e.target.value,
//       };
//     });
//   };

//   const inputFocus = (e) => {
//     console.log(e)
//     if (e.key === "Delete" || e.key === "Backspace") {
//       const next = e.target.tabIndex - 2;
//       if (next > -1) {
//         e.target.form.elements[next].focus();
//       }
//     } else {
//       const next = e.target.tabIndex;
//       if (next < 6) {
//         e.target.form.elements[next].focus();
//       }
//     }
//   };

//   return (
//     //   remove the width below
//     <form className="w-full space-y-2"> 
//       <Label 
//         label={"Enter OTP"}
//       />
//       <div className="flex items-center justify-between w-full">
//         {HELPER_ARRAY.map((el) => (
//           <input
//             key={el}
//             type="number"
//             name={`otp_${el}`}
//             className={"h-12 w-12 border-2 border-green text-center caret-transparent otp-input rounded-md"}
//             value={otpCode[`otp_${el}`]}
//             max="1"
//             onChange={handleCodeChange}
//             onKeyUp={inputFocus}
//             tabIndex={el}
//             disabled={el === 1 ? false : !otpCode[`otp_${el-1}`]}
//             required
//           />
//         ))}
//       </div>
//     </form>
//   );
// };

// export default Otp;
