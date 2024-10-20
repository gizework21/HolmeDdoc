import { useState, useRef, useEffect } from "react";

import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import ErrorMessage from "../ErrorMessage";
import moment from "moment";
import subtractYears from "../../utils/subtractYearsFromDate";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function BasicDatePicker(props) {
  const [value, setValue] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (props.initialValue) {
      setValue(moment(props.initialValue));
    }
  }, [props.initialValue]);

  useEffect(() => {
    if (props.value) {
      setValue(moment(props.value));
    }
  }, [props.value]);

  let width = "";
  if (props?.fullWidth) {
    width = "w-full lg:w-[95%]";
  }

  let borderColor = "";
  if (props.errorMessage) {
    borderColor = "border-red-500";
  } else {
    borderColor = "border-green";
  }

  const calendarEl = useRef();

  const hideDropdown = (e) => {
    if (!calendarEl?.current.contains(e.target)) {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", hideDropdown, true);

    return () => {
      window.removeEventListener("click", hideDropdown, true);
    };
  }, []);
  const displayValue = value?.["_i"];

  // console.log(subtractYears(new Date() - 18))

  const maxVal = new Date();
  maxVal.setFullYear(maxVal.getFullYear() - 18);
  // console.log(check)

  const minVal = new Date();
  minVal.setFullYear(minVal.getFullYear() - 80);


  const position = props.pickerFor === 'EditProfile' ? 'sm:-left-2' : '-left-[100%] top-[43px] sm:top-[42px] sm:-left-2'

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div
        ref={calendarEl}
        className={`flex flex-col items-start font-basic-sans-regular ${width}`}
      >
        <label className="text-gray-400 text-xs font-sharp-sans-semibold pb-1">
          {props.label}
        </label>
        <div className="relative w-full">
          <input
            onClick={() => setShowPicker((v) => !v)}
            className={`h-[43px] w-full rounded-md border border-opacity-80 p-2 text-gray-800 
                         font-sharp-sans-semibold text-sm px-2 outline-none ${borderColor} placeholder:text-gray-300 cursor-pointer`}
            placeholder="MM/DD/YYYY"
            readOnly
            defaultValue={displayValue}
          />
          {showPicker && (
            <div className={`absolute ${position} z-[100]`}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={value || moment(maxVal).format("L")}
                onChange={(newValue) => {
                  props.setBirthDate(moment(newValue["_d"]).format("L"));
                  setValue(newValue);
                }}
                onAccept={() => setShowPicker(false)}
                renderInput={(params) => <TextField {...params} />}
                className="h-[17.5rem]"
                maxDate={moment(maxVal).format("L")}
                openTo={'day'}
                views={['year', 'month', 'day']}
                // minDate={moment(minVal).format('L')}
              />
            </div>
          )}
        </div>
        <ErrorMessage errorMessage={props.errorMessage} />
      </div>
    </LocalizationProvider>
  );
}
