import { createSlice } from '@reduxjs/toolkit'

export const specialitySlice = createSlice({
  name: 'speciality',
  initialState: {
    speciality: [],
    status : 'notLoaded'
  },
  reducers: {
    setSpeciality : (state, action) =>{
        state.speciality = action.payload
    },
    setSpecialityStatus : (state, action) =>{
        state.status = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setSpeciality, setSpecialityStatus } = specialitySlice.actions

export default specialitySlice.reducer