import React, { useEffect, useState, useRef } from "react";
import Filter from "../components/Filter";
import { browserName, isMobile } from "react-device-detect";
import useWindowWidth from "../hooks/useWindowWidth";
import Image from "../components/Image";

const MainBanner = () => {
  const [safariStyles, setSafariStyles] = useState(false);
  const container = useRef();
  const { windowWidth } = useWindowWidth();

  const handleBrowser = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight - 112}px`);
  };

  useEffect(() => {
    handleBrowser();
  }, [windowWidth]);

  return (
    <div
      ref={container}
      className={`bg-blueBg w-full flex flex-col md:justify-end pb-10 sm:pb-0 relative banner-height`}
    >
      <div className="w-full space-y-5 hidden md:flex flex-col items-center absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-basic-sans-regular">
        <h1 className="h-[fit-content] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.6rem] tracking-widest text-gray-900 font-medium flex items-center space-x-5">
          <p>HOLISTIC</p>
          <div className="flex items-center">
            <div className="relative">
              <p>M</p>
              <Image
                src={'/home/Leaf.png'}
                className="md:h-[2.7rem] lg:h-[3rem] xl:h-[3.6rem] absolute md:top-[4px] md:left-[0px] lg:top-[6.5px]  xl:top-[10px] xl:left-[0.6px]"
                staticUrl={require("../assets/images/home/Leaf.png")}
                alt="M"
              />
            </div>
            <p>EDICINE</p>
          </div>
          <p>CONNECTING</p>
        </h1>
        <p className="text-center font-poppins text-[30px] xl:text-[40px] space-x-5  text-black tracking-widest">
          <i>Mind.</i>
          <i>Body.</i>
          <i>Soul</i>
        </p>
      </div>
      <div className="w-full space-y-3 mt-24 flex md:hidden flex-col items-center font-basic-sans-regular">
        <h1 className="h-[fit-content] text-size-8 tracking-[1px] text-gray-900 font-medium flex items-center space-x-3">
          <p>HOLISTIC</p>
          <div className="flex items-center">
            <div className="relative">
              <p>M</p>
              <img
                className="h-[1.1rem] absolute top-[4px] left-[1px]"
                src={require("../assets/images/home/Leaf.png")}
                alt="M"
              />
            </div>
            <p>EDICINE</p>
          </div>
          <p>CONNECTING</p>
        </h1>
        <p className="text-center font-poppins text-size-4 space-x-5  text-black tracking-widest">
          <i>Mind.</i>
          <i>Body.</i>
          <i>Soul</i>
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-full xl:w-[94%]">
          <Filter />
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
