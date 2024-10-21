import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AutheticationModal from "../../components/AuthenticationModal";
import Availability from "../../components/Availability/index";
import GreenButton from "../../components/GreenButton";
import HolmeddocLoader from "../../components/HolmeddocLoader";
import Map from "../../components/map";
import { BookAppointment } from "../../data/urls";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { encrypt } from "../../utils/crypto";
import CustomAxios from "../../utils/CustomAxios";
import { combineVisitTypeAndTransform } from "../../utils/transformAvailability.js";
import About from "./About";
import { useSnackbar } from "notistack";
import DoctorProfileCard from "./DoctorProfileCard";

function DoctorsProfilePageContent() {
  const navigate = useNavigate();
  const { doctorId: doctorSeoId, doctorName: doctorSeoName } = useParams();
  const [doctorInfo, setDoctorInfo] = useState({});
  const [doctorTimeSlots, setDoctorTimeSlots] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [showPortal, setShowPortal] = useState(false);
  const isLoggedIn = useIsLoggedIn();
  const [selectedAppointment, setSelectedAppointment] = useState({ date: null, time: null });
  const [appointmentError, setAppointmentError] = useState({ date: false, time: false });
  const { enqueueSnackbar } = useSnackbar();

  const closePortal = () => setShowPortal(false);
  const transformedAvailability = combineVisitTypeAndTransform(doctorTimeSlots);

  console.log("Transformed Availability:", transformedAvailability);
  console.log("Doctor Time Slots Structure:", doctorTimeSlots);
  
  const disable = !transformedAvailability?.some(item => item.isAvailable);

  useEffect(() => {
    if (selectedAppointment.date == null) {
      setAppointmentError(v => ({ ...v, date: false }));
    }
    if (selectedAppointment.time == null) {
      setAppointmentError(v => ({ ...v, time: false }));
    }
  }, [selectedAppointment]);

  const scheduleAnAppointment = () => {
    console.log("Scheduling appointment started");
  
    if (!isLoggedIn) {
      console.log("User is not logged in, showing portal");
      setShowPortal(true);
      return;
    }
  
    const selectedDateIndex = selectedAppointment.date;
    console.log(selectedDateIndex)
    // const selectedDateInfo = transformedAvailability[selectedDateIndex];
    const selectedDateInfo = transformedAvailability.find(item => item.date === selectedDateIndex);
    console.log("Selected Date Info:", selectedDateInfo);
  
    if (!selectedDateInfo) {
      console.error("No date info available for selected date");
      setAppointmentError(v => ({ ...v, date: true }));
      return;
    }
  
    if (!selectedDateInfo.inPersonTimeSlots.some(slot => slot.isAvailable) &&
        !selectedDateInfo.virtualTimeSlots.some(slot => slot.isAvailable)) {
      console.error("No available time slots for the selected date", selectedDateInfo);
      enqueueSnackbar("No available time slots for the selected date", {
        variant: "error",
      });
      setAppointmentError(v => ({ ...v, date: true }));
      return;
    }
  

    const indexOfSelectedAppointment = parseInt(selectedAppointment.time.replace('slot_', ''), 10) - 1;
    

    console.log(selectedDateInfo?.inPersonTimeSlots[0]?.slots[indexOfSelectedAppointment])
    console.log("person timeslttttttttttttt",selectedDateInfo?.inPersonTimeSlots[0].id)
    console.log(selectedAppointment)
  
    // const selectedTimeSlot = selectedDateInfo.inPersonTimeSlots.find(slot => slot.id === selectedAppointment.time) ||
    //                          selectedDateInfo.virtualTimeSlots.find(slot => slot.id === selectedAppointment.time);
    
    const selectedTimeSlot = selectedDateInfo?.inPersonTimeSlots[6]?.slots[indexOfSelectedAppointment] ||
                             selectedDateInfo.virtualTimeSlots.find(slot => slot.id === selectedAppointment.time);
  

                             console.log("Selected Time Slot:", selectedTimeSlot);
  
    if (!selectedTimeSlot || selectedTimeSlot.status.toLowerCase() === "booked") {
      console.error("Selected time slot is invalid or booked");
      enqueueSnackbar("Selected time slot is invalid or booked", {
        variant: "error",
      });
      setAppointmentError(v => ({ ...v, time: true }));
      return;
    }
  
    const type = [
      ...(selectedDateInfo.inPersonTimeSlots || []),
      ...(selectedDateInfo.virtualTimeSlots || []),
    ].find(el => el.id === selectedAppointment.time)?.type;
  
    const selectedTime = `${selectedTimeSlot.start_time} - ${selectedTimeSlot.end_time}`;
    console.log("Selected Time:", selectedTime);
  
    // const paramArr = [doctorInfo.id, selectedDateInfo.date, type, selectedTime, selectedTimeSlot.id];
    const paramArr = [doctorInfo.id, selectedDateInfo.fullDate, type, selectedTime, selectedAppointment.time, selectedDateInfo?.inPersonTimeSlots[0].id];
    console.log("Appointment Parameters Array:", paramArr);
  
    const url = `${BookAppointment}/${encrypt(paramArr)}`;
    console.log("Booking URL:", url); // Make sure it reaches here
    navigate(url);
  };
  

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      try {
        const response = await CustomAxios.post(`/patient/doctors/${doctorSeoName}/${doctorSeoId}`);
        console.log("Fetched Doctor Info:", response.data.data);
        
        const timeSlots = response.data.data?.result[0]?.time_slots;
        console.log("Fetched Time Slots:", timeSlots);

        setDoctorInfo(response.data.data?.result[0]);
        setDoctorTimeSlots(timeSlots);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setIsFetching(false);
      }
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
          <AutheticationModal showPortal={showPortal} closePortal={closePortal} />
          <div className="pb-4 md:py-10">
            <h1 className="tracking-[2px] md:tracking-[0.25rem] text-size-4 md:text-2xl text-gray-900 font-sharp-sans-bold">
              Medicine cures diseases but only doctors can cure patients.
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-12 xl:grid-cols-11 gap-x-4 md:gap-y-16 space-y-6 md:space-y-0">
            <div className="col-span-12 xl:col-span-7">
              <DoctorProfileCard info={doctorInfo} />
              <div className="xl:hidden mt-10">
                <About info={doctorInfo} />
              </div>
              <div className="my-10 xl:mt-0 hidden md:block">
                <Availability
                  availability={transformedAvailability}
                  setAvailability={setSelectedAppointment}
                  initialValue={selectedAppointment}
                  doctorId={doctorInfo.id}
                  dateErrorMessage={appointmentError.date && "Please select date and time"}
                  timeErrorMessage={appointmentError.time && "Please select time"}
                />
              </div>
              <div className="w-[90%] xl:mt-32 hidden md:block">
                {!disable && (
                  <GreenButton additionalStyles={"xl:float-right"} handleClick={scheduleAnAppointment}>
                    Schedule an appointment
                  </GreenButton>
                )}
              </div>
            </div>
            <div className="col-span-12 xl:col-span-4 lg:px-5">
              <div className="min-h-[30rem] hidden xl:block">
                <About info={doctorInfo} />
              </div>
              <div className="col-span-12 xl:col-span-4">
                <h1 className="text-2xl text-gray-900 font-henriette font-black">Practice Location</h1>
                <p className="pb-6 pt-3 text-lg text-gray-700 xl:w-[100%] 2xl:w-[100%] h-24 filter-scrollbar">
                  {doctorInfo.doctor_clinic_address}
                </p>
                <div className="h-[16rem]">
                  <Map address={doctorInfo.doctor_clinic_address} />
                </div>
              </div>
              <div className="my-10 block md:hidden">
                <Availability
                  availability={transformedAvailability}
                  setAvailability={setSelectedAppointment}
                  initialValue={selectedAppointment}
                  doctorId={doctorInfo.id}
                  dateErrorMessage={appointmentError.date && "Please select date and time"}
                  timeErrorMessage={appointmentError.time && "Please select time"}
                />
              </div>
              <div className="w-full block md:hidden">
                {!disable && (
                  <GreenButton additionalStyles={"xl:float-right"} handleClick={scheduleAnAppointment}>
                    Schedule an appointment
                  </GreenButton>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DoctorsProfilePageContent;
