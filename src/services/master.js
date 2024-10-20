import customAxios from "../utils/CustomAxios";

export const createFormData = (data) => {
    const formData = new FormData()
    for(let key in data){
        if(data[key]){
            formData.append(key, data[key])
        }
    }
    return formData
}


export const getAllCity = async (data) =>{
    try{
        const result = await customAxios.post('/patient/master/city', createFormData(data))
        return result?.data ? result?.data?.data?.result : null
    }catch(err){
        return err
    }
}

export const getAllState = async (data) =>{
    try{
        const result = await customAxios.post('/patient/master/state', createFormData({...data, country: 2}))
        return result?.data ? result?.data?.data?.result : null
    }catch(err){
        return err
    }
}


export const getAllInsuarance = async (data) =>{
    try{
        const result = await customAxios.post('/patient/master/insurance', createFormData({...data}))
        return result?.data ? result?.data?.data?.result : null
    }catch(err){
        return err
    }
}

export const getAllLanguages = async (data) =>{
    try{
        const result = await customAxios.post('/patient/master/language', createFormData({...data}))
        return result?.data ? result?.data?.data?.result : null
    }catch(err){
        return err
    }
}

export const getAllMedicalConditions = async (data) =>{
    try{
        const result = await customAxios.post('/patient/master/condition', createFormData({...data}))
        return result?.data ? result?.data?.data?.result : null
    }catch(err){
        return err
    }
}

export const getAllSpeciality = async (data) =>{
    try{
        const result = await customAxios.post('/patient/master/speciality', createFormData({...data}))
        return result?.data ? result?.data?.data?.result : null
    }catch(err){
        return err
    }
}

export const getAllZip = async (data) =>{
    try{
        const result = await customAxios.post('/patient/master/zip', createFormData({...data}))
        // console.log(result.data)
        return result?.data ? result?.data?.data?.result : null
    }catch(err){
        return err
    }
}



export const getGeneralSettings = async () =>{
    try{
        const result = await customAxios.post('/patient/footers')
        // console.log(result.data)
        return result?.data ? result?.data?.data?.result : null
    }catch(err){
        return err
    }
}

export const deleteProfile = async () =>{
    try{
        const result = await customAxios.post('/patient/delete_account')
        return result?.data ? result?.data?.data?.result : null
    }catch(err){
        return err
    }
}