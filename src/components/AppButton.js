import React from "react";
import playstore from "../assets/images/playstore.png";
import apple from "../assets/images/apple.png";
import Image from "./Image";

function AppButton() {
  const data = [
    {
      image: apple,
      title: "Download on the",
      appName: "App Store",
    },
    {
      image: playstore,
      title: "GET IT ON",
      appName: "Google Play",
    },
  ];
  return (
    // <div className="w-40 grid grid-flow-col grid-cols-3 ">
    //   <div className="flex justify-center items-center bg-black ">
    //     <img src={playstore} alt="logo" />
    //   </div>
    //   <div className="pl-1 text-white col-span-2 bg-black flex flex-col justify-center ">
    //     <p className="text-[10px] ">Download on the</p>
    //     <p className="text-[10px]">App Store</p>
    //   </div>
    // </div>
    <>
      {data.map((item) => {
        const { image, title, appName } = item;
        return (
          <div className="w-32 rounded-lg bg-black   border-solid grid grid-flow-col grid-cols-12 mr-1 py-1 px-2 mt-1  ">
            <div
              //  className="flex rounded-t-lg justify-center items-center bg-black w-[50%]
              className=" rounded-t-lg col-span-3 grid place-items-center bg-black w-[80%]
             "
            >
              <Image src={'/apple.png'} staticUrl={image} alt="logo" className="w-[30px] h-[30px]" />
            </div>
            <div className="pl-1 text-white col-span-8 bg-black flex flex-col justify-center w-full ">
              <p className="text-[8px] ">{title}</p>
              <p className="text-[12px] text-base">{appName}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default AppButton;
