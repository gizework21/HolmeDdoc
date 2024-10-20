import React from "react";

function YellowHoverBlueButton(props) {
  return (
    <div>
      <button
        className="p-4 px-8 font-sharp-sans-bold rounded-md  text-sm text-primary
         bg-yellowlight first-letter:
         hover:text-white hover:bg-primary"
        onClick={props.onClick}
      >
        {props.name}
      </button>
    </div>
  );
}

export default YellowHoverBlueButton;
