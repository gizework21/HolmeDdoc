import React, { useState, useEffect } from 'react'
import Register2 from './Register2'
import Register1 from './Register1'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Home } from '../../data/urls';

const Register = () => {
    const [step, setStep] = useState(0)
    const isLoggedIn = useSelector(state => state.auth.currentUser?.remember_token)
    const [phone, setPhone] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if(isLoggedIn){
           navigate(Home) 
        }
    }, [isLoggedIn, navigate])

    if(step === 0){
        return <Register1 setPhone={setPhone}  nextStep={() => setStep(s => s+1)}/>
    }

    return <Register2  phone={phone}/>
}

export default Register