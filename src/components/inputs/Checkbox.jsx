import React from "react";
import Label from "./Label";
import ErrorMessage from "../ErrorMessage";

const Checkbox = ({
  value,
  handleChange,
  id,
  isChecked,
  label,
  ...otherProps
}) => {

  let borderColor = "";
  if (otherProps.errorMessage) {
      borderColor = "border-red-500";
  } else {
      borderColor = otherProps.borderGrey ? "border-gray-400" : "border-green";
  }

  return (
    <div className="flex flex-col"> 
      <div className="flex items-start sm:items-center space-x-2">
        <input
          type="checkbox"
          id={id}
          onChange={handleChange}
          checked={isChecked}
          value={value}
          {...otherProps.isValidationSet ? {...otherProps.register(otherProps.name, {
            ...otherProps.schema
          })} : null}
          className={`hover:cursor-pointer h-5 w-5 bg-white rounded-md appearance-none ${borderColor} border-[1px] checked:bg-checkmark bg-no-repeat bg-center`}
        />
        <Label label={label} fontColor={otherProps.fontColor} noPaddingBottom/>
      </div>
      {otherProps.errorMessage && <ErrorMessage errorMessage={otherProps.errorMessage} />}
    </div>
  );
};

export default Checkbox;