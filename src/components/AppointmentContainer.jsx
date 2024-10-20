import React, { useState, useEffect } from "react";
import Map from "./map";
import AppointmentItem from "./AppointmentItem";
import DoctorCardSmall from "./DoctorCards/DoctorCardSmall";
import useWindowWidth from "../hooks/useWindowWidth";
import customAxios from "../utils/CustomAxios";
import moment from "moment";
import { t24Convert12 } from "../utils/transformAvailability";
import HolmeddocLoader from "./HolmeddocLoader";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import GreenButton from "./GreenButton";
import { useSelector, useDispatch } from "react-redux";
import noappointment from "../assets/images/newnoapp.png";
import { useSnackbar } from "notistack";
import Image from "./Image";
import { toggleMobileMenu } from "../redux/sidebar";
import MobileMenu from './MobileMenu'
import InfiniteScroll from "react-infinite-scroll-component";
import RollingLoader from "../assets/images/Login/RollingLoader.svg";

const Paginate = 10

const AppointmentContainer = () => {
  const { isMdScreen, isSmallScreen } = useWindowWidth();
  const isMobileScreen = isMdScreen || isSmallScreen;
  const [appointment, selectAppointment] = useState(isMobileScreen ? null : 0);
  const [hideDetails, setHideDetails] = useState(isMobileScreen);
  const [appointmentList, setAppointmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const email = useSelector((state) => state.auth.currentUser.patient_email);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [totalAppointments, setTotalAppointments] = useState(0)
  const navigate = useNavigate();
  const [page, setPage] = useState(1)
  const [isPaginationLoading, setIsPaginationLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [userId, setUserId] = useState("");

  const handleAppointmentSelected = (id) => {
    selectAppointment(id);
    if (!isMobileScreen) return;
    setHideDetails(false);
  };

  // console.log("Mobile Screen", isMobileScreen);

  useEffect(() => {
    (async () => {

      const token = localStorage.getItem("persist:root");
      if(token){
        const tokenJson = JSON.parse(token);
        const tokenJsonAuth = JSON.parse(tokenJson.auth);
        const userIdPatient = tokenJsonAuth.currentUser.id;
        setUserId(userIdPatient)
      }

      setIsLoading(true);
      try {
        const response = await customAxios.post("/patient/appointments", {
          paginate: Paginate,
          page
        });
        let list = response.data.data?.result ?? [];
        console.log("🚀 ~ file: AppointmentContainer.jsx:31 ~ list", list);
        list = list.map((item) => ({
          date:
            moment(item.appointment_date).format("ddd") +
            ",  " +
            moment(item.appointment_date).format("MMM Do"),
          booked_on:
            moment(item.booked_on).format("ddd") +
            ",  " +
            moment(item.booked_on).format("MMM Do"),
          name: item.doctor_name,
          reason: item.medical_condition,
          address: item.clinic_address,
          id: item.id,
          insurance: item.insurance,
          prescription: item.prescription ,
          appointment_number: item.appointment_number,
          visit_type: item.visit_type,
          time: t24Convert12(item.appointment_time),
          doctorId: item.doctor_id,
        }));
        if (!isMobileScreen) {
          selectAppointment(list[0]?.id ?? "Invalid");
        } else {
          selectAppointment(null);
        }
        setAppointmentList([...list]);
        setTotalAppointments(response.data.data?.total_count)
        setIsLoading(false);
      } catch (err) {
        enqueueSnackbar(err.message, { variant: "error" });
        console.log(err);
        setIsLoading(false);
      }
    })();
  }, []);

  const ref = useRef(null);

  const selectedAppointmentDetails = appointmentList.find(
    (item) => item.id === appointment
  );

  console.log(selectedAppointmentDetails)

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center h-[100vh]">
        <HolmeddocLoader />
      </div>
    );
  }
  let hasMore = true
  if(appointmentList.length >= totalAppointments){
    hasMore = false
  }


  const nextPage = async () => {
    if(isPaginationLoading) return
    setPage(p => p +1)
    setIsPaginationLoading(true)
    const response = await customAxios.post("/patient/appointments", {
      paginate: Paginate,
      page: page + 1
    });
    let list = response.data.data?.result ?? [];
    list = list.map((item) => ({
      date:
        moment(item.appointment_date).format("ddd") +
        ",  " +
        moment(item.appointment_date).format("MMM Do"),
      booked_on:
        moment(item.booked_on).format("ddd") +
        ",  " +
        moment(item.booked_on).format("MMM Do"),
      name: item.doctor_name,
      reason: item.medical_condition,
      address: item.clinic_address,
      id: item.id,
      insurance: item.insurance,
      appointment_number: item.appointment_number,
      visit_type: item.visit_type,
      time: t24Convert12(item.appointment_time),
      doctorId: item.doctor_id,
    }));
    setAppointmentList(prev => [...prev, ...list]);
    setIsPaginationLoading(false)
  }

  
 
      

  const handleSubmit = async () => {
    const payload = {
      patient_id: parseInt(userId), // Replace with actual patient ID
      doctor_id: selectedAppointmentDetails.doctorId,   // Replace with actual doctor ID
      total_rating: parseFloat(rating), // Convert to number
      comments,
    };


    console.log(payload)

    const token = localStorage.getItem("persist:root");
    const tokenJson = JSON.parse(token);
    const tokenJsonAuth = JSON.parse(tokenJson.auth);
    // const remmenberToken = tokenJsonAuth.currentUser.remember_token;
    const remmenberToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RlbGVoZWFsdGguaWtyYWppbmR1c3RyaWVzLmNvbS9wYXRpZW50L2xvZ2luIiwiaWF0IjoxNzI4NDcwMjU1LCJleHAiOjE3NDQxOTUwNTUsIm5iZiI6MTcyODQ3MDI1NSwianRpIjoiazZXVGpXMnUxUzlyekx6NiIsInN1YiI6IjI0IiwicHJ2IjoiNzUyODk1NjcxMGQxYzc1YjY3MTMwZDRlNGM1YzBlZTlhMGFlYjYxNCJ9.vk2vpk5uZJGb9K33N_Sb1cBzA1l6cXb4q_TLCASETR8";
    const response = await fetch(
      "https://telehealth.ikrajindustries.com/patient/submit_rating",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "device-id": "22123456",
          Authorization: "Basic YWRtaW46bXlwY290",
          token: "32113213fsadfsdfsd",
          "access-token": `${remmenberToken}`,
          platform: "web",
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      // alert("Rating submitted successfully");
      setIsModalOpen(false);
      enqueueSnackbar(`You have ${selectedAppointmentDetails.name} Rated successfully`, {
        variant: "success",
      });
  setRating("")
  setComments("")
    } else {
      setIsModalOpen(false);
      enqueueSnackbar("erro while submiting rate", {
        variant: "error",
      });
      // alert("Error submitting rating");
    }
  };
   
  const closeModal = (e) => {
    if (e.target.id === "modal-background") {
      setIsModalOpen(false);
    }
  };

  const toggleRating = (star) => {
    setRating((prevRating) => (prevRating === star ? 0 : star)); // Toggle selection
  };


  return (
    <>
    <div
      className="max-w-[100vw] md:h-[100vh] short:overflow-hidden flex-1 flex"
      ref={ref}
      tabIndex={1}
    >
      {/* {isLoading && <HolmeddocLoader />} */}
      {appointment === "Invalid" && (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <Image
            src={"/home/noappointment.png"}
            className="w-96 h-auto flex justify-center items-center"
            staticUrl={noappointment}
            alt="no appointment"
          />
          <h1 className="text-center pt-5 text-gray-500 tracking-widest font-bold text-2xl">
            Sorry ! No appointments found
          </h1>
        </div>
      )}
      {!isLoading && appointment !== "Invalid" && (
        <>
          {((appointment !== null && !isMobileScreen) ||
            (appointment === null && isMobileScreen)) && (
            <div
              id="scrollableDiv"
              className={`bg-gray-100  h-[100vh] w-screen  lg:basis-[24rem] overflow-y-auto scrollbar-hide`}
            >
              <div className="p-5 border-b-2 bg-gray-200 border-gray-300 flex justify-between items-center">
                <h1 className="text-xl text-gray-400 font-thin">
                  My Appointments
                </h1>
                <div
                  className="lg:hidden"
                  onClick={() => dispatch(toggleMobileMenu())}
                >
                  <img
                    src={require("../assets/images/icons/Hamburger.png")}
                    className="h-5"
                    alt="ham"
                  />
                </div>
                {/* <img className="h-8" src={require("../assets/images/profile/ListCalender.png")} alt="toggle"/> */}
              </div>

              {/* On Mobile screen when no appointments are available blank screen was showing up resolved --> Ubaid */}
              {isMobileScreen &&
                (appointmentList.length === 0 ? (
                  <div className="h-full w-full flex flex-col items-center justify-start p-10 pt-12">
                    <Image
                      className="w-72 h-auto"
                      staticUrl={noappointment}
                      alt="no appointment"
                      src={"/home/noappointment.png"}
                    />
                    <h1 className="text-center pt-5 text-gray-500 tracking-widest font-bold text-2xl">
                      Sorry ! No appointments found
                    </h1>
                  </div>
                ) : null)}
              <InfiniteScroll
                dataLength={30}
                next={nextPage}
                hasMore={hasMore}
                scrollableTarget={"scrollableDiv"}
                loader={<div className="flex items-center justify-center my-3">
                <Image className="h-16" src={'/login/RollingLoader.svg'} staticUrl={RollingLoader} />
              </div>}
              >
                {appointmentList.map((el) => (
                  <AppointmentItem
                    {...el}
                    key={el.id}
                    selectedAppointment={appointment}
                    handleAppointmentSelect={handleAppointmentSelected}
                  />
                ))}
              </InfiniteScroll>
            </div>
          )}
          {appointment !== null && appointment !== "Invalid" && (
            <div className="flex-1 bg-white flex  flex-col justify-between min-h-[100vh] md:h-[100vh] overflow-y-auto">
              <div className="p-4 pt-2 md:pt-2 md:p-8">
                {/* added a back button on mobile view to toggle between appointment details and list of appointments resolved --> Ubaid */}
                {isMobileScreen ? (
                  <GreenButton
                    handleClick={() => selectAppointment(null)}
                    className="float-right h-6 mt-3 flex justify-center items-center ml-3 p-4"
                  >
                    Back
                  </GreenButton>
                ) : null}
                <div className="flex flex-col justify-between pb-4 border-b float-none lg:float-right border-gray-100 text-left">
                  <h1 className="text-xl text-gray-900">
                    #{selectedAppointmentDetails?.appointment_number}
                  </h1>
                  <div className="flex flex-col pt-0 mt-0">
                    <span className="text-xs text-gray-400 font-thin">
                      Appointment booked on
                    </span>
                    <span className="text-sm text-gray-400 font-thin">
                      {selectedAppointmentDetails?.booked_on}
                    </span>
                  </div>
                </div>
                <div className="py-4 border-b border-gray-100">
                  <DoctorCardSmall
                    selectedAppointment={selectedAppointmentDetails}
                  />
                </div>
                <div className="pb-4 pt-2 grid xl:grid-cols-7 items-center">
                  <div className="w-full space-y-4 col-span-4">
                    {/* added appointment confirmed message above on mobile screen and at side on dekstop -->Ubaid */}

                    {isMobileScreen && (
                      <div className="flex items-center space-x-2">
                        <Image
                          className="h-6 -mt-1"
                          staticUrl={require("../assets/images/profile/Checkmark.png")}
                          alt="check"
                          src={"/profile/Checkmark.png"}
                        />
                        <h1 className="text-xl font-bold tracking-[0.6px] text-paragraphColor">
                          Appointment Confirmed
                        </h1>
                      </div>
                    )}
                    <div>
                      <h1 className="mb-1.5 text-size-3 text-gray-400 font-thin tracking-[0.5px]">
                        What's the reason for your visit?
                      </h1>
                      <span>{selectedAppointmentDetails?.reason}</span>
                    </div>
                    <div>
                      <h1 className="mb-1.5 text-size-3 text-gray-400 font-thin tracking-[0.5px]">
                        Insurance Details
                      </h1>
                      <span>{selectedAppointmentDetails?.insurance}</span>
                    </div>
                    <div>
                      <h1 className="mb-1.5 text-size-3 text-gray-400 font-thin tracking-[0.5px]">
                        Type of Visit
                      </h1>
                      <span>{selectedAppointmentDetails?.visit_type}</span>
                    </div>
                    <div>
      <h1 className="mb-1.5 text-size-3 text-gray-400 font-thin tracking-[0.5px]">
        Schedule
      </h1>
      <span>
        {selectedAppointmentDetails?.date +
          " " +
          selectedAppointmentDetails?.time}
      </span>

      <div className="mt-4">
        
        <div className="mt-2">
          <button
            className="px-4 py-2 bg-[#158080] text-white rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Rate Doctor
          </button>
          {/* <button
            className="ml-5 px-4 py-2 bg-[#158080] text-white rounded"
            onClick={() => {
              const prescription = selectedAppointmentDetails.prescription;
              const baseUrl = "https://telehealth.ikrajindustries.com/public/";
              const fullUrl = baseUrl + encodeURIComponent(prescription);
              window.open(fullUrl, '_blank');
          }}
          >
            Open prescription
          </button> */}
            {selectedAppointmentDetails.prescription ? (
                <button
                    onClick={() => {
                        const baseUrl = "https://telehealth.ikrajindustries.com/public/";
                        const fullUrl = baseUrl + encodeURIComponent(selectedAppointmentDetails.prescription);
                        window.open(fullUrl, '_blank');
                    }}
                    className="ml-5 px-4 py-2 bg-[#158080] text-white rounded"
                >
                    Open Prescription Image
                </button>
            ) : (
                <p>No prescription available</p>
            )}
        </div>
      </div>

      {isModalOpen && (
        <div
          id="modal-background"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div className="bg-white p-2 rounded-lg w-60"> {/* Adjusted modal width */}
            <h2 className="text-lg mb-2 text-center">Rate Doctor {selectedAppointmentDetails?.name}</h2>
            {/* Star Rating Icons inside the modal */}
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={`cursor-pointer text-2xl transition-colors duration-200 ${
                    star <= rating ? 'bg-gold text-yellow-500' : 'bg-transparent text-gray-400'
                  } p-1 rounded-full`}
                  onClick={() => toggleRating(star)}
                  style={{ fontSize: '2.5rem' }}
                >
                  ★
                </div>
              ))}
            </div>
            <label className="block mb-1">Comments:</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="mb-2 p-2 border rounded w-full"
              rows="2"
              required
            />
            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-[#158080] text-white rounded mr-2"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

                    {selectedAppointmentDetails?.visit_type === "Virtual" && (
                      <div>
                        <h1 className="mb-1.5 text-size-3 text-gray-400 font-thin tracking-[0.5px]">
                          Meeting Link
                        </h1>
                        <span>
                          Appointment link has been shared on{" "}
                          <span className="text-blue-500 font-semibold underline">
                            {email}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="w-full space-y-4 col-span-3 mt-10 xl:mt-0">
                    {/* added appointment confirmed message above on mobile screen and at side on dekstop -->Ubaid */}
                    {!isMobileScreen && (
                      <div className="flex items-center space-x-2">
                        <Image
                          src={"/profile/Checkmark.png"}
                          className="h-6 -mt-1"
                          staticUrl={require("../assets/images/profile/Checkmark.png")}
                          alt="check"
                        />
                        <h1 className="text-xl font-bold tracking-[0.6px] text-paragraphColor">
                          Appointment Confirmed
                        </h1>
                      </div>
                    )}
                    <div>
                      <h1 className="text-size-2 text-gray-400 font-thin">
                        Address
                      </h1>
                      <p className="mt-1">
                        {selectedAppointmentDetails?.address}
                      </p>
                      <div className="h-[14rem] mt-4 w-full">
                        <Map address={selectedAppointmentDetails?.address}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
    <MobileMenu hideHam={true} logoHidden={true}/>
    </>
  );
};

export default AppointmentContainer;
