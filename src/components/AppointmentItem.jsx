import moment from "moment";
import React from "react";

const AppointmentItem = ({
  name,
  date,
  reason,
  id,
  selectedAppointment,
  handleAppointmentSelect,
  booked_on,
}) => {
  // console.log('doctorId',doctorId)

  return (
    <div
      className={`cursor-pointer px-5 py-4 space-y-1  border-b border-gray-300 hover:bg-white ${
        id === selectedAppointment ? "bg-white" : "bg-gray-200"
      }`}
      onClick={() => handleAppointmentSelect(id)}
    >
      <h1 className="text-gray-900 font-medium">{name}</h1>
      <h5 className="text-gray-400 text-size-3 font-thin add-word-spacing">
        Scheduled For: {date}
      </h5>
      <div className="flex justify-between">
        <h1 className="text-gray-700 text-size-4 font-thin">{reason}</h1>
        <h1 className="text-gray-400 text-size-4 font-thin">{booked_on}</h1>
      </div>
    </div>
  );
};

export default AppointmentItem;
