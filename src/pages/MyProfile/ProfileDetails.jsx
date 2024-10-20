import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GreenButton from "../../components/GreenButton"
import { EditProfile } from '../../data/urls'
import ProfileHeader from "./ProfileHeader"
import ProfileTable from "./ProfileTable"
import customAxios from "../../utils/CustomAxios";
import HolmeddocLoader from "../../components/HolmeddocLoader";

const ProfileDetails = () => {
    const navigate = useNavigate()
    const [isFetching, setIsFetching] = useState(true)
    const [state, setState] = useState({})

    useEffect(() => {
        (async () => {
          setIsFetching(true);
          const response = await customAxios.post("/patient/profile");
          if (response.data.success) {
            setState(response.data?.data.result);
          } else {
            alert(response.data.messaage);
          }
          setIsFetching(false);
        })();
    }, []);

    if (isFetching){
        return (
            <div className="flex items-center justify-center w-full h-[100vh]">
                <HolmeddocLoader />
            </div>
        );
    }

    return (
        <div className='tall:h-full pt-5'>
            <div className='w-full h-full flex flex-col items-center justify-center tall:space-y-10'>
                <ProfileHeader>Profile Details</ProfileHeader>
                <div className="w-full sm:w-[80%] lg:w-[35.5rem]">
                    <div className="p-5">
                        <ProfileTable profileDetails={state}/>
                    </div>
                    <div className='flex flex-col p-4 sm:p-0 sm:flex-row items-start sm:space-x-3 -ml-2'>
                        <span className='font-black w-[7rem]'>Note : </span>
                        <p className='font-light text-[0.78rem] text-gray-500 sm:-mt-[1px]'>
                            We attach great importance to protecting your private sphere and ensuring that yout data are
                            secure. We collect, process and store personal data(including IP addresses only as permitted)
                            by law or if you have given your consent.
                        </p>
                    </div>
                    <div className='text-center py-5 md:pt-8'>
                        <GreenButton handleClick={() => navigate(EditProfile)}>Edit profile</GreenButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetails