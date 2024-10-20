import React from "react";
import Logo from "../assets/images/icons/Logo.png";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSidebar } from "../redux/sidebar";
import { Home } from "../data/urls";
import RollingLoader from "../assets/images/Login/RollingLoader.svg";
import Image from "./Image";

const FormContainer = ({
  formTitle,
  formSubTitle,
  rBtnText,
  lBtnText,
  nextStep,
  profilePage,
  image,
  loginPage,
  subtitleInOneline,
  isLoading,
  children,
  changePassword,
  forgotPassword,
}) => {
  const dispatch = useDispatch();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    nextStep();
  };

  const navigate = useNavigate();

  return (
    <div className="max-w-[100vw] md:h-[100vh] short:overflow-hidden flex flex-col">
      {profilePage && (
        <div className="lg:hidden flex justify-end w-full">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="pt-5 px-5"
          >
            <Bars3Icon className="h-5 w-5" />
          </button>
        </div>
      )}
      <div className="flex h-full">
        <div
          className={`${image} bg-cover bg-center bg-no-repeat hidden short:block h-[100vh] lg:basis-[45vw] ${
            profilePage && "lg:basis-[40%]"
          }`}
        ></div>
        <div className="flex-1 bg-white flex flex-col justify-between min-h-[100vh] md:h-[100vh]">
          {!profilePage && (
            <div className="self-center md:-mt-1 md:-mr-1 md:self-end md:pr-5 pt-5 h-[10rem] md:h-[8rem] lg:h-[8.5rem]">
              <Image
                src={"/home/Logo.png"}
                staticUrl={Logo}
                alt="logo"
                className="bg-transparent cursor-pointer h-[90%] relative z-10"
                onClick={() => navigate(Home)}
              />
            </div>
          )}
          <div
            className={`${!loginPage && "md:-mt-[5rem]"} relative z-0 pt-8 ${
              !profilePage
                ? "px-[5%] md:pl-[8%] lg:pl-[12%] xl:pl-[15%] md:pr-[8rem] lg:pr-[12.5rem] 2xl:pr-[17.7rem]"
                : "px-[5%] lg:px-10 xl:px-20"
            } h-full flex flex-col items-start justify-start overflow-y-auto overflow-x-hidden`}
          >
            <h1 className="text-3xl tall:text-[40px] tall:pt-2 text-gray-800 mb-4 tall:mb-10">
              {formTitle}
            </h1>
            {!profilePage && (
              <span
                className={`text-gray-500 pb-4 mb-3 tall:mb-6 tall:pb-0 font-thin text-[18px] ${
                  subtitleInOneline && "2xl:whitespace-nowrap"
                } `}
              >
                {formSubTitle}
              </span>
            )}
            {children}
          </div>
          <div className="bg-green w-full lg:h-[5rem] px-[2%] md:px-[5%] py-5 flex flex-col md:flex-row items-center justify-between mt-5 lg:mt-0">
            <span className="text-white order-2 mt-2 md:mt-0 lg:order-1">
              {lBtnText}
            </span>
            {changePassword && (
              <button
                className="float-left m-2 bg-lightgrey text-grey rounded-full h-[2.6rem] w-[14rem]"
                onClick={() => navigate("/account/myProfile")}
              >
                Back
              </button>
            )}
            {forgotPassword && (
              <button
                className="float-left m-2 bg-lightgrey text-grey rounded-full h-[2.6rem] w-[14rem]"
                onClick={() => navigate("/login")}
              >
                Back
              </button>
            )}
            <button
              className="order-1 md:order-2  bg-lightgrey text-grey rounded-full h-[2.6rem] w-[14rem]"
              onClick={handleFormSubmit}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Image className="h-8" src={'/login/RollingLoader.svg'} staticUrl={RollingLoader} />
                </div>
              ) : (
                rBtnText
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
