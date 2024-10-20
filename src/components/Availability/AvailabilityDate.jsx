import moment from "moment";
import React, { useEffect, useState } from "react";
import noappointment from "../../assets/images/noappointment.png";
import Image from "../Image";
import DatePickerPopUp from "../inputs/DatePickerPopUp";
import SkeletonLoader from '../SkeletonLoader';
import customAxios from "../../utils/CustomAxios";


//availability: array of dates
//selectedDate: current selected date(currently works using index)
//selectDate: function to select current date(set index of selected date)
//showCalender: boolean for calendar icon

const AvailabilityDate = ({
  availability,
  selectedDate,
  selectDate,
  selectCalendarDate,
  isDatesFetching,
  resetSelectedDate,
  showCalendar: showCalendarIcon,
}) => {
  const [showCalendar, toggleShowCalendar] = useState(false);
  // let calendarObj = {};
  // if (showCalendarIcon) {
  //   calendarObj.availableDates = availability
  //     .slice(0, availability.length)
  //     .filter((el) => el.isAvailable);
  // }
  const [selectedAppointmentDate, setAppointmentDate] = useState(new Date());

  const checkAvailability = (id) => {
    const found = availability.find(item => item.id === id);
    return found ? found.isAvailable : false; // Return isAvailable or false if not found
  };
  

  // useEffect(() => {
  //   (async () => {
  //     if (!calendarDate) return;
  //     // setIsDateFetching(true);
  //     const response = await customAxios.post('/patient/slot_availability', {
  //       doctor_id: doctorId,
  //       time_slot_date: calendarDate,
  //     });
  //     setDoctorTimeSlots(response.data.data?.result);
  //     setIsDateFetching(false);
  //   })();
  // }, [calendarDate]);

  // const handleCalendarDateSelected  = async (date) => {

  //   const response = await customAxios.post('/patient/slot_availability', {
  //     doctor_id: parseInt(7),
  //     time_slot_date: date,
  //   });
  //   console.log(response)
  //   const result = getDayId(date);
  //   const isAvailable = checkAvailability(result.id);
  //   selectDate(result.id, isAvailable);

  //   // const formattedDate = moment(date).format('YYYY-MM-DD')
  //   // let selectedDay = parseInt(formattedDate.split("-").pop());
  //   // console.log("gize data new 33 ", selectedDay)
  //   // setAppointmentDate(date)
  //   // selectCalendarDate(formattedDate)
  //   toggleShowCalendar(false)
  //   // resetSelectedDate(null)
  // }

  const handleCalendarDateSelected = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD')
    setAppointmentDate(date)
    selectCalendarDate(formattedDate)
    toggleShowCalendar(false)       
    resetSelectedDate(null)
  }

  const handleAppointmentSelected = (item) => {
    selectDate(item.id, item.isAvailable);
  };

  const obj = [];
  availability.map((item) => obj.push(item.isAvailable));

  console.log(availability)

  function getDayId(dateString) {
    // Parse the date string into a Date object
    const date = new Date(dateString);
  
    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = date.getDay();
  
    // Create a new object with an id corresponding to the day of the week
    const dayMapping = {
      0: { id: 0, day: 'Sunday' },
      1: { id: 1, day: 'Monday' },
      2: { id: 2, day: 'Tuesday' },
      3: { id: 3, day: 'Wednesday' },
      4: { id: 4, day: 'Thursday' },
      5: { id: 5, day: 'Friday' },
      6: { id: 6, day: 'Saturday' },
    };
  
    // Return the corresponding object
    return dayMapping[dayOfWeek];
  }
  


  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-henriette text-gray-900 font-black">
        Availability
      </h1>
      <div className="p-4 pl-0 grid grid-cols-3 xsm:grid-cols-4 md:grid-cols-4 md:px-0 lg:grid-cols-4 xl:grid-cols-8 gap-2">
        {!isDatesFetching && availability.map((item, idx) => (
          <div
            className={`rounded ${
              item.isAvailable
                ? idx === selectedDate
                  ? "bg-green text-white cursor-pointer"
                  : "text-gray-800 bg-[#d9f0f4] cursor-pointer"
                : "text-grey bg-lightgrey"
            } h-[3.6rem] w-[3.6rem] flex items-center justify-center text-sm  m-1`}
            key={item.date}
            onClick={() => handleAppointmentSelected(item)}
          >
            {item.month.slice(0,3) + " " + item.date}
          </div>
        ))}
        {isDatesFetching && [1,2,3,4,5,6,7].map((item, idx) => (
          <div
            className={`rounded h-[3.6rem] w-[3.6rem] flex items-center justify-center text-sm  m-1`}
            key={item}
          >
            <SkeletonLoader height={'h-full'} width={'w-full'}/>
          </div>
        ))}
        {showCalendarIcon && (
          <div className='relative w-full'>
              <Image onClick={() => toggleShowCalendar(true)} src={'/home/Calender.png'} staticUrl={require("../../assets/images/Calendar.png")} alt="calendar" className="h-[3.5rem] w-[3.5rem] text-green cursor-pointer" />
              {showCalendar && <div className='absolute top-[62px] right-2 z-[100] h-full'>
                <DatePickerPopUp toggleShowCalendar={toggleShowCalendar} setDate={handleCalendarDateSelected} selectedDate={selectedAppointmentDate}/>
              </div>}
          </div>
        )}
      </div>
      {!obj.includes(true) ? (
        <div className="col-span-10 flex flex-col">
          <img className="w-auto h-44 object-contain" src={noappointment} />
          <h6 className="text-center w-full text-gray-500 tracking-widest font-bold text-l">
            Sorry ! No appointments are available this week. Please click on the
            calender to check further availabilities.
          </h6>
        </div>
      ) : null}
    </div>
  );
};

export default AvailabilityDate;
