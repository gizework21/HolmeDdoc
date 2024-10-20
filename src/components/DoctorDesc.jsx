import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BookAppointment } from '../data/urls.js';
import { combineVisitTypeAndTransform } from '../utils/transformAvailability.js';
import AutheticationModal from "./AuthenticationModal";
import AvailabilityDayDate from "./Availability/AvailabilityDayDate";
import DoctorCardLarge from "./DoctorCards/DoctorCardLarge";
import GreenButton from "./GreenButton";

function DoctorDesc({ info }) {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(null)
  const [ showPortal,  setShowPortal] = useState(false)
  const isLoggedIn = !!useSelector(state => state.auth?.currentUser?.remember_token)
  const tranformedAvailability = combineVisitTypeAndTransform(info?.time_slots) 

  const handleDoctorClick = () => {
    navigate(`/doctor/${info.seo_url}`)
  }
  
  const closePortal = () => setShowPortal(false)

  const scheduleAnAppointment = () => {
    if(!isLoggedIn){
      setShowPortal(true)
      return
    }
    let url = `${BookAppointment}?doctor_id=${info.id}`
    if(selectedDate !== null){
      url += `&date_id=${selectedDate}`
    }
    
    navigate(url)
  }

  return (
    <div className="w-full flex flex-col BtnLgXl:flex-row xl:space-x-16">
      <AutheticationModal showPortal={showPortal} closePortal={closePortal}/>
      <DoctorCardLarge 
        handleClick={handleDoctorClick}
        profession={info.medical_speciality.join(', ')}
        image={info.doctor_image}
        location={info.country.join(', ')}
        languages={info.languages_spoken}
        education={info.education}
        visitMode={info.available_in}
        name={info.doctor_name}
        totalRating={info.total_average_rating}
        thumbImage={info.doctor_thumb_image}
      />
      <div className="md:w-[90%] m-0 mt-3 md:mt-4 xl:pl-8 2xl:pr-12">
        <AvailabilityDayDate
          handleMobileClicked={handleDoctorClick}
          availability={tranformedAvailability.slice(0,7)}
          selectDate={setSelectedDate}
          selectedDate={selectedDate}
        />
        <div className="mt-6 hidden md:flex flex-col md:flex-row items-center justify-start">
          {/* <button onClick={() => navigate('/doctorprofile')} className="bg-green px-7 py-3 mr-6 rounded-full text-white font-basic-sans-regular font-medium tracking-[0.6px] sm:text-base text-sm z-10 btn-wordspace">
            Schedule an appointment
          </button> */}
          <GreenButton handleClick={handleDoctorClick} additionalStyles="mr-6 z-10">
            Schedule an appointment
          </GreenButton>
          {/* <button className="py-3 px-7 mr-6 rounded-full uppercase bg-green text-white btn-wordspace">
            Schedule an appointment
          </button> */}
          <button className="text-size-5 underline text-golden pt-4 md:pt-0" onClick={handleDoctorClick}>
            {"View More"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorDesc;
