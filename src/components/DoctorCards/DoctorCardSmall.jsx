import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useImageCache from '../../hooks/useImageCache';
import customAxios from "../../utils/CustomAxios";
import DoctorImage from "../DoctorImage";
import HolmeddocLoader from "../HolmeddocLoader";

const DoctorCardSmall = ({ selectedAppointment }) => {
  const navigate = useNavigate();

  const [doctorImage, setDoctorImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const token = localStorage.getItem('persist:root');

 


  // ! doctor image was hardcoded added from api --> Ubaid
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const result = await customAxios.post("/patient/doctors", {
          id: [selectedAppointment.doctorId],
        });

        // console.log("reached");
        // console.log("result", result.data?.data?.result)
        setDoctorImage(result.data?.data?.result);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    })();
  }, [selectedAppointment.doctorId]);

  console.log(doctorImage[0])


  const imgUrl = useImageCache(doctorImage[0]?.doctor_thumb_image)

  return (
    <div
      className="cursor-pointer flex flex-row items-start justify-start md:w-full md:space-x-5"
      onClick={() => navigate(`/doctor/${doctorImage[0]?.seo_url}`)}
    >
      {isLoading === true ? (
        <div className="w-32 h-12 flex justify-center items-center">
          <HolmeddocLoader />
        </div>
      ) : (
        <DoctorImage
          src={imgUrl}
          alt={selectedAppointment?.name}
          className="rounded-[20px]
justify-center xs:justify-start w-24"
        />
      )}
      <div
        className="space-y-2 text-sm flex flex-col items-start lg:py-5 py-0 mx-0 my-3 md:my-0 md:py-3 
justify-self-start w-full pl-4"
      >
        <p className="text-[1rem] text-gray-900">{selectedAppointment?.name}</p>
        <div
          className="text-size-3 text-gray-400 font-thin flex flex-row items-start md:items-center justify-start 
font-basic-sans-regular"
        >
          <p className="pr-2">{doctorImage[0]?.medical_speciality.join(',  ')}, &nbsp; {doctorImage[0]?.country.join('  , ')}</p>
        </div>
      </div>
    </div>
  );
};
export default DoctorCardSmall;
