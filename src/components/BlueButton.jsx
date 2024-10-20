import React from "react";

function BlueButton(props) {
  return (
    <div>
      <button
        className="p-3 px-8 font-sharp-sans-medium rounded-md border-2 border-primary text-sm text-primary
             hover:text-white hover:bg-primary "
        onClick={props.onClick}
      >
        {props.name}
      </button>
    </div>
  );
}

export default BlueButton;
