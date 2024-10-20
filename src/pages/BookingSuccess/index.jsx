import { useEffect, useState } from "react";
import GreenButton from "../../components/GreenButton";
import { useNavigate, useParams } from "react-router-dom";
import { Home, Login } from "../../data/urls";
import { useSelector } from "react-redux";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useRef } from "react";
import customAxios from "../../utils/CustomAxios";
import Map from "../../components/map";
import WhiteButton from "../../components/WhiteButton";

const APPOINTMENT_INFO = [
  {
    title: "Type of visit",
    body: "InPerson",
  },
  {
    title: "Clinic Address",
    body: "14 Street Medical P.C. 110 W 14th St New York, NY 10011",
  },
  {
    title: "Date",
    body: "Monday, September 1",
  },
  {
    title: "Time",
    body: "8:00 AM",
  },
  {
    title: "Medical Conditions",
    body: "Digestive disorders",
  },
  {
    title: "Have you visited before?",
    body: "No",
  },
  {
    title: "Practice Area",
    body: "Dietician",
  },
  {
    title: "Insurance",
    body: "UHC",
  },
  {
    title: "Reason",
    body: "High blood pressure/Hypertension",
  },
];

export default function BookingSuccess() {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const bookingData = useSelector((state) => state.bookingSuccess);
  const email = useSelector((state) => state.auth.currentUser.patient_email);
  const ref = useRef(null);
  const { doctorId } = useParams()

  const [data, setData] = useState([])

  console.log(doctorId);

  useEffect(() =>{
    (async ()=>{
      try{
        const res = await customAxios.post('/patient/doctors', {id: doctorId})
        console.log(res.data.data.result)
        setData(res.data.data.result)
      }catch(err){
        console.log(err)
      }
    })()
  }, [])



  const appointmentInfo = [
    {
      title: "Appointment Number",
      body: "#" + bookingData.appointment_number,
      isVissible: true,
    },
    {
      title: "Type of visit",
      body: bookingData.visitType === "Virtual" ? "Online" : "InPerson",
      isVissible: true,
    },
    {
      title: "Link",
      body:
        bookingData.visitType === "Virtual" &&
        `Meeting link will be shared via mail at ${email}`,
      isVissible: bookingData.visitType === "Virtual" ? true : false,
    },
    {
      title: "Date",
      body: bookingData.date,
      isVissible: true,
    },
    {
      title: "Time",
      body: bookingData.time,
      isVissible: true,
    },
    // {
    //   title: "Medical Conditions",
    //   body: bookingData.condition,
    //   isVissible: true,
    // },
    {
      title: "Have you visited before?",
      body: bookingData.visitedBefore,
      isVissible: true,
    },
    // {
    //   title: "Practice Area",
    //   body: bookingData.practiceArea,
    // },
    {
      title: "Insurance",
      body: bookingData.insurance,
      isVissible: true,
    },
    {
      title: "Reason",
      body: bookingData.reason,
      isVissible: true,
    },
    {
      title: "Clinic Address",
      body: bookingData.clinicAddress,
      isVissible: true,
    },
  ];
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Login);
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (!bookingData.date) {
      navigate(Home);
    }
  }, []);

  // When clicking on view less focus was shifting to footer resolved --> Ubaid
  const handleFocus = () => {
    // console.log("reached");
    if (showAll === true) {
      ref.current.focus();
    }
    // console.log("reached");
  };

  const dataLimit = bookingData.visitType === "Virtual" ? 4 : 5;

  return (
    <div className="flex justify-center">
      <div className="md:min-w-[600px] md:max-w-[1000px] xl:min-w-[1100px] xl:max-w-[1100px] flex justify-center items-center flex-col pt-10 md:pt-28 lg:pt-48 px-[12px] md:px-0">
        <div className="text-center space-y-5">
          <h1 className="text-4xl text-green font-black tracking-[3px]">
            Success!
          </h1>
          <div className="flex justify-center items-center space-x-3">
            <img
              className="h-3 md:h-6"
              src={require("../../assets/images/profile/Checkmark.png")}
              alt="tick"
            />
            <span className="text-sm md:text-xl text-gray-500 font-thin">
              You have successfully booked an appointment with
            </span>
          </div>
          <h1
            className="text-xl md:text-3xl text-gray-600"
            tabIndex={1}
            ref={ref}
          >
            {bookingData.doctorName}
          </h1>
          {/* // !added dr speciality --> Ubaid */}
          <h1
            className="text-sm md:text-sm text-gray-500 font-thin"
            style={{ marginTop: "5px" }}
          >
            {data[0]?.medical_speciality?.join(", ")} 
          </h1>
        </div>
        <div className="w-full md:w-[82%] overflow-hidden bg-blue2 border-4 border-blue3 p-8 mt-5 rounded-3xl flex flex-col justify-center mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 md:justify-items-around opacity-[100%] gap-x-[5.8rem] space-y-5 md:space-y-0">
            {appointmentInfo
              .filter(
                (item, key) =>
                  (!showAll && key < dataLimit && item.isVissible) ||
                  (showAll && item.isVissible)
              )
              .map((item, key) => (
                <div key={key} className="md:min-h-[7rem]">
                  <h1 className="mb-2 text-[1rem] text-gray-400 font-thin">
                    {item.title}
                  </h1>
                  <p className="text-size-7 text-gray-600 line-clamp-3">
                    {item.body}
                  </p>
                </div>
              ))}

            {showAll && (
              <div className="md:col-span-2">
                {/* <h1 className="text-[1rem] text-gray-400 font-thin">
                  Clinic Address
                </h1>
                <p className="mt-1 text-size-7 text-gray-600 line-clamp-3">
                  {bookingData.clinicAddress}
                </p> */}
                <div className="h-[15rem] w-full mt-10">
                  <Map address={bookingData.clinicAddress}/>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col-reverse gap-y-5 md:gap-y-0	md:flex-row items-center justify-center pt-10 pb-4  md:space-x-10">
            <WhiteButton
              additionalStyles={"w-[12rem]"}
              outline
              bgColor={'bg-white'}
              handleClick={() => navigate(Home)}
            >
              Back to home
            </WhiteButton>
            <GreenButton
              additionalStyles={"w-[12rem]"}
              handleClick={() => {
                setShowAll((v) => !v);
                handleFocus();
              }}
            >
              {showAll ? "View less" : "View details"}
            </GreenButton>
          </div>
        </div>
        <div className="flex items-start px-4 md:px-0 space-x-2 md:space-x-3 pt-10 pb-20">
          <h1 className="text-lg md:text-size-8 text-gray-800">*Note:-</h1>
          <div className="text-gray-500 text-sm md:text-md mt-1">
            <h1>Updates will be sent to {email}</h1>
            <h1>
              By booking appointment, you agree to our Terms and Conditions. You
              can read our payment FAQ's
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
