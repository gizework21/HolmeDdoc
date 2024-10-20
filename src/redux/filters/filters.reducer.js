import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    doctorFilters : [],
    isFetching: true,
    isFailed: false 
  },
  reducers: {
    startFilterFetching: (state, action) => {
        state.isFetching = true
        state.isFailed = false
    },
    setFilters: (state, action) => {
        state.doctorFilters = action.payload
        state.isFetching = false
    },
    filtersFetchingFailure: (state, action) => {
      state.isFetching = false
      state.isFailed = true
    }
  }
});

export const { setFilters, startFilterFetching, filtersFetchingFailure } = filtersSlice.actions;

export default filtersSlice.reducer;