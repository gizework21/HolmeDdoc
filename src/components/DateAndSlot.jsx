import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AvailabilityTime from "./Availability/AvailabilityTime";
import ErrorMessage from "./ErrorMessage";
import Image from "./Image";
import Label from "./inputs/Label";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 7 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 7 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 4 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 3 },
};

const DateAndSlot = ({ availability, setAvailability, setError, initialValue, errorMessage, labelFont }) => {
  const [selectedDate, setSelectedDate] = useState(initialValue?.date);
  const [selectedInPersonTime, setSelectedInPersonTime] = useState(null);
  const [selectedVirtualTime, setSelectedVirtualTime] = useState(null);
  const ref = useRef();

  useEffect(() => {
    setSelectedDate(initialValue?.date);
    setSelectedInPersonTime(initialValue?.time);
    setSelectedVirtualTime(initialValue?.time);
  }, [initialValue]);

  const selectDate = (idx, isAvailable) => {
    if (!isAvailable) return;
    setSelectedDate(idx);
    setAvailability({ date: availability[idx].date, time: null });
    setSelectedInPersonTime(null); // Reset selected time when date changes
    setSelectedVirtualTime(null);   // Reset selected time when date changes
  };

  const selectTime = (slotId, isAvailable, slotType) => {
    if (!isAvailable) return;
    setError("");
    if (slotType === "inPersonTimeSlots") {
      setSelectedInPersonTime(slotId);
      setAvailability((prev) => ({ ...prev, time: slotId }));
      setSelectedVirtualTime(null); // Clear virtual time when in-person is selected
    } else {
      setSelectedVirtualTime(slotId);
      setAvailability((prev) => ({ ...prev, time: slotId }));
      setSelectedInPersonTime(null); // Clear in-person time when virtual is selected
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.goToSlide(selectedDate);
    }
  }, [selectedDate]);

  return (
    <div className="w-full">
      <Label label="Select date time availability" fontColor={labelFont} />
      <div className="w-full grid grid-cols-12 items-center my-5">
        <button
          className="col-span-2 md:col-span-1 justify-self-end md:justify-self-start flex items-center justify-center h-[2.6rem] w-[2.8rem] mr-auto md:mr-0 border border-green rounded-md"
          onClick={() => ref.current.previous()}
        >
          <Image src="/GreenArrowLeft.png" alt="Arrow Left" className="h-2.5" />
        </button>
        <div className="col-span-8 md:col-span-10 md:px-5 h-[5rem]">
          <Carousel
            itemClass="flex justify-center"
            ref={ref}
            arrows={false}
            renderButtonGroupOutside={true}
            responsive={responsive}
          >
            {availability.map((item, idx) => (
              <div
                className={`${
                  item.isAvailable
                    ? idx === selectedDate
                      ? "bg-green text-white cursor-pointer"
                      : "bg-white text-black cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } flex justify-center items-center w-full text-sm md:h-12 rounded-md`}
                key={item.date}
                onClick={() => selectDate(idx, item.isAvailable)}
              >
                {item.fullDate}
              </div>
            ))}
          </Carousel>
        </div>
        <button
          className="col-span-2 md:col-span-1 justify-self-end md:justify-self-end flex items-center justify-center h-[2.6rem] w-[2.8rem] ml-auto md:ml-0 border border-green rounded-md"
          onClick={() => ref.current.next()}
        >
          <Image src="/GreenArrowRight.png" alt="Arrow Right" className="h-2.5" />
        </button>
      </div>
      {availability[selectedDate]?.isAvailable && (
        <div className="mt-4">
          <AvailabilityTime
            timeSlots={availability[selectedDate]?.inPersonTimeSlots || []}
            selectTime={selectTime}
            selectedTime={selectedInPersonTime}
            slotType="inPersonTimeSlots"
          />
          <AvailabilityTime
            timeSlots={availability[selectedDate]?.virtualTimeSlots || []}
            selectTime={selectTime}
            selectedTime={selectedVirtualTime}
            slotType="virtualTimeSlots"
          />
        </div>
      )}
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default DateAndSlot;
