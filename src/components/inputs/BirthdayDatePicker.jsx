import { forwardRef, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { XMarkIcon } from "@heroicons/react/20/solid";
import useWindowWidth from "../../hooks/useWindowWidth";
import ErrorMessage from "../ErrorMessage";
import '../../utils/birthday-picker.css'


function BirthdayDatePicker({ ...otherProps }) {
  const [startDate, setStartDate] = useState(null);
  const { isSmallScreen } = useWindowWidth()

  let borderColor = "";
  if (otherProps.errorMessage) {
    borderColor = "border-red-500";
  } else {
    borderColor = "border-green";
  }

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => {
    return (
      <div className="flex flex-col">
        <label className="text-gray-400 text-xs font-sharp-sans-semibold pb-1">
          DOB
        </label>
        <div className={`border-[1px] ${borderColor} p-0 m-0 h-[43px] w-full lg:w-[95%] rounded-md`} onClick={onClick} ref={ref}>
          <input type="text" disabled value={value} className="text-black px-2 font-normal h-full w-full outline-none text-[1rem] placeholder:text-gray-300" placeholder="MM/DD/YYYY" />
        </div>
        <ErrorMessage errorMessage={otherProps.errorMessage} />
      </div>
    )
  });

  const ref = useRef(null);

  const handleDateChange = (date) => {
    setStartDate(date)
    otherProps.setBirthDate(date)
  }


  const showClearBtn = !!startDate

  return (
    <div>
        <DatePicker
          ref={ref}
          selected={startDate}
          onChange={handleDateChange}
          maxDate={new Date()}
          customInput={<CustomDateInput />}
          withPortal={isSmallScreen}
          shouldCloseOnSelect={false}
          className="relative"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onClickOutside={() => ref.current.setOpen(isSmallScreen ? true : false)}
        >
          <button className="absolute -top-[50px] right-1 md:hidden" onClick={() => ref.current.setOpen(false)}><XMarkIcon className="h-8 w-8"/></button>
          <div className="w-full flex space-x-2 justify-end p-2 absolute -bottom-[80%] right-0 border-t md:hidden">
            {showClearBtn && <button className="bg-transparent border border-primary py-2 px-5 text-primary" onClick={() => setStartDate(null)}>Clear</button>}
            <button className="bg-yellowcustom py-2 px-5 text-primary" onClick={() => ref.current.setOpen(false)}>Done</button>
          </div>
        </DatePicker>
    </div>
  );
}

export default BirthdayDatePicker;
