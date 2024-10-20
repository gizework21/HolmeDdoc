import React from "react";

function YellowButton(props) {
  return (
    <div>
      <button
        className="p-4 px-8 font-sharp-sans-bold rounded-md  text-sm text-primary bg-yellowlight first-letter:
         hover:shadow-inner hover:bg-yellowcustom" 
        onClick={props.onClick}
      >
        {props.name}
      </button>   
    </div>
  );
}

export default YellowButton;
