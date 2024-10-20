import { createSlice, current } from "@reduxjs/toolkit";

export const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    list : [],
    totalCount: 0,
    selectedFilters: {},
    searchTerm: '',
    currentPage: 1,
    isFetching: true,
    isFailed: false 
  },
  reducers: {
    startDoctorListFetching: (state, action) => {
        state.isFetching = true
        state.isFailed = false
    },
    doctorListFetchingSuccess: (state, action) => {
        state.list = action.payload.list
        state.totalCount = action.payload.totalCount
        state.isFetching = false
    },
    doctorListFetchingFailure: (state, action) => {
        state.isFetching = false
        state.isFailed = true
    },
    setSelectedFilters: (state, action) => {
      const { filterName, selected } = action.payload
      state.selectedFilters[filterName] = selected
    },
    removeSpecificFilter: (state, action) => {
      const  { filterType, idToRemoved } = action.payload
      const filterName = filterType === 'Speciality' ? 'medical_speciality_name' : 'medical_condition_name'
      state.selectedFilters[filterName] = state.selectedFilters[filterName].filter(el => el !== idToRemoved)
    },
    setSelectedMobileFilters: (state, action) => {
      state.selectedFilters = action.payload //can be improved
    },
    setAppointmentType: (state, action) => {
      if(!state.selectedFilters.appointment_type){
        state.selectedFilters.appointment_type = []
      }
      if(!state.selectedFilters.appointment_type?.includes(action.payload)){
        // console.log('Not Included')
        state.selectedFilters.appointment_type = [...state.selectedFilters.appointment_type, action.payload]        
      }else{
        // console.log('Included')
        state.selectedFilters.appointment_type =  state.selectedFilters.appointment_type.filter(id => id !== action.payload)     
      }
      // console.log(state.selectedFilters.appointment_type)
    },
    setSearchTermValue: (state, action) => {
      state.searchTerm = action.payload
    },
    clearSelectedFilters: (state) => {
      state.selectedFilters = {}
    },
    clearFiltersFromArr: (state, action) => {
      const actionsTobeCleared = [...new Set(['appointment_type', 'insurance_company_name', 'language_title', ...action.payload])]
      actionsTobeCleared.forEach(el => state.selectedFilters[el] = [])
    },
    resetDoctorList: (state) => {
      state.list = []
      state.totalCount = 0
      state.searchTerm = ''
      state.isFetching = true
      state.isFailed = false
      state.currentPage = 1
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    }
  }
});

export const { startDoctorListFetching, doctorListFetchingSuccess, doctorListFetchingFailure, setSelectedFilters, setSelectedMobileFilters, setAppointmentType, setSearchTermValue, clearSelectedFilters, resetDoctorList, setCurrentPage, removeSpecificFilter, clearFiltersFromArr } = doctorSlice.actions;

export default doctorSlice.reducer;