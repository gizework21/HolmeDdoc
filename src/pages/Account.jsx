import React, { useEffect } from 'react'
import MyProfile from './MyProfile'
import MyAppointment from './MyAppointment'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../data/urls'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Account = () => {
    const isLoggedIn = useSelector(state => state.auth.currentUser?.remember_token)
    const navigate = useNavigate()

    useEffect(() => {
        if(!isLoggedIn){
           navigate(Login) 
        }
    }, [isLoggedIn, navigate])
  return (
    <Routes>
        <Route path="/myProfile/*" element={<MyProfile />}/>
        <Route path="/myAppointment" element={<MyAppointment />}/>
    </Routes>
  )
}

export default Account