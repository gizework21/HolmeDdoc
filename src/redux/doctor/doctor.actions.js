import moment from 'moment'
import CustomAxios from '../../utils/CustomAxios.js'
import { doctorListFetchingFailure, doctorListFetchingSuccess, startDoctorListFetching } from './doctor.reducer'

const DayMapping = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
}

const mapping = {
    "appointment_type": "appointment_type",
    "insurance_company_name": "insurance",
    "language_title": "language",
    "medical_condition_name": "conditions",
    "medical_speciality_name": "speciality"
}

export const fetchDoctorsThunk = ({ paginate, page, appliedFilters, searchTerm, location, selectedDate }) => {
    return async (dispatch) => {
        dispatch(startDoctorListFetching())
        const formData = new FormData()
        formData.append('paginate', paginate)
        formData.append('page', page)
        if(searchTerm){
            formData.append('search', searchTerm)
        }
        if(location){
            formData.append('serving_areas', location.split('_')[1])
        }
        if(selectedDate){
            formData.append('time_slot_day',DayMapping[moment(selectedDate).day()])
        }else{
            formData.append('time_slot_day',DayMapping[moment(new Date()).day()])
        }
        // formData.append('serving_areas', '1')
        for(let key in appliedFilters){
            const arr = appliedFilters[key]
            if(key === "appointment_type" && arr.length >= 1){
                if(arr.length === 2){
                    continue
                }
                const type = arr[0] === 0 ? "InPerson" : "Virtual"
                formData.append('appointment_type', type)
                continue
            }
            appliedFilters[key].forEach(id => {
                formData.append(`${mapping[key]}[]`, id)
            })
        }
        // console.log(appliedFilters)
        // for (var pair of formData.entries()) {
        //     console.log(pair[0] + ", " + pair[1]);
        // }
        try{
            const response = await CustomAxios.post('/patient/doctors', formData)
            if(response.data.success){
                dispatch(doctorListFetchingSuccess({ list: response.data.data?.result, totalCount: response.data.data?.total_count ?? 0}))
            }else{
                alert(response.data.message)
                dispatch(doctorListFetchingFailure())
            }
        }catch(err){
            // console.log(err)
            alert(err.message)

            dispatch(doctorListFetchingFailure())
        }
    }
}