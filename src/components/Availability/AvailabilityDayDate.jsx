import React from "react";
import { useNavigate } from "react-router-dom";
import useWindowWidth from "../../hooks/useWindowWidth";

//availability: array of dates
//selectedDate: current selected date(currently works using index)
//selectDate: function to select current date(set index of selected date)
//showCalender: boolean for calendar icon

const AvailabilityDayDate = ({
  availability,
  selectedDate,
  selectDate,
  showCalendar,
  handleMobileClicked
}) => {
  const navigate = useNavigate();
  const { isSmallScreen } = useWindowWidth();
  
  const handleDateClicked = (idx, isAvailable) => {
    if (isSmallScreen) {
      handleMobileClicked()  // on mobile view click on date was toggling to wrong url resolved --> Ubaid
      return;
    }
    if (selectedDate === idx) {
      selectDate(null);
      return;
    }
    if (isAvailable) {
      selectDate(idx);
    }
  };

  // console.log(id)

  return (
    <div className="flex flex-col">
      <h1 className="text-size-9 font-henriette text-gray-900 font-semibold tracking-[1px]">
        Availability
      </h1>
      <div className="py-4 pl-0 flex items-center overflow-x-scroll scrollbar-hide lg:overflow-hidden xl:grid grid-cols-3 xs:grid-cols-4 md:grid-cols-4 md:px-0 lg:grid-cols-4 xl:grid-cols-7 gap-2">
        {availability.map((item, idx) => {
          const selectedSlot = idx === selectedDate;
          const textColor = selectedSlot ? "text-white" : "text-gray-600";
          return (
            <div
              className={`${
                item.isAvailable
                  ? selectedSlot
                    ? "bg-green text-white cursor-pointer"
                    : "text-gray-800 bg-[#def1f4] cursor-pointer"
                  : "text-grey bg-lightgrey"
              } h-[5.5rem] min-w-[4.5rem] md:min-w-0 md:h-[4rem] md:w-[3rem] rounded flex items-center justify-center text-sm  m-1`}
              key={item.date}
              onClick={() => handleDateClicked(idx, item.isAvailable)}
            >
              <div className="flex flex-col items-center justify-center space-y-2 md:space-y-0">
                <h1 className={`text-size-3 md:text-size-2 ${textColor}`}>
                  {item.day}
                </h1>
                <h1 className="text-size-9 md:text-size-4">{item.date}</h1>
                <h1 className={`text-size-3 md:text-size-2 ${textColor}`}>
                  {item.month.slice(0, 3)}
                </h1>
              </div>
            </div>
          );
        })}

        {/* //! removed right arrow from mobile screen */}

        {/* <img
          onClick={() => navigate(DoctorProfile)}
          src={require("../../assets/images/GreenArrowRight.png")}
          className="h-5 md:hidden"
          alt="arrow"
        /> */}
      </div>
    </div>
  );
};

export default AvailabilityDayDate;
