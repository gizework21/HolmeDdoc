// import React from "react";
// import "../App.css";
// import appSection from "../assets/images/home/Mobile.png";
// import qr from "../assets/images/qr.png";
// import AppButton from "../components/AppButton";
// import apple1 from "../assets/images/apple1.svg";
// import googleplay1 from "../assets/images/googleplay1.svg";
// import Container from '../components/Container'
// import LandingPageTitle from "./LandingPageTitle";

// function NewDownloadApp() {
//   return (
//     <Container>
//     <div className="grid md:grid-cols-2 grid-cols-1 text-gray-900">
//       <div className="w-full flex flex-col md:justify-start md:items-start justify-center items-center mt-4 md:mt-10">
//         {/* <h2 className="text-2xl lg:text-4xl text-slate-700 font-sharp-sans-bold mb-6 tracking-[.2rem]">
//           Download Holmeddoc Mobile App
//         </h2> */}
//         <div className={`font-basic-sans-regular font-bold
//         text-size-11 md:text-3xl md:text-large tracking-widest text-center text-gray-900 md:text-left md:leading-[5.4rem] w-[100%] lg:w-[90%]`}>
//           Download Holmeddoc
//           Mobile App
//         </div>
//         <div className="text-size-6 leading-[1.8rem] md:leading-none md:text-size-2 lg:text-size-7 font-basic-sans-regular text-paragraphColor space-y-5 md:space-y-10 mt-8 pl-6 lg:pt-8 md:whitespace-nowrap">
//           <p>
//             Seamless way to find and book appointments for a holistic cure.
//           </p>
//           <p>
//             Search based on speciality and select the doctor you wish to
//             continue with.
//           </p>
//           <p>
//             Select the date and time based on the availability and book the
//             appointment.
//           </p>
//           <p>Get online/In-person consultation from Doctors near you.</p>
//           <div className="md:my-8 lg:my-10 flex flex-row md:justify-start justify-center my-6 items-center">
//             <div className="flex items-center justify-center space-x-5">
//               <img
//                 // src="https://placehold.jp/150x40.png"
//                 src={apple1}
//                 className="mt-1 w-[6rem] md:w-[9rem] cursor-pointer"
//                 alt=""
//               />
//               <img
//                 // src="https://placehold.jp/150x40.png"
//                 src={googleplay1}
//                 alt=""
//                 className="mt-1 w-[6rem] md:w-[9rem] cursor-pointer"
//               />
//             </div>
//           {/* <AppButton /> */}
//         </div>
//         </div>
//       </div>
//       <div className="flex items-center lg:items-end justify-center md:justify-end xl:justify-center mt-10 xl:mt-10">
//         <img src={appSection} alt="" className="w-[18rem] md:w-[80%] lg:w-[85%] xl:w-[85%]" />
//       </div>
//     </div>
//     </Container>
//   );
// }

// export default NewDownloadApp;

import React from "react";
import "../App.css";
import appSection from "../assets/images/home/Mobile.png";
import qr from "../assets/images/qr.png";
import AppButton from "../components/AppButton";
import apple1 from "../assets/images/apple1.svg";
import googleplay1 from "../assets/images/googleplay1.svg";
import Container from '../components/Container'
import LandingPageTitle from "./LandingPageTitle";
import Image from "../components/Image";

function NewDownloadApp() {
  return (
    <Container>
    <div className="grid md:grid-cols-2 grid-cols-1 text-gray-900">
      <div className="w-full flex flex-col md:justify-start md:items-start justify-center items-center mt-4 md:mt-10">
        {/* <h2 className="text-2xl lg:text-4xl text-slate-700 font-sharp-sans-bold mb-6 tracking-[.2rem]">
          Download Holmeddoc Mobile App
        </h2> */}
        <div className={`font-basic-sans-regular font-bold
        text-size-11 md:text-3xl xl:text-large tracking-widest text-center text-gray-900 md:text-left md:whitespace-nowrap xl:whitespace-normal  xl:leading-[5.4rem] w-[100%] lg:w-[90%]`}>
          Download Holmeddoc
          Mobile App
        </div>
        <div className="text-size-6 leading-[1.8rem] lg:leading-none md:text-size-2 lg:text-size-7 font-basic-sans-regular text-paragraphColor space-y-5 sm:space-y-3 lg:space-y-5 xl:space-y-10 mt-8 pl-6 lg:pt-8 xl:whitespace-nowrap">
          <p>
            Seamless way to find and book appointments for a holistic cure.
          </p>
          <p>
            Search based on speciality and select the doctor you wish to
            continue with.
          </p>
          <p>
            Select the date and time based on the availability and book the
            appointment.
          </p>
          <p>Get online/In-person consultation from Doctors near you.</p>
          <div className="md:my-8 lg:my-10 flex flex-row md:justify-start justify-center my-6 items-center">
            <div className="flex items-center justify-center space-x-5">
              <Image
                src={'/home/apple1.svg'}
                staticUrl={apple1}
                className="mt-1 w-[6rem] md:w-[9rem]"
                alt=""
              />
              <Image
                src={'/home/gp.png'}
                staticUrl={googleplay1}
                alt=""
                className="mt-1 w-[6rem] md:w-[9rem]"
              />
            </div>
          {/* <AppButton /> */}
        </div>
        </div>
      </div>
      <div className="flex items-center lg:items-end justify-center md:justify-end xl:justify-center mt-10 xl:mt-10">
        <Image src={'/home/Mobile.png'} staticUrl={appSection} alt="" className="w-[18rem] md:w-[80%] lg:w-[85%] xl:w-[85%]" />
      </div>
    </div>
    </Container>
  );
}

export default NewDownloadApp;


//today i did testing and resolved issues i found i have mentioned them on sheet
//i also completed all the changes that were suggested 

// i have not updated sheet with last 1 our task