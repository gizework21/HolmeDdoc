import React from "react";

const Label = ({ label, noPaddingBottom, fontColor, textXs }) => {
  return (
    <label className={`${textXs ? 'text-xs':'text-size-4'} md:text-xs font-sharp-sans-semibold ${!noPaddingBottom ? 'pb-1' : '-mt-[2px]'} flex-1 ${ fontColor ? `${fontColor}` : 'text-gray-400' }`}>
      {label}
    </label>
  );
};

export default Label;
