import React, { useEffect, useRef, useState } from "react";
import ErrorMessage from "../ErrorMessage";
import Image from "../Image";

const TextInput = React.forwardRef((props, ref) => {
  const [data, setData] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const newRef = useRef(ref);

  let width = "";
  if (props.fullWidth) {
    width = "w-full lg:w-[95%]";
  }

  let borderColor = "";
  let messageClass = "";
  if (props.errorMessage) {
    borderColor = "border-red-500";
    messageClass = "text-red-500 text-xs";
  } else {
    borderColor = "border-green";
  }

  let textSize = 'text-[0.45rem] placeholder:text-[0.45rem]'
  if(props.value){
    textSize = 'text-[1rem]'
  }

  // useEffect(() => {
  //   if (props.focusOnLoad) {
  //     newRef.current.focus();
  //   }
  // }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`flex flex-col items-start ${width} `}
    >
      <label className="text-gray-400 text-xs font-sharp-sans-semibold pb-1">
        {props.label}
      </label>
      <div className="relative w-full ">
        <input
          type={showPassword ? "text" : "password"}
          // value={data}
          // onChange={(e) => {
          //   setData(e.target.value);
          //   props.handleChange(e);
          // }}
          // ref={newRef}
          {...props.isValidationSet ? {...props.register(props.name, {
            ...props.schema
          })} : null}
          placeholder={!showPassword ? props.placeholder || "" : ""}
          className={`h-[43px] w-full rounded-md border border-opacity-80 p-2 text-gray-800 
          font-sharp-sans-semibold text-sm px-2 pr-8 outline-none ${borderColor} placeholder:tracking-[0.2rem] placeholder:text-gray-500 placeholder:text-[6px] md:placeholder:text-[7px]  ${textSize}`}
        />
        <div className="absolute right-2 top-4 hover:cursor-pointer">
          {showPassword ? (
            <Image  onClick={handleShowPassword}
            src={'/login/EyeVisible.png'}
            staticUrl={require("../../assets/images/Login/EyeVisible.png")} className="h-[11px]" alt="eye"/>
          ) : (
            <Image onClick={handleShowPassword}
            src={'/login/Eye.png'}
            staticUrl={require("../../assets/images/Login/Eye.png")} className="h-[11px]" alt="eye"/>
          )}
        </div>
      </div>
      <ErrorMessage errorMessage={props.errorMessage} />
    </div>
  );
});

export default TextInput;
