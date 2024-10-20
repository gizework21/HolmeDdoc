import React from "react";
import Image from "../../components/Image";
import Header from "./Header";

const OurMission = () => {
  return (
    <div className="p-5 md:px-20 md:py-16">
      <div className="flex flex-col lg:flex-row items-start justify-between lg:space-x-20">
        <div className="lg:w-[50%] xl:w-[45%] order-2 lg:order-1">
          <Header>Our Mission</Header>
          <div className="text-lg text-gray-500 font-thin lg:w-[90%] mt-8">
            <p>
              <span className="font-bold">Holmeddoc’s mission is to connect the patients with the best
              practitioners in holistic medicine on planet earth!</span> Your one
              source, one place for everything holistic!!
            </p>
            <p>
              Holmeddoc platform will exclusively focus on creating awareness,
              marketing holistic medicine, and providing a seamless and easy way
              to find and connect the patients with the practitioners. Platform
              will focus on practitioners in holistic fields including
              Functional Medicine, Integrative Medicine, Chiropractic,
              Nutrition, Sleep Medicine, and other treatments!
            </p>
          </div>
        </div>
        <Image
          src={"/about/Mission.png"}
          className="lg:w-[50%] object-contain order-1 lg:order-2 mb-10 lg:mb-0"
          staticUrl={require("../../assets/images/about/Mission.png")}
          alt="about"
        />
      </div>
    </div>
  );
};

export default OurMission;
