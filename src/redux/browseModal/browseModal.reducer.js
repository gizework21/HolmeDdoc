import { createSlice } from "@reduxjs/toolkit";

export const browseModal = createSlice({
  name: "browseModal",
  initialState: {
    city: [],
    isFetching: true
  },
  reducers: {
    startFetching: (state) => {
      state.isFetching = true;
    },
    setData: (state, action) => {
      state.city = action.payload
      state.isFetching = false;
    }
  }
});

export const { startFetching, setData } = browseModal.actions;

export default browseModal.reducer;