import React from "react";
import Image from "../../components/Image";

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const ProfileTable = ({ profileDetails }) => {
  return (
    <div className="border-green min-h-[448px] border w-[99%] px-5 lg:px-2 xl:px-6 xl:pb-5 xl:pt-6 flex flex-col rounded-[20px]">
      <h1 className="text-xl sm:text-2xl font-bold self-center py-7 text-gray-800 tracking-[1px] font-henriette">
        {profileDetails.patient_first_name +
          " " +
          profileDetails.patient_last_name}
      </h1>
      <div className="my-2 grid grid-cols-2 md:grid-cols-4  items-end border border-green rounded-[5px] text-gray-900">
        <div className="h-[4.2rem] pt-2 flex flex-col items-center justify-center  space-y-2 border-b md:border-b-0 border-r border-green">
          <Image
            className="h-7"
            src={
              profileDetails.patient_gender === "M"
                ? "/icons/Frame266.png"
                : profileDetails.patient_gender === "F"
                ? "/icons/Frame264.png"
                : "/icons/Frame265.png"
            }
            staticUrl={
              profileDetails.patient_gender === "M"
                ? require("../../assets/images/icons/Frame 266.png")
                : profileDetails.patient_gender === "F"
                ? require("../../assets/images/icons/Frame 264.png")
                : require("../../assets/images/icons/Frame 265.png")
            }
            alt={
              profileDetails.patient_gender === "M"
                ? "Male"
                : profileDetails.patient_gender === "F"
                ? "Female"
                : "OTHER"
            }
          />
          <span className="text-size-1 pb-1 tracking-[0.5px] text-gray-700 font-semibold uppercase">
            {profileDetails.patient_gender === "M"
              ? "Male"
              : profileDetails.patient_gender === "F"
              ? "Female"
              : "OTHER"}
          </span>
        </div>
        <div className="h-[4.2rem] pt-2 flex flex-col items-center justify-center  space-y-2 border-b md:border-b-0 md:border-r  border-green">
          <Image
            src={"/profile/Group 2141.png"}
            className="h-7"
            staticUrl={require("../../assets/images/profile/Cake.png")}
            alt="phone"
          />
          <span className="text-size-1 pb-1 tracking-[0.5px] text-gray-700 font-semibold">
            {getAge(profileDetails.patient_dob)} YEARS
          </span>
        </div>
        <div className="h-[4.2rem] pt-1 flex flex-col items-center justify-center  space-y-2  border-r border-green">
          <Image
            src={"/profile/Number.png"}
            className="h-7"
            staticUrl={require("../../assets/images/profile/Number.png")}
            alt="phone"
          />
          <span className="text-size-1 pb-1 tracking-[0.5px] text-gray-700 font-semibold">
            {profileDetails.patient_phone}
          </span>
        </div>
        <div className="h-[4.2rem] pt-1 flex flex-col items-center justify-center  space-y-1">
          <Image
            src={"/profile/Mail.png"}
            className="h-7"
            staticUrl={require("../../assets/images/profile/Mail.png")}
            alt="phone"
          />
          <span className="text-size-1 pb-1 pr-1 text-center pl-1 text-ellipsis overflow-hidden break-all tracking-[0.5px] text-gray-700 font-semibold">
            {profileDetails.patient_email}
          </span>
        </div>
      </div>
      <div className="py-7 pt-5 px-2 md:px-6 mt-5 border-t">
        <div className="flex items-center space-x-5 py-2">
          <div className="basis-[15%] md:basis-[12%]">
            {/* <div className='h-12 w-12 rounded-full bg-lightgrey flex items-center justify-center'>
                                            <img className='h-8' src={require("../../assets/images/profile/Address.png")} alt="phone"/>
                                        </div> */}
            <div className="flex items-center justify-center">
              <Image
                src={'/profile/Address.png'}
                className="h-full object-contain"
                staticUrl={require("../../assets/images/profile/Address.png")}
                alt="phone"
              />
            </div>
          </div>
          <div className="text-[1rem] flex-1 font-light space-y-1">
            <h1 className="text-gray-400 font-thin text-size-5">Address</h1>
            <p>
              {profileDetails.address1
                ? profileDetails.address1
                : "Not Updated"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-5 py-2 pt-4">
          <div className="basis-[15%] md:basis-[12%]">
            {/* <div className='h-12 w-12 rounded-full bg-lightgrey flex items-center justify-center'>
                                            <MapPinIcon className='h-6 w-6' />
                                        </div> */}
            <div className="flex items-center justify-center">
              <Image
                src={'/profile/Insurance.png'}
                className="h-full object-contain"
                staticUrl={require("../../assets/images/profile/Insurance.png")}
                alt="phone"
              />
            </div>
          </div>
          <div className="text-[1rem] flex-1 font-light space-y-1">
            <h1 className="text-gray-400 font-thin text-size-5">
              Insurance Details
            </h1>
            <p>
              {profileDetails.insurance_company
                ? profileDetails.insurance_company
                : "Not Updated"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTable;