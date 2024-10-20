import CustomAxios from '../../utils/CustomAxios.js'
import { setSpecialitiesMaster, setConditionsMaster, setFeaturedConditionsMaster, setFeaturedDoctorsMaster, setFeaturedSpecialitiesMaster } from './master.reducer.js' 

export const fetchMasterDataThunk = () => {
    return async (dispatch) => {
        try{
            const specialities = await CustomAxios.post('patient/master/speciality', {
                paginate: 100
            })
            dispatch(setSpecialitiesMaster(specialities.data.data.result?.map(el => ({
                title: el.medical_speciality_name,
                id: el.id,
                type: 'Specialities',
                seo_url: el.speciality_url,
                img_url: el.image,
                description: el.description
            }))))
            const featuredSpecialities = await CustomAxios.post('patient/master/speciality', {
                paginate: 6,
                featured: "1"
            })
            dispatch(setFeaturedSpecialitiesMaster(featuredSpecialities.data.data.result?.map(el => ({
                title: el.medical_speciality_name,
                id: el.id,
                type: 'Specialities',
                seo_url: el.speciality_url,
                img_url: el.image,
                description: el.description
            }))))
            const conditions = await CustomAxios.post('patient/master/condition', {
                paginate: 100
            })
            dispatch(setConditionsMaster(conditions.data.data.result?.map(el => ({
                title: el.medical_condition_name,
                id: el.id,
                type: 'Conditions',
                seo_url: el.condition_url
            }))))
            const featuredConditions = await CustomAxios.post('patient/master/condition', {
                paginate: 4,
                featured: "1"
            })
            dispatch(setFeaturedConditionsMaster(featuredConditions.data.data?.result ?? []))
            let featuredDoctors = await CustomAxios.post('/patient/doctors', {
                paginate: 3,
                featured: "1"
            })
            featuredDoctors = featuredDoctors.data.data?.result ?? []
            featuredDoctors = featuredDoctors.map(el => ({ image : el.doctor_image, 
                 name: el.doctor_name, 
                 speciality : el.medical_speciality, 
                 bio : el.doctor_bio,
                 id: el.id,
                 seo_url: el.seo_url,
                 location: el.country.join(', ')  
            }))
            dispatch(setFeaturedDoctorsMaster(featuredDoctors))
        }catch(err){
          // console.log(err)
        }
    }
}