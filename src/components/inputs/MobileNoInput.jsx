import React, { useRef, useState } from "react";
import ErrorMessage from '../ErrorMessage';

const MobileNoInput = React.forwardRef((props, ref) => {
  const [data, setData] = useState("");
  const newRef = useRef(ref);

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

  // useEffect(() => {
  //   if (props.focusOnLoad) {
  //     newRef.current.focus();
  //   }
  //   console.log(props);
  // }, []);

  // const validateNumber = () => {
  //   var phoneno = /^\d{10}$/;
  //   if (data.match(phoneno)) {
  //     return true;
  //   } else {
  //     validationError = "Number Not Valid";
  //   //   alert("message");
  //     return false;
  //   }
  // };

  const disabledStyle = props.disableInput ? {borderColor : 'gray'} : null

  return (
    <div
      className={`flex flex-col items-start font-basic-sans-regular  ${width}`}
    >
      <label className="text-gray-400 text-xs font-sharp-sans-semibold pb-1">
        {props.label}
      </label>
      <div className="relative w-full">
        <input
          type={props.type ?? 'number'}
          // value={data}
          // onChange={(e) => {
          //   setData(e.target.value);
          //   props.handleChange(e);
          // }}
          {...props.isValidationSet ? {...props.register(props.name, {
            ...props.schema
          })} : null}
          defaultValue={props.displayValue}
          disabled={props.disableInput}
          // ref={newRef}
          placeholder={props.placeholder || ""}
          style={disabledStyle}
          className={`h-[43px] w-full ml-2 rounded-md border p-2 pl-7 text-gray-800 
          font-basic-sans-regular text-sm px-2 outline-none ${borderColor} placeholder:text-gray-300 bg-white`}
          // onBlur={validateNumber}
        />
        <div className="absolute left-1 top-[0.7rem] w-3 pl-2  h-full text-sm">
          {props.extension || "+91"}
        </div>
      </div>
      <ErrorMessage errorMessage={props.errorMessage} />
    </div>
  );
});

export default MobileNoInput;
