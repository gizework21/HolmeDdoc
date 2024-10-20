import React from "react";

function LandingPageTitle(props) {
  return (
    <div className={`md:font-basic-sans-bold md:leading-[70px] font-bold
    text-size-11 md:text-titleLg text-gray-900 tracking-[2px] md:tracking-[7.8px] text-center md:text-left ${props.center && 'md:text-center'} landing-title`}>
      {props.children || "No 'title' given"}
    </div>
  );
}

export default LandingPageTitle;
