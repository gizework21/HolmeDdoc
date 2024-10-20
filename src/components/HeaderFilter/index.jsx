import React, { useReducer } from 'react'
import  { ReactComponent as SearchBarIcon }   from "../../assets/images/home/SearchBarIcon.svg"
import HandleSearchLocation from './HeaderSearchLocation'
import { SearchItems, InsurancePlans } from "../../utils/DummyData";
import HeaderSearchDoctor from './HeaderSearchDoctor'
import HeaderDatePicker from './HeaderDatePicker';
import useQuery from '../../hooks/useQuery';
import { useEffect } from 'react';
import { DoctorList } from '../../data/urls'
import { useNavigate } from 'react-router-dom'
import { setSelectedFilters, clearFiltersFromArr } from '../../redux/doctor/doctor.reducer';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { setSpeciality } from '../../redux/headerSearch'
// import customAxios from '../../utils/CustomAxios'

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

const searchReducer = (state, action) => {
    const newState = {...state}
    switch(action.type){
        case 'SELECT_LOCATION':
            newState.location = action.payload
            return newState
        case 'SELECT_DATE':
            newState.date = action.payload
            return newState
        case 'SET_LOCATION':
            // const location = SearchItems.find(item => item.id === parseInt(action.payload))
            newState.location = action.payload
            return newState
        case 'SET_LOCATION_TEXT':
            newState.location = {
                id: null,
                title: action.payload
            }
            return newState
        default:
            return state
    }
}

const initialState = {
    location:{
        id: null,
        title: '',
    },
    date: new Date()
}

const HeaderFilter = () => {
    const [state, dispatch] = useReducer(searchReducer, initialState)
    const query = useQuery()
    const { location, date } = state
    const navigate = useNavigate()
    const dispatchFn = useDispatch()
    const selectedFilters = useSelector(state => state.doctor.selectedFilters)
    const speciality = useSelector(state => state.headerSearch.speciality)
    const { specialities : specialitiesMaster, conditions: conditionsMaster } = useSelector(state => state.master)
    const searchDoctors = () => {
        let queryString = `selected_date=${moment(date).format("YYYY-MM-DD")}`
        if(speciality.id){
            if(speciality.type === "Conditions"){
                queryString += `&condition=${speciality.seo_url}`
                //clear all remaining filters expect for selected
                dispatchFn(clearFiltersFromArr(['medical_speciality_name']))
                dispatchFn(setSelectedFilters({ filterName: 'medical_condition_name', selected: [speciality.id] }))
            }else if(speciality.type === "Specialities"){
                queryString += `&specialty=${speciality.seo_url}`
                //clear all remaining filters expect for selected
                dispatchFn(clearFiltersFromArr(['medical_condition_name']))
                // dispatchFn(setSelectedFilters({ filterName: 'medical_condition_name', selected: [] }))
                dispatchFn(setSelectedFilters({ filterName: 'medical_speciality_name', selected: [speciality.id] }))
            }
        }else{
            //clear all filters
            dispatchFn(clearFiltersFromArr(['medical_condition_name', 'medical_speciality_name']))
        }   
        if(location.id){
            // queryString += `&locationId=${location.id}`
            let locationId = location.id
            // if location has 3 ids then extract 2nd id(state_id)
            // if(location.id.split('-').length > 1){
            //     locationId = location.id.split('-')[2]
            // }else{
            //     locationId = location.id
            // }
            queryString += `&location=${location.title}_${locationId}`
        }
        navigate(`${DoctorList}?${queryString}`)
    }

    const specialityQuery = query.get('specialty')
    const conditionQuery = query.get('condition')
    // const locationIdQuery = query.get('locationId')
    const locationQuery = query.get('location')
    const dateQuery = query.get('selected_date')

    useEffect(() => {
        (async () => {
            if(speciality.id || speciality.typing) return
            if(specialityQuery){
                const speciality = specialitiesMaster.find(el => el.seo_url === specialityQuery)
                if(speciality){
                    dispatchFn(setSpeciality(speciality))
                    let previousSpeciality = []
                    if(selectedFilters?.medical_speciality_name?.length > 0){
                        previousSpeciality = selectedFilters?.medical_speciality_name
                    }
                    previousSpeciality = previousSpeciality.find(el => el === parseInt(speciality.id))
                    if(previousSpeciality) return
                    dispatchFn(setSelectedFilters({ filterName: 'medical_condition_name', selected: [] }))
                    dispatchFn(setSelectedFilters({ filterName: 'medical_speciality_name', selected: [speciality.id] }))
                }
            }
            if(conditionQuery){
                const condition = conditionsMaster.find(el => el.seo_url === conditionQuery)
                if(condition){
                    dispatchFn(setSpeciality(condition))
                    let previousCondition = []
                    if(selectedFilters?.medical_speciality_name?.length > 0){
                        previousCondition = selectedFilters?.medical_speciality_name
                    }
                    previousCondition = previousCondition.find(el => el === parseInt(condition.id))
                    if(previousCondition) return
                    dispatchFn(setSelectedFilters({ filterName: 'medical_speciality_name', selected: [] }))
                    dispatchFn(setSelectedFilters({ filterName: 'medical_condition_name', selected: [condition.id] }))
                }
            }
        })()
    }, [specialityQuery, speciality, conditionQuery, specialitiesMaster, conditionsMaster])

    useEffect(() => {
        if(locationQuery){
            dispatch({ type: 'SET_LOCATION', payload: { title: locationQuery.split('_')[0], id: locationQuery.split('_')[1] }})
        }
        if(dateQuery){
            let date = new Date(dateQuery)
            if(!isValidDate(date)){
                date = new Date()
            }
            dispatch({ type: 'SELECT_DATE', payload: date })    
        }
    }, [specialityQuery, conditionQuery, locationQuery, dateQuery])


    return (
        <div className='w-[60%] lg:w-[50%] flex justify-center  border-r-0 rounded-[0.6rem] h-[3.3rem] lg:h-[3.6rem] '>
            <div className='flex items-center border-2 border-gray-300 rounded-[0.6rem] py-2 w-full'>
                <HandleSearchLocation items={SearchItems} selectedItem={state.location} setSelectedItem={(item) => dispatch({ type: 'SELECT_LOCATION', payload: item })}/>
                <HeaderSearchDoctor items={InsurancePlans} selectedItem={speciality} setSelectedItem={(item) => dispatchFn(setSpeciality(item))}/>
                {/* <HeaderSearchInsurance plans={InsurancePlans} carriers={InsuranceData} searchTerm={"Others"} /> */}
                <HeaderDatePicker selectedDate={state.date} setSelectedDate={date => dispatch({ type: 'SELECT_DATE', payload: date })}/>
            </div>
            <button onClick={searchDoctors} className="hidden md:flex -ml-[3rem] bg-green border-y border-r border-gray-500 border-l-none w-[3rem] lg:w-[4rem] h-full items-center justify-center rounded-xl text-white"><SearchBarIcon className="h-20" /></button>
        </div>
    )
}

export default HeaderFilter

//when api is used for search
// useEffect(() => {
    //     (async () => {
    //         if(speciality.id || speciality.typing) return
    //         if(specialityQuery){
    //             let response = await customAxios.post(`patient/master/speciality/${specialityQuery}`)
    //             let totalCount = response.data.data.total_count
    //             if(totalCount > 0){
    //                 let speciality = response.data.data.result[0]
    //                 const searchObject = {
    //                     id: speciality.id,
    //                     seo_url : speciality.speciality_url,
    //                     type: 'Specialities',
    //                     title: speciality.medical_speciality_name,
    //                 }
    //                 dispatchFn(setSpeciality(searchObject))
    //                 let previousSpeciality = []
    //                 if(selectedFilters?.medical_speciality_name?.length > 0){
    //                     previousSpeciality = selectedFilters?.medical_speciality_name
    //                 }
    //                 previousSpeciality = previousSpeciality.find(el => el === parseInt(searchObject.id))
    //                 if(previousSpeciality) return
    //                 dispatchFn(setSelectedFilters({ filterName: 'medical_condition_name', selected: [] }))
    //                 dispatchFn(setSelectedFilters({ filterName: 'medical_speciality_name', selected: [searchObject.id] }))
    //             }
    //         }
    //         if(conditionQuery){
    //             let response = await customAxios.post(`patient/master/condition/${conditionQuery}`)
    //             let totalCount = response.data.data.total_count
    //             if(totalCount > 0){
    //                 let condition = response.data.data.result[0]
    //                 const searchObject = {
    //                     id: condition.id,
    //                     seo_url : condition.condition_url,
    //                     type: 'Conditions',
    //                     title: condition.medical_condition_name,
    //                 }
    //                 dispatchFn(setSpeciality(searchObject))
    //                 let previousCondition = []
    //                 if(selectedFilters?.medical_speciality_name?.length > 0){
    //                     previousCondition = selectedFilters?.medical_speciality_name
    //                 }
    //                 previousCondition = previousCondition.find(el => el === parseInt(searchObject.id))
    //                 if(previousCondition) return
    //                 dispatchFn(setSelectedFilters({ filterName: 'medical_speciality_name', selected: [] }))
    //                 dispatchFn(setSelectedFilters({ filterName: 'medical_condition_name', selected: [searchObject.id] }))
    //             }
    //         }
    //     })()
    // }, [specialityQuery, speciality, conditionQuery])