import React from "react";

import { AiOutlineStar } from "react-icons/ai";
function Card(props) {
  return (
    <div
      key={props.key}
      className="bg-white hover:scale-[1.02] text-primary font-sharp-sans drop-shadow-sm border
     border-gray-300 hover:shadow-lg rounded-md  min-w-[286px] min-h-[310px] p-6"
    >
      <div className="flex items-start justify-between flex-col md:flex-row">
        <img
          src={require("../assets/images/docImage.png")}
          className="absolute -top-12 rounded-full w-28 h-28 left-8 "
          alt="doctor "
        />
        <p></p>
        <p
          className="xl:mr-5 font-sharp-sans-medium text-primary text-xs mt-12 justify-start md:mt-0 p-1.5 font-bold
         bg-lightblue rounded-full flex flex-row items-center"
        >
          <AiOutlineStar size={20} />
          {props.tag}
        </p>
      </div>
      <p className="mt-4 md:mt-9 text-primary text-xl font-sharp-sans-bold">
        {props.name}
      </p>
      <div className="font-sharp-sans-medium  text-md">{props.type}</div>
      <div className="text-sm text-gray-600 font-sharp-sans-medium">
        {props.location}
      </div>
      <div className="flex flex-row items-center justify-start pt-1">
        <div className="font-bold font-sharp-sans-bold text-lg">
          {props.rating}
        </div>
        <div className="text-gray-600 ml-2 text-sm">
          ({props.review} reviews)
        </div>
      </div>

      <div className="font-sharp-sans-medium text-base pt-4 font-light text-md text-ellipsis line-clamp-3">
        "{props.desc}"
      </div>
    </div>
  );
}

export default Card;
