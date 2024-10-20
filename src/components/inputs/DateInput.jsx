import React from "react";
import { useNavigate } from 'react-router-dom'

const DateInput = React.forwardRef((props, ref) => {
  let width = "";
  if (props.fullWidth) {
    width = "w-full lg:w-[95%]";
  }

  let borderColor = "";
  if (props.errorMessage) {
    borderColor = "border-red-500";
  } else {
    borderColor = "border-green";
  }

  let textSize = 'text-[0.45rem] placeholder:text-[0.45rem]'
  if(props.value){
    textSize = 'text-[1rem]'
  }

  const navigate = useNavigate()

  return (
    <div
      className={`flex flex-col items-start ${width} `}
    >
      <label className="text-gray-600 md:text-xs font-sharp-sans-semibold pb-1">
        {props.label}
      </label>
      <div className="relative w-full ">
        <input
          type={"text"}
          placeholder={props.placeholder}
          disabled={true}
          defaultValue={props.defaultValue}
          className={`h-[43px] w-full rounded-md border border-opacity-80 
          font-sharp-sans-semibold text-sm px-2 outline-none ${borderColor} placeholder:text-gray-500 placeholder:text-size-6 placeholder:font-thin placeholder:tracking-[3px] disabled:bg-white`}
        />
        <div onClick={() => navigate(-1)} className="absolute right-2 top-3 hover:cursor-pointer text-green underline">
            <span>Edit</span>
        </div>
      </div>
    </div>
  );
});

export default DateInput;
