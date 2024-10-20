import React, { useEffect, useState } from "react";
import Map from "../../components/map";
import { AvailabilityDates } from "../../utils/DummyData";
import Availability from "../../components/Availability/index";
import About from "./About";
import DoctorProfileCard from "./DoctorProfileCard";
import GreenButton from "../../components/GreenButton";
import { useNavigate, useParams } from "react-router-dom";
import { BookAppointment } from "../../data/urls";
import CustomAxios from "../../utils/CustomAxios";
import HolmeddocLoader from "../../components/HolmeddocLoader";
import {
  transformAvailability,
  combineVisitTypeAndTransform,
} from "../../utils/transformAvailability.js";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import AutheticationModal from "../../components/AuthenticationModal";
import { encrypt } from "../../utils/crypto";

function DoctorsProfilePageContent() {
  const navigate = useNavigate();
  const doctorSeoId = useParams().doctorId;
  const doctorSeoName = useParams().doctorName;
  const [doctorInfo, setDoctorInfo] = useState({});
  const [doctorTimeSlots, setDoctorTimeSlots] = useState({})
  const [isFetching, setIsFetching] = useState(true);
  const [showPortal, setShowPortal] = useState(false);
  const isLoggedIn = useIsLoggedIn();
  const [selectedAppointment, setSelectedAppointment] = useState({
    date: null,
    time: null,
  });
  const [appointmentError, setAppointmentError] = useState({
    date: false,
    time: false,
  });
  const closePortal = () => setShowPortal(false);
  const tranformedAvailability = combineVisitTypeAndTransform(
    doctorTimeSlots
  );

    // console.log(doctorInfo.time_slots)

  const obj = [];
  tranformedAvailability?.map((item) => obj.push(item.isAvailable));

  const disable = !obj.includes(true);
  useEffect(() => {
    if (selectedAppointment.date !== null) {
      setAppointmentError((v) => ({ ...v, date: false }));
    }
    if (selectedAppointment.time !== null) {
      setAppointmentError((v) => ({ ...v, time: false }));
    }
  }, [selectedAppointment]);
  
  const scheduleAnAppointment = () => {
    if (!isLoggedIn) {
      setShowPortal(true);
      return;
    }
    if (selectedAppointment.date === null) {
      setAppointmentError((v) => ({ ...v, date: true }));
      return;
    }
    if (selectedAppointment.time === null) {
      setAppointmentError((v) => ({ ...v, time: true }));
      return;
    }
    
    const type = [
      ...tranformedAvailability[selectedAppointment.date]?.inPersonTimeSlots,
      ...tranformedAvailability[selectedAppointment.date]?.virtualTimeSlots,
    ].find((el) => el.id === selectedAppointment.time).type;
    let url = `${BookAppointment}/`;
    const selectedAppointmentDetails = tranformedAvailability[selectedAppointment.date]
    const selectedDate = selectedAppointmentDetails.fullDate
    const selectedTypeKey = type === 'InPerson' ? 'inPersonTimeSlots' : 'virtualTimeSlots'
    const selectedTime = selectedAppointmentDetails[selectedTypeKey].find(el => el.id === selectedAppointment.time).time
    const paramArr = [doctorInfo.id, selectedDate, type, selectedTime, selectedAppointment.time]
    url += `${encrypt(paramArr)}`
    // if (selectedAppointment.date !== null) {
    //   url += `&date_id=${selectedAppointment.date}`;
    // }
    // if (selectedAppointment.time !== null) {
    //   url += `&time_id=${selectedAppointment.time}`;
    // }
    // if (type) {
    //   url += `&type=${type}`;
    // }
    navigate(url);
  };

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      const response = await CustomAxios.post(
        `/patient/doctors/${doctorSeoName}/${doctorSeoId}`
      );
      setDoctorInfo(response.data.data?.result[0]);
      setDoctorTimeSlots(response.data.data?.result[0]?.time_slots)
      setIsFetching(false);
    })();
  }, [doctorSeoId, doctorSeoName]);


  return (
    <>
      {isFetching && (
        <div className="w-full overflow-hidden flex items-center justify-center">
          <HolmeddocLoader />
        </div>
      )}
      {!isFetching && (
        <div className="px-6 lg:px-24 py-10 lg:mt-20">
          <AutheticationModal
            showPortal={showPortal}
            closePortal={closePortal}
          />
          <div className="pb-4 md:py-10">
            <h1 className="tracking-[2px] md:tracking-[0.25rem] text-size-4 md:text-2xl text-gray-900 font-sharp-sans-bold">
              Medicine cure diseases but only doctors can cure patients.
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-12 xl:grid-cols-11 gap-x-4 md:gap-y-16  space-y-6 md:space-y-0">
            <div className="col-span-12 xl:col-span-7">
              <DoctorProfileCard info={doctorInfo} />
              <div className="xl:hidden mt-10">
                <About info={doctorInfo} />
              </div>
              <div className="my-10 xl:mt-0 hidden md:block">
                <Availability
                  availability={tranformedAvailability}
                  setAvailability={setSelectedAppointment}
                  initialValue={selectedAppointment}
                  doctorId={doctorInfo.id}
                  dateErrorMessage={
                    appointmentError.date && "Please select date and time"
                  }
                  setDoctorTimeSlots={setDoctorTimeSlots}
                  timeErrorMessage={
                    appointmentError.time && "Please select time"
                  }
                />
              </div>
              <div className="w-[90%] xl:mt-32 hidden md:block">
                {/* <button className="xl:float-right bg-green px-7 py-3 rounded-full text-white font-basic-sans-regular font-medium sm:text-base text-sm z-10 btn-wordspace">
                  Schedule an appointment
                </button> */}
                {!disable ? (
                  <GreenButton
                    additionalStyles={"xl:float-right"}
                    handleClick={scheduleAnAppointment}
                  >
                    Schedule an appointment
                  </GreenButton>
                ) : null}
              </div>
            </div>
            <div className="col-span-12 xl:col-span-4 lg:px-5">
              <div className="min-h-[30rem] hidden xl:block">
                <About info={doctorInfo} />
              </div>
              <div className="col-span-12 xl:col-span-4">
                <h1 className="text-2xl text-gray-900 font-henriette font-black">
                  Practice Location
                </h1>
                <p className="pb-6 pt-3  text-lg text-gray-700 xl:w-[100%] 2xl:w-[100%] h-24 filter-scrollbar">
                  {doctorInfo.doctor_clinic_address}
                </p>
                <div className="h-[16rem]">
                  <Map address={doctorInfo.doctor_clinic_address}/>
                </div>
              </div>
              <div className="my-10 block md:hidden">
                <Availability
                  availability={tranformedAvailability}
                  setAvailability={setSelectedAppointment}
                  initialValue={selectedAppointment}
                  setDoctorTimeSlots={setDoctorTimeSlots}
                  doctorId={doctorInfo.id}
                  dateErrorMessage={
                    appointmentError.date && "Please select date and time"
                  }
                  timeErrorMessage={
                    appointmentError.time && "Please select time"
                  }
                />
              </div>
              <div className="w-full block md:hidden">
                {/* <button className="xl:float-right bg-green px-7 py-3 rounded-full text-white font-basic-sans-regular font-medium sm:text-base text-sm z-10 btn-wordspace">
                  Schedule an appointment
                </button> */}
                {!disable ? (
                  <GreenButton
                    additionalStyles={"xl:float-right"}
                    handleClick={scheduleAnAppointment}
                  >
                    Schedule an appointment
                  </GreenButton>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DoctorsProfilePageContent;

