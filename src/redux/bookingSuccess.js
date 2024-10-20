import { createSlice } from "@reduxjs/toolkit";

export const bookingSuccessSlice = createSlice({
  name: "bookingSuccess",
  initialState: {
    doctorName: '',
    visitType: '',
    date: '',
    clinicAddress: '',
    time: '',
    condition: '',
    visitedBefore: '',
    practiceArea: '',
    insurance: '',
    reason: '',
    mail: '',
    appointment_number: ''
  },
  reducers: {
    setBookingData: (state, action) => {
        state.doctorName = action.payload.doctorName
        state.visitType = action.payload.visitType
        state.date = action.payload.date
        state.clinicAddress = action.payload.clinicAddress
        state.time = action.payload.time
        state.condition = action.payload.condition
        state.visitedBefore = action.payload.visitedBefore
        state.practiceArea = action.payload.practiceArea
        state.insurance = action.payload.insurance
        state.reason = action.payload.reason
        state.mail = action.payload.mail
        state.appointment_number = action.payload.appointment_number
    }
  }
});

export const { setBookingData } = bookingSuccessSlice.actions;

export default bookingSuccessSlice.reducer;