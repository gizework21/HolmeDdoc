import { createSlice } from "@reduxjs/toolkit";

export const headerSearchSlice = createSlice({
  name: "headerSearch",
  initialState: {
    speciality: {
        id: null,
        seo_url : '',
        type: '',
        title: '',
        typing: false
    }
  },
  reducers: {
    setSpeciality: (state, action) => {
       state.speciality.id = action.payload.id
       state.speciality.seo_url = action.payload.seo_url
       state.speciality.type = action.payload.type
       state.speciality.title = action.payload.title
       state.speciality.typing = action.payload.typing ?? false
    }
  }
});

export const { setSpeciality } = headerSearchSlice.actions;

export default headerSearchSlice.reducer;