import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser : null,
    phoneNumber : null,
    userName : null
  },
  reducers: {
    signIn: (state, action) => {
        state.currentUser = action.payload
    },
    signOut: (state) => {
        state.currentUser = null;
    },
    setPatientEmail: (state, action) =>{
      state.currentUser.patient_email = action.payload
    },
    setPhoneNumber: (state, action) =>{
      state.phoneNumber = action.payload
    },
    setUserName : (state, action) =>{
      state.userName = action.payload
    }
  }
});

export const { signIn, signOut, setPhoneNumber, setUserName, setPatientEmail } = authSlice.actions;

export default authSlice.reducer;