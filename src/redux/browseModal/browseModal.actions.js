import CustomAxios from '../../utils/CustomAxios.js'
import { setData, startFetching } from './browseModal.reducer.js'


export const fetchBrowseModalDataThunk = () => {
    return async (dispatch) => {
        try{
            dispatch(startFetching())
            const response = await CustomAxios.post('/patient/operating/city')
            dispatch(setData(response.data.data.result ?? []))
        }catch(err){
            dispatch(setData([]))
        }
    }
}