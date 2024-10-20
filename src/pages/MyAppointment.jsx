import React from 'react'
import Sidebar from '../components/Sidebar'
import AppointmentContainer from '../components/AppointmentContainer'

const MyAppointment = () => {
  return (
    <div className='max-h-screen flex max-w-[100vw]'>
        <Sidebar />
        <AppointmentContainer />
    </div>
  )
}

export default MyAppointment