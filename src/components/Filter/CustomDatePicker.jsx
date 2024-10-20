import { forwardRef, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { XMarkIcon } from "@heroicons/react/20/solid";
import WhiteDropdown from '../../assets/images/home/WhiteDropdown.png'
import  { ReactComponent as CalendarIcon }   from "../../assets/images/home/Calendar.svg"

import '../../utils/react-datepicker.css'

function isTodayDate(date){
  const userSelected = new Date(date)
  const currentDate = new Date()
  const userSelectedInFormat = userSelected.getDate() + '' + userSelected.getMonth() + '' + userSelected.getFullYear()
  const currentDateInFormat = currentDate.getDate() + '' + currentDate.getMonth() + '' + currentDate.getFullYear()
  return userSelectedInFormat === currentDateInFormat
}

function CustomDatePicker({ isSmallScreen, selectedDate, setSelectedDate }) {
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarIsOpen, setCalendarIsOpen] = useState(false)

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => {
    const displayValue = isTodayDate(value) ? 'Today' : value
    return (
      <div className="h-full flex items-center md:justify-between md:px-2 lg:px-6 xl:px-10 space-y-1 overflow-hidden" onClick={onClick} ref={ref}>
        <div className="md:w-[full] space-x-4 flex items-center">
          <div className="flex items-center justify-center  pointer-events-none">
            <CalendarIcon className="h-[1.5rem] md:h-[1.8rem] md:w-[1.8rem] object-cover"/>
          </div>
          <div className="cursor-pointer text-center text-searchLg font-basic-sans-regular text-gray-900 break-words">{displayValue}</div>
        </div>
        <img src={WhiteDropdown} alt="drop" className={`cursor-pointer h-[12px] md:h-[14px] float-right text-[grey] hidden md:block ${calendarIsOpen ? 'rotate-180' : 'rotate-0'} duration-300 transition-transform`}/>        
        {/* <input type="text" disabled value={displayValue} className="text-center text-black font-normal break-words" placeholder="Select date" /> */}
      </div>
    )
  });

  const ref = useRef(null);

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const showClearBtn = !isTodayDate(selectedDate)

  const handleCalendarClose = () => setCalendarIsOpen(false);
  const handleCalendarOpen = () => setCalendarIsOpen(true);
  return (
    <div className="w-full mt-0">
        <DatePicker
          ref={ref}
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          dateFormat="MMMM d, yyyy"
          customInput={<CustomDateInput />}
          // withPortal={isSmallScreen ? true : false}
          popperPlacement='right'
          shouldCloseOnSelect={false}
          className="relative"
          onCalendarClose={handleCalendarClose}
          onCalendarOpen={handleCalendarOpen}
          // onClickOutside={() => ref.current.setOpen(isSmallScreen ? true : false)}
        >
          {/* <button className="absolute -top-[50px] right-1 md:hidden" onClick={() => ref.current.setOpen(false)}><XMarkIcon className="h-8 w-8"/></button>
          <div className="w-full flex space-x-2 justify-end p-2 absolute -bottom-[80%] right-0 border-t md:hidden">
            {showClearBtn && <button className="bg-transparent border border-primary py-2 px-5 text-primary" onClick={() => setSelectedDate(new Date())}>Clear</button>}
            <button className="bg-yellowcustom py-2 px-5 text-primary" onClick={() => ref.current.setOpen(false)}>Done</button>
          </div> */}
        </DatePicker>
    </div>
  );
}

export default CustomDatePicker;
