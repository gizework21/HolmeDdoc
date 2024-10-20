import { list } from "postcss";
import React, { useEffect, useState } from "react";
import image from "../assets/images/doctorCardImage.jpg";
import image1 from "../assets/images/doctorCardImage2.jpg";
import image2 from "../assets/images/doctorCardImage3.jpg";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import LandingPageTitle from "../parts/LandingPageTitle";
import useWindowWidth from "../hooks/useWindowWidth";
// import { HiArrowLongRight } from "react-icons/hi2";

function TopDoctors(props) {
  let { windowWidth } = useWindowWidth();
  let offset = 0;

  if ((windowWidth >= 1280) & (windowWidth < 1536)) {
    offset = 40;
  } else if ((windowWidth >= 1024) & (windowWidth < 1280)) {
    offset = 40;
  } else if ((windowWidth >= 768) & (windowWidth < 1024)) {
    offset = 30;
  } else if ((windowWidth >= 640) & (windowWidth < 768)) {
    offset = 20;
  } else {
    offset = 20;
  }

  const [listData, setListData] = useState([
    {
      src: image,
      top: offset + "px",
      left: offset + "px",
      zIndex: -2,
      name: "Test Name",
      profession: "Dentist",
      location: "New York, NY",
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      src: image1,
      top: 2 * offset + "px",
      left: 2 * offset + "px",
      zIndex: -1,
      name: "Test Name1",
      profession: "Dentist1",
      location: "New York, NY",
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      src: image2,
      top: 3 * offset + "px",
      left: 3 * offset + "px",
      zIndex: 0,
      name: "Test Name2",
      profession: "Dentist2",
      location: "New York, NY",
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ]);
  
  const handleNext = () => {
    let test = document.getElementById("test");
    let details = document.getElementById("details");
    let schedule = document.getElementById("schedule");

    let lastElement = test.lastChild; //top most element is last child

    lastElement.classList.add("animate-removeCard");
    // test.classList.add("animate-fadeOut");
    details.classList.add("animate-fadeOut");
    details.classList.remove("animate-fadeIn");
    schedule.classList.add("animate-fadeOut");
    schedule.classList.remove("animate-fadeIn");

    setTimeout(() => {
      let tempListData = [...listData];
      let lastData = tempListData.pop();
      tempListData.unshift(lastData);
      let tempList = tempListData.map((x, key) => {
        let temp = { ...x };
        temp.top = key * offset + offset;
        temp.left = key * offset + offset;
        temp.zIndex = key - 3;
        return temp;
      });

      setListData(tempList);
    }, 700);

    setTimeout(() => {
      lastElement.classList.remove("animate-removeCard");
      // test.classList.remove("animate-fadeOut");
      details.classList.remove("animate-fadeOut");
      details.classList.add("animate-fadeIn");
      schedule.classList.remove("animate-fadeOut");
      schedule.classList.add("animate-fadeIn");
    }, 700);
  };

  return (
    <div className="h-full w-full relative p-4 px-2 md:px-12 lg:px-24 pt-12">
      <div
        className="flex relative flex-row items-center
       justify-between md:pb-12"
      >
        <LandingPageTitle title="Doctors in Focus" />
        <div className=" md:hidden block w-min cursor-pointer">
          <HiOutlineArrowNarrowRight
            color="#52C3BF"
            size={32}
            onClick={handleNext}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 grid-flow-row px-1 sm:px-2 md:px-4 py-8  gap-1 md:gap-4 lg:gap-8">
        {[listData[listData.length - 1]].map(
          (elDetails, key) => {
            return (
              <div
                className="p-0 md:p-4 col-span-5 md:col-span-6 lg:pr-24
                flex items-start justify-end flex-col "
                id="details"
                key={key}
              >
                <h4 className="font-sharp-sans-bold pb-2 text-xl whitespace-nowrap">
                  {elDetails.name}
                </h4>
                <div
                  className="flex flex-col md:flex-row items-baseline text-sm md:text-md
                justify-start font-sharp-sans-semibold md:font-sharp-sans-bold pb-2 md:pb-4 pt-0"
                >
                  <h5 className="  pr-2">
                    {elDetails.profession}&nbsp;
                  </h5>
                  <h4 className=" ">
                    {elDetails.location}
                  </h4>
                </div>
                <p className="text-md text-gray-500 text-ellipsis line-clamp-6 md:line-clamp-none">
                  {elDetails.details}
                </p>
                <button
                  className="hidden sm:block text-xs md:text-lg bg-green text-white py-2 px-2 md:py-2 
                md:px-4 rounded-full my-4"
                >
                  Schedule an appointment
                </button>
              </div>
            );
          }
        )}
        <div
          className="relative col-span-7 md:col-span-6 lg:mr-20 -mt-8 md:-mt-20 lg:-mt-28"
          id="test"
        >
          {listData.map((elDetails, key) => {
            return (
              <div
                className="flex flex-row items-center justify-between pr-4"
                key={key}
              >
                <img
                  src={elDetails.src}
                  className="h-48 sm:h-64 md:h-80 lg:h-96 w-auto drop-shadow-xl shadow-inner rounded-md"
                  style={{
                    position: "absolute",
                    top: elDetails.top,
                    right: elDetails.left,
                    zIndex: elDetails.zIndex,
                  }}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="hidden  relative md:flex flex-row items-center
       justify-end md:mt-4 lg:mt-16 lg:mb-4 mr-8 cursor-pointer"
      >
        <HiOutlineArrowNarrowRight
          color="#52C3BF"
          size={32}
          onClick={handleNext}
        />
      </div>
      <div
        className="flex items-center justify-center w-full "
        id="schedule"
      >
        <button className=" block sm:hidden text-xs  bg-green text-white py-2 px-6 rounded-full my-4">
          Schedule an appointment
        </button>
      </div>
    </div>
  );
}

export default TopDoctors;
