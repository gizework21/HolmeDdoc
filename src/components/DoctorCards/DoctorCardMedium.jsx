import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import useQuery from "../../hooks/useQuery";
import customAxios from "../../utils/CustomAxios";
import HolmeddocLoader from "../HolmeddocLoader";
import DoctorImage  from '../DoctorImage'
import useImageCache from '../../hooks/useImageCache'
import { useParams } from "react-router-dom";
import { decrypt } from "../../utils/crypto";

const DoctorCardMedium = ({ info, ref, setDoctorEmail }) => {

  const { enqueueSnackbar } = useSnackbar();

  const query = useQuery();
  const id = query.get("doctor_id");

  // ! getting encrypted array from url params
  const {bookingId} = useParams()

  // ! decrypt the array to get doctors id
  const arr = decrypt(bookingId)


  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // ! getting doctors id from url and hitting the api to get single doctors details then map the image accordingly --> Ubaid.
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const result = await customAxios.post("/patient/doctors", { id: [arr[0]] });
        setData(result.data.data.result);
        setDoctorEmail(result.data.data.result[0].doctor_email)
        setIsLoading(false);
      } catch (err) {
        enqueueSnackbar(err.message, { variant: "error" });
        setIsLoading(false);
      }
    })();
  }, []);
  const imgUrl = useImageCache(data[0]?.doctor_thumb_image)

  console.log(info)
  console.log(data)

  return (
    <div className="flex space-x-4 md:space-x-8 items-center mb-12" ref={ref}>
      {isLoading === true ? (
        <div className="h-full w-full md:h-32 md:w-32 flex justify-center">
          <HolmeddocLoader />
        </div>
      ) : (
        <DoctorImage
          src={imgUrl}
          className="h-24 w-24 md:h-32 md:w-32 rounded-2xl md:rounded-md object-contain"
          alt="doctor"
        />
      )}
      <div className="flex flex-col">
        <p className="text-size-5 xsm:text-size-7 md:text-size-10 font-henriette text-gray-900 font-black tracking-[0.6px]">
          {info.name}
        </p>
        <div
          className="text-size-4 md:text-size-6 flex flex-col xsm:flex-row items-start md:items-center justify-start 
          font-basic-sans-regular mt-1"
        >
          {/* <p className="pr-2">Dentist,</p>
          <p>{info.address}</p> */}
          <p className="pr-2">{info.speciality.join(", ")}, </p>
        </div>
        <p className="text-size-4 font-basic-sans-regular font-light mt-2">
          {data[0]?.education.join(", ")},{" "}
          <span className="break-words overflow-clip">
            {data[0]?.country.join(", ")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default DoctorCardMedium;
