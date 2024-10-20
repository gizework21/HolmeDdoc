import React, { useState } from "react";
import footer from "../assets/images/home/Logo.png";
import { Fragment } from "react";
import {
  AboutUs,
  Home,
  MakeAppointment
} from "../data/urls";
import { useNavigate, useLocation } from "react-router-dom";
import CityModal from "../components/CityModal";
import MobileMenu from "../components/MobileMenu";
import NavbarAuthOption from "../components/NavbarAuthOption";
import Image from "../components/Image";
// import LogoNew from "../../public/logonew.PNG"
import LogoNew from "../assets/images/logonew.png"

function NewNavBarHolmeddoc(props) {
  const [showCities, setShowCities] = useState(false);
  const navigate = useNavigate();
  const isHomePage = useLocation().pathname === Home;

  return (
    <>
      <div
        className={`${
          props.position
            ? `px-6 md:px-2 lg:px-2 xl:px-4 text-slate-700  lg:py-5 grid grid-col-12  py-1 md:py-3 bg-white ${props.position} top-0 z-10 `
            : "px-6 md:px-2 lg:px-2 xl:px-4 text-slate-700  lg:py-5 grid grid-col-12 py-1 md:py-3 bg-white z-10 "
        } h-[7rem] relative ${!isHomePage && "drop-shadow-lg"}`}
      >
        <div className="md:flex flex-row justify-between items-center  hidden mx-10  text-gray-900 ">
          <div className="flex items-center justify-between ">
            <div onClick={() => navigate(MakeAppointment)} className="font-basic-sans-regular font-semibold text-xs lg:text-navbarLg   tracking-[.15rem] cursor-pointer ">
              MAKE AN APPOINTMENT
            </div>
            <div className="xl:mx-6 mx-2 text-gray-400">|</div>
            <div
              onClick={() => setShowCities((v) => !v)}
              className="font-basic-sans-regular font-semibold text-xs lg:text-navbarLg tracking-[.15rem]  cursor-pointer"
            >
              BROWSE
            </div>
          </div>
          <div className="bg-white flex items-center justify-center rounded-full absolute top-[100%] tall:top-[108%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[10rem] w-[10rem] md:h-[10rem] md:w-[10rem]   tall:h-[13rem] tall:w-[13rem] lg:h-[15rem] lg:w-[15rem]">
            <Image
              src={LogoNew}
              // src={"https://telehealth.ikrajindustries.com/public/prescription_img/1729334964_OTET20240034.png"}
              staticUrl={LogoNew}
              alt="Logo"
              className={`h-[8rem] md:h-[10rem] tall:h-[13rem] lg:h-[15rem] cursor-pointer`}
              onClick={() => {
                navigate(Home);
              }}
            />
             {/* <ImageLazy
              src={footer}
              alt=""
              className="h-[8rem] md:h-[10rem] tall:h-[13rem] lg:h-[15rem] cursor-pointer"
              onClick={() => {
                navigate(Home);
              }}
              width={"w-full"}
              rounded={"rounded-full"}
            /> */}
          </div>
          <div className="flex items-center justify-between">
            <div
              onClick={() => navigate(AboutUs)}
              className=" font-basic-sans-regular font-semibold text-xs lg:text-navbarLg  tracking-[.15rem] cursor-pointer"
            >
              ABOUT US
            </div>
            <div className="xl:mx-6 mx-2 text-gray-400">|</div>
            <NavbarAuthOption />
          </div>
        </div>
        <MobileMenu isHomePage={isHomePage}/>
      </div>
      <CityModal 
        isModalVissible={showCities}
        closeModal={() => setShowCities(false)}
      />
    </>
  );
}

export default NewNavBarHolmeddoc;
