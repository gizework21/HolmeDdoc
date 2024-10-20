import React from "react";
import Image from "../components/Image";
import { AvailabilityDayDates } from "../utils/DummyData";
import AvailabilityDayDate from "./Availability/AvailabilityDayDate";

function DoctorDesc(props) {
  const { src, name, profession, location, education, languages, visitMode } =
    props.info;
  const image = require(`../assets/images/specialities/${src}.png`)

  

  return (
    <div className="w-full grid grid-cols-12 gap-0 md:gap-3 lg:gap-0">
      <img
        src={image}
        alt="doctor,name"
        className=" col-span-12 xs:col-span-4 lg:col-span-2 rounded-[20px] shadow-md 
        justify-center xs:justify-start h-auto w-48 xs:h-auto xs:w-48 md:w-48 lg:w-48"
      />
      <div className="gap-2 text-sm flex flex-col items-start lg:py-5 py-0 my-3 md:my-0 md:py-3 col-span-12 xs:col-span-8 lg:col-span-4 
      xl:col-span-3 justify-self-start ml-5">
        <p className="text-size-9 font-henriette text-gray-900 font-black tracking-[0.6px]">{name}</p>
        <div className="text-size-6 flex flex-row items-start md:items-center justify-start 
        font-basic-sans-regular mt-1">
          <p className="pr-2">{profession}</p>
          <p>{location}</p>
        </div>
        <p className="text-size-4 font-basic-sans-regular font-light mt-2">{education}</p>
        <div className="flex flex-row items-center justify-start font-basic-sans-regular text-sm">
          <Image src={'/icons/Language.png'} staticUrl={require("../assets/images/specialities/Language.png")} className="h-8" alt="Lng" />
          <p className="pl-2 text-size-6">{languages.join(", ")}</p>
        </div>
        <div className="flex flex-row items-center justify-start font-basic-sans-regular text-sm">
          <Image src={'/icons/In-person.png'} staticUrl={require("../assets/images/specialities/In-person.png")} className="h-8" alt="Lng" />
          <p className="pl-3.5 text-size-6">{visitMode.join(", ")}</p>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-6 xl:col-span-6 mt-3 md:mt-4 xl:pl-8">
        <AvailabilityDayDate
          availability={AvailabilityDayDates}
          selectDate={() => {}}
          selectedDate={0}
        />
        <div className="mt-6 flex flex-col md:flex-row items-center justify-start">
          <button className="py-3 px-7 mr-6 rounded-full uppercase bg-green text-white btn-wordspace">
            Schedule an appointment
          </button>
          <button className="text-size-7 underline text-golden pt-4 md:pt-0">
            {"View More"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorDesc;


// import React from "react";
// import SearchFilter from "../components/SearchFilter";
// import DoctorDesc from "../components/DoctorDesc";
// import DoctorInfo from "../data/doctorInfoList";
// import {
//   languages,
//   specialties,
//   insurance,
//   appointmentType,
//   conditions,
// } from "../data/filterData";
// import Drawer from "../components/Drawer";
// import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
// import useWindowWidth from "../hooks/useWindowWidth";
// import NavbarWithFilter from "../parts/NavbarWithFilter";
// import NewFooter from "../parts/NewFooter";
// import Paginate from "../components/Paginate";
// import { useState } from "react";

// function DoctorSearchListing(props) {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const { isSmallScreen } = useWindowWidth();

//   const [filters, setFilters] = useState({
//     languages: [],
//     specialities: [],
//     insurance: [],
//     appointmentType: [],
//     conditions: [],
//   });

//   const handleChange = (filterName, selected) => {
//     let tempFilters = { ...filters };
//     tempFilters[filterName] = selected;
//     setFilters(tempFilters);
//     console.log("tempFilters ", tempFilters)
//   };

//   return (
//     <>
//       <div className="max-w-[100vw]">
//         <NavbarWithFilter />
//       </div>
//       <div className="w-full flex lg:justify-center lg:items-center">
//         <div className="xl:min-w-full p-1 md:pt-6 md:px-6 xl:px-10">
//           <h1 className="font-basic-sans-regular leading-[70px] font-bold
//     text-3xl md:text-[24px] text-gray-800 tracking-[2px] py-2">We have found 75 Doctors for your search criteria.</h1>
//           <div className=" flex flex-col md:flex-row items-start justify-start h-full">
//             <div className="flex flex-col items-start justify-start col-span-3 lg:col-span-2 p-1 sm:p-2 sm:pr-1">
//               <div className="text-size-8 font-basic-sans-regular font-normal flex flex-row items-center justify-start">
//                 <p className="tracking-[3px] text-gray-900">Filters</p>
//                 {isSmallScreen && (
//                   <button
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="pb-1 pl-2 text-green"
//                   >
//                     {isOpen ? (
//                       <AiOutlineMinusCircle size={18} />
//                     ) : (
//                       <AiOutlinePlusCircle size={18} />
//                     )}
//                   </button>
//                 )}
//               </div>
//               <div className=" mt-0 md:block hidden h-full border-gray-300">
//                 <SearchFilter
//                   list={languages}
//                   showLimit={3}
//                   title={"Languages"}
//                   returnNewList={(list) => {
//                     console.log("list ", list);
//                     handleChange("languages", list);
//                   }}
//                 />
//                 <SearchFilter
//                   list={specialties}
//                   showLimit={5}
//                   title={"Speciality"}
//                   returnNewList={(list) => {
//                     console.log("list ", list);
//                     handleChange("specialities", list);
//                   }}
//                 />
//                 <SearchFilter
//                   list={conditions}
//                   showLimit={5}
//                   title={"Conditions"}
//                   returnNewList={(list) => {
//                     console.log("list ", list);
//                     handleChange("conditions", list);
//                   }}
//                 />
//                 <SearchFilter
//                   list={appointmentType}
//                   showLimit={5}
//                   title={"Appointment Type"}
//                   returnNewList={(list) => {
//                     console.log("list ", list);
//                     handleChange("appointmentType", list);
//                   }}
//                 />
//                 <SearchFilter
//                   list={insurance}
//                   showLimit={5}
//                   title={"Insurance"}
//                   returnNewList={(list) => {
//                     console.log("list ", list);
//                     handleChange("insurance", list);
//                   }}
//                 />
//               </div>
//               <Drawer
//                 isOpen={isOpen}
//                 setIsOpen={setIsOpen}
//                 isSmallScreen={isSmallScreen}
//               >
//                 <div className="p-4 mt-0 md:hidden block">
//                   <SearchFilter
//                     list={languages}
//                     showLimit={3}
//                     title={"Languages"}
//                     returnNewList={(list) => {
//                       console.log("list ", list);
//                       handleChange("languages", list);
//                     }}
//                   />
//                   <SearchFilter
//                     list={specialties}
//                     showLimit={5}
//                     title={"Speciality"}
//                     returnNewList={(list) => {
//                       console.log("list ", list);
//                       handleChange("specialities", list);
//                     }}
//                   />
//                   <SearchFilter
//                     list={insurance}
//                     showLimit={5}
//                     title={"Insurance"}
//                     returnNewList={(list) => {
//                       console.log("list ", list);
//                       handleChange("insurance", list);
//                     }}
//                   />
//                   <SearchFilter
//                     list={appointmentType}
//                     showLimit={5}
//                     title={"Appointment Type"}
//                     returnNewList={(list) => {
//                       console.log("list ", list);
//                       handleChange("appointmentType", list);
//                     }}
//                   />
//                   <SearchFilter
//                     list={conditions}
//                     showLimit={5}
//                     title={"Conditions"}
//                     returnNewList={(list) => {
//                       console.log("list ", list);
//                       handleChange("conditions", list);
//                     }}
//                   />
//                 </div>
//               </Drawer>
//             </div>
//             <div className="block md:flex flex-col w-full border-l md:pl-5">
//               <Paginate itemsPerPage={4}>
//                 {DoctorInfo.map((details, key) => (
//                   <div className={`m-2 pb-6 pt-6 ${key !== 3 && 'border-b'} border-gray-200`} key={key}>
//                     <DoctorDesc info={details} />
//                   </div>
//                 ))}
//               </Paginate>
//             </div>
//           </div>
//         </div>

//       </div>
//       <NewFooter />
//     </>
//   );
// }

// export default DoctorSearchListing;
