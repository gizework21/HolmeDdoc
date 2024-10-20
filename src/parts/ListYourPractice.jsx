import React from "react";
import Practice from "../assets/images/home/Practice.png";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import { DoctorRegister } from "../data/urls";
import Image from "../components/Image";

// const ListYourPractice = () => {
//   return (
//     <Container bgColor={"[#e6ffff]"}>
//         <div className='bg-[#e6ffff] grid md:grid-cols-2 gap-3 justify-items-center md:justify-items-start text-black'>
//             <img src={Practice} alt="Pratice" className="h-[18rem] lg:h-[22rem]"/>
//             <div className="space-y-12 flex items-center flex-col md:items-start">
//                 <h1 className='text-3xl lg:text-5xl font-normal lg:leading-[3.5rem]	text-center md:text-left'>List your Practice and enhance your reach</h1>
//                 <ul className='space-y-5 md:space-y-8 md:pl-4 text-[grey] text-center md:text-left'>
//                     <li>Get onboared and allow use to connect the patient with you</li>
//                     <li>Answer medical queries & showcase your expertise</li>
//                     <li>Grow your reach and experience</li>
//                 </ul>
//                 <button className='text-white bg-green rounded-full px-8 py-2'>List your practice on Holmedoc</button>
//             </div>
//         </div>
//     </Container>
//   )
// }

// export default ListYourPractice

const ListYourPractice = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-blueBg md:h-[29rem] lg:h-[32rem] xl:h-[38rem] grid md:grid-cols-2 items-center justify-center text-black px-10 font-basic-sans-regular">
      <Image
        src={"/home/Practice.png"}
        staticUrl={Practice}
        alt={'Practice'}
        className="md:h-[30rem] lg:h-[34rem] xl:h-[40rem] mt-[-2rem] sm:-mt-[1rem] lg:mt-[-2rem]"
      />
      {/* <img src={Practice} alt="Pratice" className="md:h-[30rem] lg:h-[34rem] xl:h-[40rem] mt-[-2rem] sm:-mt-[1rem] lg:mt-[-2rem]"/> */}
      <div className="space-y-6 md:space-y-5 xl:space-y-12 pb-5  flex items-center flex-col md:items-start">
        <h1 className="mt-5 lg:mt-0 text-size-8 md:text-3xl lg:text-medium font-normal lg:leading-[3.5rem] tracking-widest text-left">
          Let's connect your practice
        </h1>
        <ul className="space-y-2 xl:space-y-8 md:pl-4 text-[grey] leading-[2rem] md:leading-[2.8rem] xl:leading-none text-size-4 md:text-xl font-light text-left">
          <li>Get onboarded and allow us to connect the patient with you.</li>
          <li>Answer medical queries & showcase your expertise.</li>
          <li>Grow your reach and experience.</li>
        </ul>
        <button
          onClick={() => navigate(DoctorRegister)}
          className="text-white bg-green rounded-full px-5 md:px-9 py-2 md:py-3 w-full md:w-auto text-size-5 md:text-size-6"
        >
          List your practice on Holmeddoc
        </button>
      </div>
    </div>
  );
};

export default ListYourPractice;
