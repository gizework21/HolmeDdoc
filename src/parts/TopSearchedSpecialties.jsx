import React from "react";
import { useNavigate } from "react-router-dom";
import ComplexSvgContainer from "../components/ComplexSvgContainer";
import LandingPageTitle from "./LandingPageTitle";
import Container from "../components/Container";
import { SPECIALITIES } from "../data/specialities";
import useWindowWidth from "../hooks/useWindowWidth";
import { useSelector } from 'react-redux'
import Image from '../components/Image'

function TopSearchedSpecialties(props) {
  const navigate = useNavigate();
  const { isLargeScreen, isLgScreen, isMdScreen } = useWindowWidth()
  const featuredSpecialities = useSelector(state => state.master?.featuredSpecialities ?? [])
  let noOfSpecialities = 6
  if(isLargeScreen || isLgScreen){
    noOfSpecialities = 4
  }


  const navigateToSpecialities = () => {
    navigate("/specialties");
  };

  return (
    <Container isFilter>
      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-center tracking-[0.25rem]">
          <LandingPageTitle center>Holistic fields</LandingPageTitle>
          <div className="text-size-5  md:text-subtitleLg text-gray-800 font-basic-sans-regular font-bold mt-2 mb-8 md:my-0 md:mt-6">
            15 + Specialties
          </div>
        </div>

        <div
          className="hidden pb-4 md:flex flex-row  justify-end items-center 
      font-basic-sans-regular text-[#eba134]"
        >
          <button
            className="text-small tracking-[0.2rem]"
            onClick={navigateToSpecialities}
          >
            {" "}
            See More
          </button>
        </div>
      <div className="mt-5 md:mt-20 pb-6 w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 grid-flow-row gap-2 justify-between">
        {featuredSpecialities.filter((item, idx) => idx < noOfSpecialities).map(({ title, description, img_url, id, seo_url }, key) => {
          // const image = require(`../assets/images/specialities/${img}.png`)

          return (
            <ComplexSvgContainer
              name={title}
              key={id}
              id={id}
              seo_url={seo_url}
              details={description}
              titleHeight={'lg:h-[10rem]'}
              shadowOnHover
              width={"md:max-w-[20rem]"}
              padding
            >
            <div className='h-[6rem] w-[6.5rem] sm:w-auto  md:h-[5rem]  lg:h-[9.5rem] md:self-start'>
              <Image
                fullSrcUrl={img_url}
                className="h-full object-contain"
                alt="speciality"
                staticUrl={require('../assets/images/specialities/Default.png')}
              />
            </div>
            </ComplexSvgContainer>
          );
        })}
      </div>
        <div className="block text-right py-2 md:hidden text-golden">
          <button
            onClick={navigateToSpecialities}
            className="text-size-3 tracking-[0.15rem]"
          >
            {" "}
            See More
          </button>
        </div>
      </div>
    </Container>
  );
}

export default TopSearchedSpecialties;
