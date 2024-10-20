import React from "react";
import Container from "../../components/Container";
import GreenButton from "../../components/GreenButton";
import Image from "../../components/Image";
import Header from "./Header";
import { useSelector } from "react-redux";
// import ImageLazy from '../../components/ImageLazy'

const AboutHolmeddoc = () => {
  const aboutUsContent = useSelector((state) => state.generalSettings?.data?.aboutUs);
  return (
    <div className="p-5 md:px-20 md:py-16">
      <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-20">
        <div className="lg:w-[50%] xl:w-[45%] order-2 lg:order-1">
          <Header>Know about Holmeddoc</Header>
          <div className="text-lg text-gray-500 font-thin mb-10 lg:w-[90%]" dangerouslySetInnerHTML={{ __html: aboutUsContent }} />
          {/* <h1 className="text-lg text-gray-500 font-thin mb-10 lg:w-[90%]">
            Every individual is built differently though we have the same treatment for everyone. Traditional medicine is focused on symptoms rather than considering the root causes of the disease. There are 133 million Americans who suffer from chronic conditions, and it is a vicious cycle where a provider prescribes different medicines every time until they find the one that works.
            <br />
            In the quest for optimal health and wellness, Providers need to understand the root cause behind the illness and provide a science-based individualized holistic approach to a patient’s health to cure or manage the disease. But the challenge we see is that either people are not aware of the availability of holistic care options or there is no authoritative source that will provide access to the highest rated holistic practitioners. We want to bridge this gap by providing a platform to connect the patients and holistic providers. We want to help patients with chronic conditions find holistic cure!
            <br />
            Introducing <span className="font-black">Holmeddoc</span> – Connecting patients to the best rated Holistic Practitioners! 
          </h1> */}
          {/* <GreenButton additionalStyles={"w-[15rem]"}>Know More</GreenButton> */}
        </div>
        <Image
          src={'/about/doctorpatient.png'}
          className="lg:w-[50%] object-contain order-1 lg:order-2 mb-10 lg:mb-0"
          staticUrl={require("../../assets/images/about/doctor-patient.png")}
          alt="about"
            
        />
      </div>
    </div>
  );
};

export default AboutHolmeddoc;

// import React from 'react'
// import Container from '../../components/Container'
// import GreenButton from '../../components/GreenButton'
// import Header from './Header'

// const AboutHolmeddoc = () => {
//   return (
//     <div className='p-20'>
//         <div className='grid lg:grid-cols-11 items-center gap-x-10'>
//             <div className='lg:col-span-6 order-2 lg:order-1'>
//                 <Header>Know about Holmeddoc</Header>
//                 <h1 className='text-lg text-gray-500 font-thin mb-10'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit veniam eaque assume omnis sit ex, illo asperiores laborum quidem mollitia impedit blanditiis laborim tempore cum eligendi! Et laboriosam qui animi itaque dolores labore asperiores pariatur accusant corrupti, velit enim eaque. Quia ipsam quo eaque facere, officiis perferendis laborum soluta archit dolor nemo sit error! Eveniet sit earum mollitia esse voluptatibus.</h1>
//                 <GreenButton>Know More</GreenButton>
//             </div>
//             <img className='md:h-[25rem] md:w-full lg:h-auto lg:col-span-5 lg:object-contain order-1 lg:order-2 mb-10' src={require('../../assets/images/about/doctor-patient.png')} alt="about"/>
//         </div>
//     </div>
//   )
// }

// export default AboutHolmeddoc
