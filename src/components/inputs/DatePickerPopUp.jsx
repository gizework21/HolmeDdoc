import DatePicker from "react-datepicker";
import '../../utils/react-datepicker.css'
import moment from 'moment';
import { useState, useRef, useEffect } from "react";


export default function DatePickerPopUp(props){
    // const [availableDates, setAvailableDates] = useState([])
    const ref = useRef(null);

    const handleDateChange = (date) => {
        props.setDate(date)
        // const formattedDate = moment(date).format('YYYY-MM-DD')
        // const selectedAvailableDate = props.availableDates.find(el => el.computedDate === formattedDate)
        // props.onDateClicked(selectedAvailableDate.id, selectedAvailableDate.isAvailable)
    }
    
    // useEffect(() => {
    //     const dates = props?.availableDates.map(el => el.computedDate).map(el => new Date(el))
    //     setAvailableDates(dates)
    // }, [props?.availableDates])

    const futureDate = new Date()
    futureDate.setMonth((futureDate.getMonth() + 2))

    return (
        <DatePicker
            ref={ref}
            selected={props.selectedDate}
            onChange={handleDateChange}
            minDate={new Date()}
            maxDate={futureDate}
            dateFormat="MMMM d, yyyy"
            popperPlacement='right'
            shouldCloseOnSelect={true}
            className="relative"
            // includeDates={availableDates}
            onClickOutside={() => props.toggleShowCalendar(false)}
            inline
        >
        </DatePicker>
    )
}