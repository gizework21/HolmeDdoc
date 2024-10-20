import CustomAxios from '../../utils/CustomAxios.js'
import { signOut } from './auth.reducer'
// export const loginThunk = ({ phone, password }) => {
//     return async (dispatch) => {
//         const response = await CustomAxios.post('/patient/login', { phone, password })
//         console.log(response)
//     }
// }

export const logoutThunk = () => {
    return async (dispatch) => {
        dispatch(signOut())
        await CustomAxios.post('/patient/logout')
    }
}