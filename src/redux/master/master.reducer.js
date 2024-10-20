import { createSlice } from "@reduxjs/toolkit";

export const masterSlice = createSlice({
  name: "master",
  initialState: {
    specialities: [],
    conditions: [],
    featuredConditions: [],
    featuredDoctors: [],
    featuredSpecialities: []
  },
  reducers: {
    setSpecialitiesMaster: (state, action) => {
        state.specialities = action.payload
    },
    setConditionsMaster: (state, action) => {
        state.conditions = action.payload
    },
    setFeaturedConditionsMaster: (state, action) => {
      state.featuredConditions = action.payload
    },
    setFeaturedDoctorsMaster: (state, action) => {
      state.featuredDoctors = action.payload
    },
    setFeaturedSpecialitiesMaster: (state, action) => {
      state.featuredSpecialities = action.payload
    },
  }
});

export const { setSpecialitiesMaster, setConditionsMaster, setFeaturedConditionsMaster, setFeaturedDoctorsMaster, setFeaturedSpecialitiesMaster } = masterSlice.actions;

export default masterSlice.reducer;