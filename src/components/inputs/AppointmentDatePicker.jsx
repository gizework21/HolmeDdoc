import ErrorMessage from '../ErrorMessage';
import moment from 'moment';
import { ReactComponent as CalendarIcon } from "../../assets/images/home/Calendar.svg"
import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import '../../utils/react-datepicker.css'

export default function BasicDatePicker(props) {
    const [showPicker, setShowPicker] = useState(false)

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
    const [selectedDate, setDate] = useState();

    const ref = useRef(null);

    const handleDateChange = (date) => {
        setDate(date)
        const formattedDate = moment(date).format('LL')
        props.setBirthDate(formattedDate, date)
    }

    const calendarEl = useRef()

    const hideDropdown = (e) => {
        if (!calendarEl?.current.contains(e.target)) {
            setShowPicker(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', hideDropdown, true)

        return () => {
            window.removeEventListener('click', hideDropdown, true)
        }
    }, [])

    return (
        <>
            <div
                className={`flex flex-col items-start  font-basic-sans-regular ${width}`}
                ref={calendarEl}
            >
                <label className="text-gray-400 text-xs font-sharp-sans-semibold pb-1">
                    {props.label}
                </label>
                <div className='relative w-full'>
                    <div className='relative' onClick={() => setShowPicker(v => !v)}>
                        <input 
                            className={`h-[64px] w-full rounded-md border cursor-pointer border-opacity-80 p-2 placeholder:text-gray-400 placeholder:tracking-[3px] 
                            font-basic-sans-regular text-sm px-2 outline-none ${borderColor} text-size-6 placeholder:font-thin pl-[1rem] disabled:bg-white`}
                            placeholder="Today"
                            defaultValue={props.value}
                            disabled={true}
                        />
                        <CalendarIcon className='absolute cursor-pointer right-4 top-4 h-6' />
                    </div>
                    {showPicker &&
                        <div className='absolute top-[62px] right-2 z-[100] h-full'>
                            <DatePicker
                                ref={ref}
                                selected={selectedDate}
                                onChange={handleDateChange}
                                minDate={new Date()}
                                dateFormat="MMMM d, yyyy"
                                popperPlacement='right'
                                shouldCloseOnSelect={false}
                                className="relative"
                                inline
                            >
                            </DatePicker>
                        </div>
                    }
                </div>
                <ErrorMessage errorMessage={props.errorMessage} />
            </div>
        </>
    );
}