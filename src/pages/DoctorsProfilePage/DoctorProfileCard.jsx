import React from "react";
import DoctorImage from "../../components/DoctorImage";
import Image from "../../components/Image";
import useImageCache from '../../hooks/useImageCache'
const DoctorProfileCard = ({ info }) => {
  const imgUrl = useImageCache(info?.doctor_image)

  return (
    <div className="flex flex-col  sm:flex-row min-h-[30rem] space-y-10 sm:space-y-0">
      <div className="flex md:w-96">
        <DoctorImage
          src={imgUrl}
          alt={info.doctor_name}
          className="w-full h-[25rem] md:w-[92%] md:h-[25.5rem] rounded-[20px] object-cover" 
        />
      </div>
      <div className="xl:-ml-2 space-y-3 text-sm flex flex-col items-start md:pl-4 sm:ml-5 md:ml-0 sm:w-[60%] md:w-[50%] xl:w-[54%]">
        <p className="text-size-10 font-henriette text-gray-900 font-black tracking-[0.6px]">
          {info?.doctor_name}
        </p>
        <div
          className="text-size-6 flex flex-row items-start md:items-center justify-start 
    font-basic-sans-regular mt-1"
        >
          <p className="sm:pr-2">{info.medical_speciality.join(", ")}</p>
        </div>
        <p className="text-size-4 flex flex-row items-start md:items-center justify-start 
    font-basic-sans-regular mt-1">{info.country.join(", ")}</p>

        <p className="text-size-6 md:text-size-3 font-basic-sans-regular font-light mt-2">
          {info.education}
        </p>
        <div className="flex flex-row items-center justify-start font-basic-sans-regular text-sm">
          <Image
            src={'/icons/Language.png'}
            staticUrl={require("../../assets/images/specialities/Language.png")}
            className="h-8"
            alt="Lng"
          />
          <p className="pl-2 text-size-6 whitespace-nowrap ">
            {info?.languages_spoken?.join(", ")}
          </p>
        </div>
        <div className="flex flex-row items-center justify-start font-basic-sans-regular text-sm">
          <Image
            src={'/icons/In-person.png'}
            staticUrl={require("../../assets/images/specialities/In-person.png")}
            className="h-8"
            alt="Lng"
          /> 
          <p className="pl-3.5 whitespace-nowrap text-size-6">{info.available_in.join(",  ")}</p>
        </div>
        <div className="space-y-2 pt-3">
          <p className="text-xl text-gray-900 font-henriette font-black tracking-[1px]"> {/* made text size xl from 2xl --> Ubaid */}
            Insurance
          </p>
          <p className="text-gray-800 text-lg font-basic-sans-regular ">
            {info?.insurance_company.length > 0
              ? info?.insurance_company?.join(", ")
              : "Not Available"}
          </p>
        </div>
        <div className="space-y-2 pt-3">
          <p className="text-xl text-gray-900 font-henriette font-black tracking-[1px] "> {/* made text size xl from 2xl --> Ubaid */}
            Education
          </p>
          <p className="text-gray-800 w-full md:w-96 text-lg font-basic-sans-regular">
            {info?.institute_attended}
          </p>
        </div>
        {/* <div className="space-y-2">
                    <p className="text-2xl text-gray-900 font-henriette font-black tracking-[1px]">
                        Education
                    </p>
                    <p className="text-gray-800 text-lg font-basic-sans-regular">
                        Medical School - St. George's University School of Medicine,
                        Doctor of     
                    </p>
                </div> */}
      </div>
    </div>
  );
};

export default DoctorProfileCard;
