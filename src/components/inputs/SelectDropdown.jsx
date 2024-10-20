import React, { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import Image from "../Image";

const SelectDropdown = (props) => {
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
  let selectStyle = "text-gray-800";
  if (!props.value || props.value === "") {
    console.log(props.value);
    selectStyle = "text-gray-300";
  }

  let borderRadius = "rounded-md";

  const [showDropdown, setShowDropdown] = useState(false);

  let DropdownIcon = (
    <Image
      src={'/login/GrayDropdown.png'}
      onClick={() => setShowDropdown((v) => !v)}
      staticUrl={require("../../assets/images/Login/GrayDropdown.png")}
      alt="drop"
      className={`absolute top-1/2 -translate-y-1/2 right-3 h-[0.6rem] z-0 rotate-0 group-hover:rotate-180 group-focus:rotate-180  transition-transform duration-300`}
    />
  );
  if (props.dropdownIconWithBorder) {
    DropdownIcon = (
      <div
        onClick={() => setShowDropdown((v) => !v)}
        className={
          "bg-[white] h-[43px] cursor-pointer flex items-center justify-center border-green  border-l  px-3 absolute top-1/2 -translate-y-1/2 right-0 z-0"
        }
      >
        <Image
          alt="Dropdown"
          src={"/GreenArrowDown.png"}
          staticUrl={require("../../assets/images/GreenArrowDown.png")}
          className={`h-[6px] w-[10px] text-green ${
            showDropdown ? "rotate-180" : "rotate-0"
          } transition-transform duration-300`}
        />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-start ${width}`}>
      <label className="text-gray-400 text-xs font-sharp-sans-semibold pb-1">
        {props.label}
      </label>
      <div className="w-full relative flex items-center justify-center group">
        <select
          className={`z-10  h-[43px] w-full bg-transparent ${borderRadius} border border-opacity-80 p-2  
            font-sharp-sans-semibold text-sm px-2 outline-none ${borderColor} appearance-none ${selectStyle}`}
          {...(props.isValidationSet
            ? {
                ...props.register(props.name, {
                  ...props.schema,
                }),
              }
            : null)}
        >
          <option className="text-gray-400" value={""}>
            Select
          </option>
          {props.options.map((item) => (
            <option key={item.id} value={item.title} className="text-gray-800">
              {item.title}
            </option>
          ))}
        </select>
        {DropdownIcon}
      </div>
      <ErrorMessage errorMessage={props.errorMessage} />
    </div>
  );
};

export default SelectDropdown;
