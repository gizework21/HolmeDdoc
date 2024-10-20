import React, { useState, useEffect } from 'react'
import ForgotPassword1 from './ForgotPassword1'
import ForgotPassword2 from './ForgotPassword2'
import ForgotPassword3 from './ForgotPassword3'
import SuccessModal from '../../components/SuccessModal'
import useIsLoggedIn from '../../hooks/useIsLoggedIn'
import { useNavigate } from 'react-router-dom'
import { Home, Login } from '../../data/urls'

const ForgotPassword = () => {
    const [step, setStep] = useState(0)
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const isLoggedIn = useIsLoggedIn()
    const navigate = useNavigate()
    useEffect(() => {
        if(isLoggedIn){
           navigate(Home) 
        }
    }, [isLoggedIn, navigate])

    const [showPortal, setShowPortal] = useState(false)

    const closePortal = () => setShowPortal(false)

    if(step === 0){
        return <ForgotPassword1 nextStep={() => setStep(s => s+1)} setPhone={setPhone}/>
    }

    if(step === 1){
        return <ForgotPassword2 nextStep={() => setStep(s => s+1)} phone={phone} setOtp={setOtp}/>
    }

    return <>
        <SuccessModal 
            showPortal={showPortal}
            closePortal={closePortal}
            successUrl={Login}
            btnText={"Back to Login"}
        />
        <ForgotPassword3 nextStep={() => setShowPortal(true)} phone={phone} otp={otp}/>
    </>
}

export default ForgotPassword