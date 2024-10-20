import React from "react";

function StepsNew(props) {
  return (
    <div className="w-full mt-5">
      <div className="flex flex-row items-center justify-center relative">
        <div className="h-[1px] w-full sm:w-[88%] bg-green bg-opacity-100"></div>
        <div className="font-basic-sans-regular font-thin absolute  w-full sm:w-[88%] md:w-[93%] flex flex-row items-center justify-between">
          {props.list.map((el, key) => {
            if (key + 1 <= props.currentStep) {
              return (
                <div
                  className={`border-green border-[1px] flex items-center justify-center
                   bg-green text-white rounded-full h-10 w-10 left-${
                     key / (props.list.length - 1)
                   }`}
                   key={key}
                >
                  {key + 1}
                </div>
              );
            } else {
              return (
                <div
                  className={`border-green border-[1px] flex items-center justify-center bg-white
                   text-green rounded-full h-10 w-10 left-${
                     key / (props.list.length - 1)
                   }`}
                   key={key}
                >
                  {key + 1}
                </div>
              );
            }
          })}
        </div>
      </div>
      <div
        className="flex flex-row items-center font-basic-sans-regular
       justify-between w-full pt-8 text-gray-300 text-xs md:text-sm"
      >
        {props.list.map((el, key) => {
          let classList = " m-1 ";
          if(key+1 == props.currentStep){
            classList = classList + "text-gray-500 font-bold "
          }
          if (key + 1 <= props.currentStep) {
            if (key === 0) {
              classList = classList + " text-left";
            } else if (key === props.list.length - 1) {
              classList = classList + " text-right";
            } else {
              classList = classList + " text-center";
            }
          } else {
            if (key === 0) {
              classList = classList + "  text-left";
            } else if (key === props.list.length - 1) {
              classList = classList + "  text-right";
            } else {
              classList = classList + "  text-center";
            }
          }
          return <p className={classList}                    
                key={key}>{el}</p>;
        })}
      </div>
    </div>
  );
}

export default StepsNew;
