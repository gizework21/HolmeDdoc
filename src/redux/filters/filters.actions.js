import CustomAxios from '../../utils/CustomAxios.js'
import { startFilterFetching, setFilters, filtersFetchingFailure } from './filters.reducer.js' 

export const fetchFiltersThunk = () => {
    // console.log('asdasd')

    return async (dispatch) => {
        try{
            // console.log('asdasd')
            dispatch(startFilterFetching())
            const response = await CustomAxios.post('/patient/filters')
            const transformedFilters = response.data.data?.result?.map(item => 
              {
                if(item.title === 'Appointment Type'){
                  item.value = item.value.map((item, idx) => ({
                    id: idx,
                    appointment_type: item
                  }))
                }
                return item
              }
            )
            // console.log(response, transformedFilters)
            dispatch(setFilters(transformedFilters))
        }catch(err){
          // console.log(err)
          dispatch(filtersFetchingFailure())
        }
    }
}