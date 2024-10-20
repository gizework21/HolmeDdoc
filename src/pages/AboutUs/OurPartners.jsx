import React from "react";
import Image from "../../components/Image";
import Header from "./Header";

const OurPartners = () => {
  return (
    <div className="p-5 md:px-20 md:py-16">
      <Header>Our Partners</Header>
      <div className="flex items-center justify-start lg:p-5 ">
        <div className="w-auto">
          <Image
            className="h-5 w-24 md:h-10 lg:h-full sm:w-full object-contain"
            src={"/about/IFM.png"}
            staticUrl={require("../../assets/images/about/IFM.png")}
            alt="logo"
          />
        </div>
        {/* <div className="w-auto">
          <Image
            className="h-5 w-24 md:h-12 lg:h-16 sm:w-full object-contain"
            src={"/about/SCL.png"}
            staticUrl={require("../../assets/images/about/SCL.png")}
            alt="logo"
          />
        </div>
        <div className="w-auto">
          <Image
            className="h-5 w-24 md:h-12 lg:h-16 sm:w-full object-contain"
            src={"/about/Mount.png"}
            staticUrl={require("../../assets/images/about/Mount.png")}
            alt="logo"
          />
        </div> */}
      </div>
    </div>
  );
};

export default OurPartners;
