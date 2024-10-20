import React, { useReducer, useState } from "react";
import SearchDoctor from "./SearchDoctor";
import { SearchItems, InsurancePlans } from "../../utils/DummyData";
import SearchLocation from "./SearchLocation";
import CustomDatePicker from "./CustomDatePicker";
import Container from "../Container";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useNavigate } from "react-router-dom"
import  { ReactComponent as SearchBarIcon }   from "../../assets/images/home/SearchBarIcon.svg"
import { DoctorList } from '../../data/urls'
import {  useDispatch } from 'react-redux'
import { setSelectedFilters } from '../../redux/doctor/doctor.reducer';
import { setSpeciality } from '../../redux/headerSearch'
import moment from 'moment';

const searchReducer = (state, action) => {
    const newState = {...state}
    switch(action.type){
        case 'SELECT_SPECIALITY': 
            newState.speciality = action.payload
            return newState
        case 'SELECT_LOCATION':
            newState.location = action.payload
            return newState
        case 'SELECT_DATE':
            newState.date = action.payload
            return newState
        default:
            return state
    }
}

const initialState = {
    speciality: {
        id: null,
        seo_url : '',
        type: '',
        title: '',
    },
    location:{
        id: null,
        title: '',
    },
    date: new Date()
}
const Filter = ({ drawer }) => {
    const { isSmallScreen } = useWindowWidth()
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(searchReducer, initialState)
    const [locationStr, setLocationStr] = useState('')
    const { speciality, location, date } = state
    const dispatchFn = useDispatch()
    const searchDoctors = () => {
        let queryString = `selected_date=${moment(date).format("YYYY-MM-DD")}`
        if(speciality.id){
            if(speciality.type === "Conditions"){
                queryString += `&condition=${speciality.seo_url}`
                dispatchFn(setSpeciality(speciality))
                dispatchFn(setSelectedFilters({ filterName: 'medical_condition_name', selected: [speciality.id] }))
            }else{
                queryString += `&specialty=${speciality.seo_url}`
                dispatchFn(setSpeciality(speciality))
                dispatchFn(setSelectedFilters({ filterName: 'medical_speciality_name', selected: [speciality.id] }))
            }
        }   
        if(location.id){
            // queryString += `&locationId=${location.id}`
            queryString += `&location=${location.title}_${location.id.split('-')[2]}`
        }
        navigate(`${DoctorList}?${queryString}`)
    }

    return (
        <Container isFilter>
            <div className="w-full flex justify-center">
                <div className="w-full md:w-[1790px] flex flex-col items-center justify-center md:flex-row  md:h-[104px]">
                    <div className={`space-y-2 md:space-y-0 bg-white h-full py-6 md:p-2 w-full rounded-2xl md:rounded-full flex items-center justify-center flex-col md:flex-row md:justify-between ${drawer && 'border-2 border-gray-100'}`}>
                        <div className="space-y-5 md:space-y-0 md:space-x-2 2xl:space-x-4 md:pl-8 md:pr-4 lg:pl-12 lg:pr-5 py-2 w-full flex items-center justify-center flex-col md:flex-row md:h-[7rem]">
                            <div className={`w-full md:w-[80%] 2xl:w-full px-6 pb-5 md:px-0 md:pb-0 ${drawer && 'border-b'}`}>
                                <SearchLocation setLocationStr={setLocationStr} items={SearchItems} isSmallScreen={isSmallScreen} selectedItem={state.location} setSelectedItem={(item) => dispatch({ type: 'SELECT_LOCATION', payload: item })}/>
                            </div>
                            <div className={`w-full px-6 pb-5 md:px-0 md:pb-0 ${drawer && 'border-b'}`}>
                                <SearchDoctor items={InsurancePlans} isSmallScreen={isSmallScreen} selectedItem={state.speciality} setSelectedItem={(item) => dispatch({ type: 'SELECT_SPECIALITY', payload: item })}/>
                            </div>
                            <div className="w-full md:w-[80%] searchLg:w-[90%] xl:w-[80%] searchXl:w-[90%] 2xl:w-full px-6 md:px-0">
                                <CustomDatePicker isSmallScreen={isSmallScreen} selectedDate={state.date} setSelectedDate={date => dispatch({ type: 'SELECT_DATE', payload: date })}/>
                            </div>
                            {/* <SelectInsurance carriers={InsuranceData} plans={InsurancePlans} isSmallScreen={isSmallScreen} /> */}
                        </div>
                        <div className={`h-[100%] w-full md:w-[7rem] md:h-[5.2rem] flex md:block justify-center items-center ${ drawer && 'px-3' }`}>
                            <button className="hidden md:flex bg-green w-[5.2rem] h-full items-center justify-center rounded-full text-white" onClick={searchDoctors}><SearchBarIcon className="h-[90%]" /></button>
                            <button className={`md:hidden bg-green ${drawer ? 'w-full rounded-md' : 'w-[50%]'} h-[40px] flex items-center justify-center text-white mt-8 rounded-full`} onClick={searchDoctors}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default Filter;