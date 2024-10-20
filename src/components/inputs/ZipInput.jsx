import React, { useEffect, useRef, useState } from "react";
import ErrorMessage from '../ErrorMessage'

const ZipInput = React.forwardRef((props, ref) => {
  const [data, setData] = useState();
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

  const handleZipChange = (e) => {
    if(e.target.value.length <= 6){
      props.setValue(props.name, e.target.value, { shouldValidate: true } )
    }
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
        type="number"
        {...props.isValidationSet ? {...props.register(props.name, {
          ...props.schema
        })} : null}
        defaultValue={props.value}
        onChange={handleZipChange}
        placeholder={props.placeholder || ""}
        className={`h-[43px] w-full rounded-md border border-opacity-80 p-2 text-gray-800 
        font-sharp-sans-semibold text-sm px-2 outline-none ${borderColor}`}
      />
      <ErrorMessage errorMessage={props.errorMessage} />
    </div>
  );
});

export default ZipInput;
