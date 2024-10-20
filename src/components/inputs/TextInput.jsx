import React, { useEffect, useRef, useState } from "react";
import ErrorMessage from '../ErrorMessage'

const TextInput = React.forwardRef((props, ref) => {
  const [data, setData] = useState();
  const newRef = useRef(ref);


  // useEffect(() => {
  //   if(props.value){ 
  //     props.setValue(props.name , props.value, { shouldValidate: true } )
  //   }
  // }, [])

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

  // useEffect(() => {
  //   width = "";
  //   if (props.focusOnLoad) {
  //     newRef.current.focus();
  //   }  
  //   console.log(props)
    
  // }, []);

  return (
    <div
      className={`flex flex-col items-start ${width}`}
    >
      <label className="text-gray-400 text-xs font-sharp-sans-semibold pb-1">
        {props.label}
      </label>
      <input
        type="text"
        // value={data}
        // onChange={(e) => {
        //   setData(e.target.value);
        //   props.handleChange(e);
        // }}
        // name={props.name}
        // ref={newRef}
        {...props.isValidationSet ? {...props.register(props.name, {
          ...props.schema
        })} : null}
        placeholder={props.placeholder || ""}
        defaultValue={props.value}
        className={`h-[43px] w-full rounded-md border border-opacity-80 p-2 text-gray-800 
        font-sharp-sans-semibold text-sm px-2 outline-none ${borderColor} placeholder:text-gray-300`}

      />
      <ErrorMessage errorMessage={props.errorMessage} />
    </div>
  );
});

export default TextInput;
