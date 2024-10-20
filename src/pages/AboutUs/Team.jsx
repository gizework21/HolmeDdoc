import React from "react";
import Image from "../../components/Image";
import Header from "./Header";

const DATA = [
  {
    id: 1,
    name: "Dr. Rashmi Bolinjkar",
    designation: "Founder of Holmeddoc",
  },
  {
    id: 2,
    name: "Sridhar Prabhakaran",
    designation: "Co-Founder",
  },
  {
    id: 3,
    name: "Ashay Gharat",
    designation: "Co-Founder",
  },
];

const Team = () => {
  return (
    <div className="py-8 px-5 md:px-20 md:py-16 bg-[#47C7C6]/[6%]">
      <Header>Strength of the Team</Header>
      <div className="flex flex-col md:flex-row items-center justify-evenly lg:p-5 space-y-5 md:space-y-0">
        {DATA.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center w-full"
          >
            <Image
              className="w-[12rem] lg:w-[17rem] object-contain"
              src={`/about/Person${item.id}.png`}
              staticUrl={require(`../../assets/images/about/Person${item.id}.png`)}
              alt="logo"
            />
            <h1 className="mt-10 mb-2 text-size-6 lg:text-size-10 font-henriette text-gray-900 font-black tracking-[0.6px]">
              {item.name}
            </h1>
            <h2 className="text-size-4 lg:text-size-6">{item.designation}</h2>
          </div>
        ))}
      </div>
      <Image
        src={'/about/LongArrowRight.png'}
        className="h-3 md:h-5 float-right cursor-pointer"
        staticUrl={require("../../assets/images/about/LongArrowRight.png")}
        alt="arrow"
      />
    </div>
  );
};

export default Team;
