import React from "react";

const AvailabilityTime = ({ timeSlots, selectTime, selectedTime, slotType }) => {
  return (
    <div className="flex items-center overflow-x-scroll scrollbar-hide md:overflow-hidden xl:overflow-visible md:grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
      {timeSlots.map((slot) => {
        const timeRange = `${slot.start_time} - ${slot.end_time}`;
        
        return (
          <div
            className={`${
              slot.status === 'available'
                ? timeRange === selectedTime
                  ? "bg-green text-white cursor-pointer" // Highlight the selected time slot
                  : "text-gray-800 bg-[#d5f9f9] cursor-pointer" // Available time slot
                : "text-grey bg-lightgrey" // Booked time slot
            } flex items-center justify-center text-sm h-[2.5rem] min-w-[8rem] rounded-md transition-all duration-200`}
            key={slot.id}
            onClick={() => {
              console.log("Slot clicked11:", slot.id);
              console.log("Slot timerange:", timeRange);
              selectTime(timeRange, slot.status === "available", slotType);
            }}
          >
            {slot.status === 'available' ? (
              timeRange
            ) : (
              <span className="tooltip">
                <strike>{timeRange}</strike>
                <span className="tooltiptext text-green font-bold">Booked</span>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};


export default AvailabilityTime;







// import React from "react";

// const AvailabilityTime = ({ timeSlots = [], selectTime, selectedTime }) => {
//   return (
//     <div className="flex items-center overflow-x-scroll scrollbar-hide md:overflow-hidden xl:overflow-visible md:grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
//       {timeSlots.length === 0 ? (
//         <div className="text-gray-500">No available time slots</div>
//       ) : (
//         timeSlots.map((slot) => (
//           <div
//             className={`flex items-center justify-center text-sm h-[2.5rem] min-w-[8rem] rounded-md cursor-pointer transition-all duration-200 ${
//               slot.status === "available"
//                 ? slot.id === selectedTime
//                   ? "bg-green text-white h-[3rem] border-2 border-white" // Selected time slot with increased height
//                   : "text-gray-800 bg-black" // Available time slot
//                 : "text-gray bg-lightgrey" // Booked time slot
//             }`}
//             key={slot.id}
//             onClick={() => {
//               if (slot.status === "available") {
//                 console.log(`Selected slot: ${slot.start_time} - ${slot.end_time}`); // Log the selected time range
//                 selectTime(slot.id, true); // Pass the slot id
//                 // selectTime(slot.id); 

//               }
//             }}
//           >
//             {slot.status === "available" ? (
//               `${slot.start_time} - ${slot.end_time}`
//             ) : (
//               <span className="tooltip">
//                 <strike>{`${slot.start_time} - ${slot.end_time}`}</strike>
//                 <span className="tooltiptext text-green font-bold">Booked</span>
//               </span>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default AvailabilityTime;


