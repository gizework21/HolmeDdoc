import React from "react";
import ComplexSvgContainer from "../../components/ComplexSvgContainer";
import useWindowWidth from "../../hooks/useWindowWidth"
// import { SPECIALITIES } from '../../data/specialities'
import { useSelector } from 'react-redux'
import Image from "../../components/Image";
import useImageCache from '../../hooks/useImageCache'
import SpecialityContainer from './SpecialityContainer'

function SpecialityPage() {
  // const { isLgScreen, isMdScreen } = useWindowWidth()
  const specialities = useSelector(state => state.master?.specialities)

  return (
    <div className="w-full flex lg:justify-center lg:items-center">
      <div className="xl:max-w-[1600px] pb-[100px]">
        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-center tracking-[0.25rem] md:mt-12">
            <div className="mt-5 pt-10 md:pt-16">
              <h1
                className="font-basic-sans-bold leading-[70px] font-bold
    text-3xl md:text-[32px] text-gray-900 tracking-[7.8px] text-center "
              >
                Specialty
              </h1>
            </div>
            <div className="mt-4 px-2 sm:px-5 lg:px-0">
              <p className="text-gray-500	font-basic-sans-regular md:text-base text-size-6 text-center md:mb-10 mb-8 tracking-[1.5px]">
                Every medical specialist shares one common goal: to help
                patients get healthy or stay healthy. But each one has very
                specific skills and <br className="hidden specialityMd:block" />{" "}
                competencies that make them an integral member of the medical
                field. <br className="hidden specialityMd:block" />{" "} Browse
                through each specialist and select as per your need.
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center px-5 md:px-0">
            <div className="md:max-w-[90%] mt-10 md:mt-20 pb-6 w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-2 justify-between justify-items-center">
              {specialities.map((item, key) => <SpecialityContainer {...item} key={key}/>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialityPage;
