import React from "react";
import TopSearchedSpecialties from "../../parts/TopSearchedSpecialties";
import MainBanner from "../../parts/MainBanner";
import ListYourPractice from "../../parts/ListYourPractice";
import OurProcess from "../../parts/OurProcess";
import NewFooter from "../../parts/NewFooter";
import NewNavBarHolmeddoc from "../../parts/NewNavBarHolmeddoc";
import NewCommonConcerns from "../../parts/NewCommonConcerns";
import NewDownloadApp from "../../parts/NewDownloadApp";
import HolisticPractitioners from "../../parts/HolisticPractitioners";

function LandingPage() {
  return (
    <>
      <div className="sm:h-[-webkit-fill-available]">
        <NewNavBarHolmeddoc />
        <MainBanner />
      </div>
      <div className="flex items-center justify-center flex-col">
        <div className="max-w-[1560px] ">
          <TopSearchedSpecialties />
          <NewCommonConcerns />
          <HolisticPractitioners />
          <hr className=" text-gray-400" />
          <OurProcess />
          <ListYourPractice />
          <NewDownloadApp />
        </div>
      </div>
      <NewFooter />
    </>
  );
}

export default LandingPage;
