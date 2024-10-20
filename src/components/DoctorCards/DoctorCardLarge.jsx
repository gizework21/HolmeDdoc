import React from "react";
import useImageCache from "../../hooks/useImageCache";
import DoctorImage from "../DoctorImage";
import Image from "../Image";

const DoctorCardLarge = ({
  handleClick,
  totalRating,
  image,
  name,
  profession,
  location,
  education,
  languages,
  visitMode,
  ...props
}) => {
  const currentImageUrl = useImageCache(image);
  return (
    <>
      <div
        onClick={handleClick}
        className="cursor-pointer flex flex-row items-start justify-start w-full space-x-3 xsm:space-x-6  md:space-x-8"
      >
        <div className="p-0 m-0 justify-center xs:justify-start h-full">
          <DoctorImage
            src={currentImageUrl}
            alt={name}
            className="rounded-[20px] shadow-md object-contain justify-center xs:justify-start h-20 min-w-[80px] max-w-[80px] xs:h-24 xs:min-w-[96px] xs:max-w-[96px] sm:h-48 BtnLgXl:h-48 lg:h-40 sm:min-w-[192px] sm:max-w-[192px] BtnLgXl:min-w-[192px] BtnLgXl:max-w-[192px] lg:min-w-[160px] lg:max-w-[160px] xl:min-w-[192px] xl:max-w-[192px] xl:h-48 2xl:min-w-[208px] 2xl:max-w-[208px] 2xl:h-52"
          />
        </div>
        <div
          className="space-y-1 xsm:space-y-2 md:space-y-3 text-sm flex flex-col items-start xl:py-5 py-0 mx-0 my-2 md:my-0 md:py-3 
         justify-self-start w-full"
        >
          <p className="text-size-6 xsm:text-size-8 md:text-size-10 font-henriette text-gray-900 font-black tracking-[0.6px]">
            {name}
          </p>
          <div
            className="text-size-3 xsm:text-size-5 xl:text-size-6 flex flex-row items-start md:items-center justify-start 
          font-basic-sans-regular mt-1"
          >
            <p className="pr-2">
              {profession}, <span>{location}</span>
            </p>
            {/* <p>{location}</p> */}
          </div>
          <div className="flex">
            <div className="flex mt-2">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={`text-2xl transition-colors duration-200 ${
                    index < totalRating ? "text-yellow-500" : "text-gray-400"
                  }`}
                  style={{ fontSize: "2rem" }} // Adjust the size of the stars
                >
                  ★
                </div>
              ))}
            </div>
            <div className="mt-4 text-[20px] px-4">
              {totalRating > 0 ? parseFloat(totalRating).toFixed(1) : null}
            </div>
          </div>

          <p className="text-size-1 xsm:text-size-3 sm:text-size-4 font-basic-sans-regular font-light mt-2">
            {education}
          </p>
          <div className="hidden sm:flex flex-row items-center justify-start font-basic-sans-regular text-sm">
            <Image
              src={"/icons/Language.png"}
              staticUrl={require("../../assets/images/specialities/Language.png")}
              className="h-8"
              alt="Lng"
            />
            <p className="pl-2 whitespace-nowrap text-size-6">
              {languages.join(", ")}
            </p>
          </div>
          <div className="hidden sm:flex flex-row items-center justify-start font-basic-sans-regular text-sm">
            <Image
              src={"/icons/In-person.png"}
              staticUrl={require("../../assets/images/specialities/In-person.png")}
              className="h-8"
              alt="Lng"
            />
            <p className="pl-3.5 whitespace-nowrap text-size-6">
              {Array.isArray(visitMode) ? visitMode.join(",  ") : visitMode}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-2 pt-2 block sm:hidden">
        <div className="flex flex-row items-center justify-start font-basic-sans-regular text-sm">
          <Image
            src={"/icons/Language.png"}
            staticUrl={require("../../assets/images/specialities/Language.png")}
            className="h-8"
            alt="Lng"
          />
          <p className="pl-2 text-size-5  md:text-size-6">
            {languages.join(", ")}
          </p>
        </div>
        <div className="flex flex-row items-center justify-start font-basic-sans-regular text-sm">
          <Image
            src={"/icons/In-person.png"}
            staticUrl={require("../../assets/images/specialities/In-person.png")}
            className="h-8"
            alt="Lng"
          />
          <p className="pl-3.5 text-size-5 md:text-size-6">
            {Array.isArray(visitMode) ? visitMode.join(", ") : visitMode}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorCardLarge;
