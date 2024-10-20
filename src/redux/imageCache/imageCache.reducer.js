import { createSlice } from "@reduxjs/toolkit";

export const imageCacheSlice = createSlice({
  name: "imageCache",
  initialState: {
    doctorImages: {}
  },
  reducers: {
    addDoctorImage: (state, action) => {
        const { key, expiry, date, imgUrl } = action.payload
        state.doctorImages[key] = {
            expiry,
            date,
            imgUrl
        }
        console.log(state)
    },
  }
});

export const { addDoctorImage } = imageCacheSlice.actions;

export default imageCacheSlice.reducer;