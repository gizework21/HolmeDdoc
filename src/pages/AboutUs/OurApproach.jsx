import React from "react";
import Image from "../../components/Image";
import Header from "./Header";

const DATA = [
  {
    id: 1,
    title: "Connect",
    content:
      "Seamless way for patients to search for holistic providers and schedule appointments directly from the platform!",
  },
  {
    id: 2,
    title: "Trust",
    content:
      "HIPAA compliant and secure platform dedicated to holistic medicine which will connect patients with top rated holistic providers!",
  },
  {
    id: 3,
    title: "Transparency",
    content:
      "Open and honest communications with patients, providers, and partners!",
  },
];

const OurApproach = () => {
  return (
    <div className="p-5 md:px-20 md:py-16">
      <Header>Our approach to healthcare</Header>
      <div className="flex flex-col md:flex-row items-start justify-evenly lg:p-5 space-y-5 md:space-y-0">
        {DATA.map((item) => (
          <div
            key={item.id}
            className="w-full lg:w-[30%] relative flex flex-col items-center justify-between p-5"
          >
            <div className={"h-[8rem]"}>
              <Image
                src={`/about/Approach${item.id}.png`}
                className={`${
                  item.id === 1 ? `w-[5.5rem] h-[5.5rem]` : "w-[7rem] h-[6rem]"
                } object-contain`}
                staticUrl={require(`../../assets/images/about/Approach${item.id}.png`)}
                alt="logo"
              />
            </div>
            <h1 className="h-[2.5rem] md:h-[3rem] md:mb-4 mt-4 md:mt-5 text-size-6 lg:text-size-10 font-basic-sans-regular text-gray-900 font-black tracking-[0.6px]">
              {item.title}
            </h1>
            <h2 className="text-size-4 lg:text-size-6 text-center text-gray-500">
              {item.content}
            </h2>
            {item.id !== 3 && (
              <div className="hidden md:block h-[10rem] w-[2px] bg-gray-300 absolute right-0 translate-y-[25%]"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurApproach;
