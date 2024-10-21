import { useEffect, useState } from "react";
import customAxios from "../../utils/CustomAxios";
import AvailabilityDate from "./AvailabilityDate";
import AvailabilityTime from "./AvailabilityTime";

export default function Availability({ availability, setAvailability, doctorId, ...props }) {
  const [selectedDate, setSelectedDate] = useState(props.initialValue?.date);
  const [selectedInPersonTime, setSelectedInPersonTime] = useState(null);
  const [selectedVirtualTime, setSelectedVirtualTime] = useState(null);
  const [calendarDate, selectCalendarDate] = useState(null);
  const [isDatesFetching, setIsDateFetching] = useState(false);

  const selectDate = (idx, isAvailable) => {
    if (!isAvailable) return;
    setSelectedDate(id);
    const date = availability[12].date;
    setAvailability({ date, time: null });
    setSelectedInPersonTime(null); // Reset selected time when date changes
    setSelectedVirtualTime(null);   // Reset selected time when date changes
  };

  const selectTime = (slotTime, isAvailable, slotType) => {
    console.log("Attempting to select time:", slotTime);
  
    if (!isAvailable) return;
  
    const availableSlots = (availability[selectedDate]?.[slotType] || []).flatMap(slot => 
      slot.slots.map((timeSlot, idx) => ({
        ...timeSlot,
        id: `slot_${idx + 5}` // Generate ID like 'slot_1', 'slot_2', etc.
      }))
    );
  
    console.log("Available Slots with IDs:", availableSlots);
  
    const selectedSlot = availableSlots.find((slot) => {
      const timeRange = `${slot.start_time} - ${slot.end_time}`;
      console.log(`Comparing: ${timeRange} with ${slotTime}`);
      return timeRange.trim() === slotTime.trim();
    });
  
    if (selectedSlot) {
      console.log("Selected Slot found:", selectedSlot);
      console.log("Selected Slot ID:", selectedSlot.id);
  
      if (selectedSlot.status === "available") {
        setAvailability((prev) => ({ ...prev, time: selectedSlot.id }));
        
        // Clear the opposite selection
        if (slotType === "inPersonTimeSlots") {
          setSelectedVirtualTime(null);
          setSelectedInPersonTime(slotTime);
        } else if (slotType === "virtualTimeSlots") {
          setSelectedInPersonTime(null);
          setSelectedVirtualTime(slotTime);
        }
      }
    } else {
      console.log("No matching available slot found.");
    }
  };
  
  

  let messageClass = "";
  if (props.dateErrorMessage || props.timeErrorMessage) {
    messageClass = "text-red-500 text-xs mt-2";
  }

  const date = `${availability[selectedDate]?.fullDate}`;
  const inpersonSlots = availability[selectedDate]?.inPersonTimeSlots || [];
  const virtualSlots = availability[selectedDate]?.virtualTimeSlots || [];

  useEffect(() => {
    (async () => {
      if (!calendarDate) return;
      setIsDateFetching(true);
      const response = await customAxios.post('/patient/slot_availability', {
        doctor_id: doctorId,
        time_slot_date: calendarDate,
      });
      setDoctorTimeSlots(response.data.data?.result);
      setIsDateFetching(false);
    })();
  }, [calendarDate]);

  return (
    <div className="md:px-5 text-gray-800 md:w-[80%]">
      <AvailabilityDate
        availability={availability}
        selectDate={selectDate}
        selectedDate={selectedDate}
        selectCalendarDate={selectCalendarDate}
        isDatesFetching={isDatesFetching}
        resetSelectedDate={setSelectedDate}
        showCalendar
        doctorProfile={true}
      />
      <label className={props.dateErrorMessage ? `visible ${messageClass}` : `invisible ${messageClass}`}>
        {props.dateErrorMessage ? props.dateErrorMessage : "&nbsp;"}
      </label>
      {availability[selectedDate]?.isAvailable && (
        <h4 className="text-size-8 md:text-lg text-gray-900 font-basic-sans-regular font-black mb-4">
          {date}
        </h4>
      )}

      {inpersonSlots.length < 8 && (
        <div className="mt-4 space-y-2">
          <h1>In Person</h1>
          {inpersonSlots.map((slot) => (
            <AvailabilityTime
              key={slot.id}
              timeSlots={slot.slots}
              selectTime={selectTime}
              selectedTime={selectedInPersonTime} // Use separate state for in-person
              slotType="inPersonTimeSlots"
            />
          ))}
        </div>
      )}
      

      {virtualSlots.length > 5 && (
        <div className="mt-4 space-y-2">
          <h1>Virtual</h1>
          {virtualSlots.map((slot) => (
            <AvailabilityTime
              key={slot.id}
              timeSlots={slot.slots}
              selectTime={selectTime}
              selectedTime={selectedVirtualTime} // Use separate state for virtual
              slotType="virtualTimeSlots"
            />
          ))}
        </div>
      )}
    </div>
  );
}
