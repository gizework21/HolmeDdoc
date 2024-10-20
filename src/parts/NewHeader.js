import React from "react";

function NewHeader(props) {
  return (
    <div className="">
      <div className=" px-6 md:px-10 lg:px-16 xl:px-20 lg:pt-20 py-20 MainHeaderText xl:py-28  ">
        <p className="text-nowrap tracking-[.3rem] text-slate-700 text-5xl ">
          {/* Find  local <span id="movingText">doctors</span> */}
          Find a Doctor near you
        </p>
        <p className="lg:text-lg md:text-base text-xs text-gray text-center w-[50%] mt-5 tracking-[.15rem]">
          Mind. Body. Soul
        </p>
      </div>
    </div>
  );
}

export default NewHeader;
