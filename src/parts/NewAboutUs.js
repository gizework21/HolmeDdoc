import React from "react";
import aboutUs from "../assets/images/aboutUs.png";
import qr from "../assets/images/qr.png";
import AppButton from "../components/AppButton";
import apple1 from "../assets/images/apple1.svg";
import googleplay1 from "../assets/images/googleplay1.svg";

function NewAboutUs() {
  return (
    <div className="py-10">
      {/* <div className=" mt-10 px-6 md:px-10 lg:px-16 xl:px-20 grid md:grid-cols-2 grid-cols-1  mb-20 md:bg-[url('/src/assets/images/aboutUs.png')] md:bg-60 lg:bg-60 mr-10 bg-right bg-no-repeat 2xl:mr-32  "> */}
      <div className="  px-6 md:px-10 lg:px-16 xl:px-20 grid md:grid-cols-2 grid-cols-1   md:bg-[url('/src/assets/images/aboutUs.png')] lg:bg-contain  xl:bg-contain md:bg-contain  xl:mr-10 bg-right bg-no-repeat  ">
        <div className=" flex flex-col md:justify-start md:items-start justify-center items-center  ">
          <h2 className="text-2xl lg:text-4xl font-sharp-sans-bold mb-10 tracking-[0.5rem] text-slate-700  ">
            Featured Holistic Practitioners
          </h2>
          <div className="text-xs md:text-xs lg:text-sm xl:text-base  space-y-4 md:mt-8 lg:mt-20 ">
            {/* <p className="md:mb-12 lg:mb-20 mb-10 text-gray font-sharp-sans md:w-[80%] md:mr-2 "> */}
            <p className="md:mb-6 lg:mb-8 mb-10 text-gray font-sharp-sans md:w-[85%]  ">
              Founded in 1996, This platform is an on-demand, digital primary
              healthcare platform which offers professional diagnostics and
              health check-up services that can be availed from the comfort of
              home, office. Since its inception, xyz has redefined the primary
              healthcare sector. Driven by the passion to provide care, impelled
              with an unwavering focus on quality and steered by ground-breaking
              artificial intelligence.This endeavour has always been to make
              good health more accessible, reliable and hassle-free to all. With
              the help our platform, users can instantly consult doctors online
              and get health checks at home - all through the tap or click of a
              button.
            </p>
            {/* <div className="md:pb-16 lg:pb-28 md:w-[80%] flex justify-center items-center md:flex-none md:float-right  "> */}
            <div className="md:pb-5 lg:pb-20 md:w-[80%] flex justify-center items-center md:flex-none md:float-right  ">
              <button className="bg-teal-500 md:px-16 px-10 py-2 rounded-full   md:float-right float-none md:mt-10 lg:mr-2 text-white ">
                Learn More
              </button>
            </div>
          </div>
        </div>
        {/* <div className="mt-10 w-full">
        <img src={aboutUs} alt="" className=" h-full " />
      </div> */}
      </div>
    </div>
  );
}

export default NewAboutUs;
