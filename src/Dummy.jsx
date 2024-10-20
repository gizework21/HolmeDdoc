import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

const values = [
  {
    id : 1,
    title: 'Hello'
  }, {
    id: 2,
    title: 'HIii'
  }, {
    id: 3,
    title: 'adas'
  }
]

const schema = Joi.object({
  username: Joi.object().keys({
    id: Joi.number().required(),
    title: Joi.string().required()
  }).required()
});

const Dummy = () => {
  const navigate = useNavigate()
  const height = window.innerHeight
  const width = window.innerWidth
  const { handleSubmit, control, setValue, watch,     formState: { errors },
} = useForm({
    mode: "onSubmit",
    resolver: joiResolver(schema)
  });
  // console.log(errors)

  // console.log(watch('username'))
  const onSubmit = (e) => {
    // console.log('done')
    // e.preventDefault();
    // console.log(e);
  };
  return (
    
    <div className='space-y-10 p-5'>
       <input className="border-2"/>
       <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({
            field: { onChange, onBlur, value, name, ref },
            formState: { errors }
          }) => (
            <>
              {values.map(el => <h1 key={el.id} onClick={() => setValue('username' , el, { shouldValidate: true } )}>{el.title}</h1>)}
            </>
          )}
          />
          <button type="submit">submit</button>
      </form>
        <h1 className='cursor-pointer' onClick={() => navigate('/home')}>Home</h1>
        <h1 className='cursor-pointer' onClick={() => navigate('/login')}>Login</h1>
        <h1 className='cursor-pointer' onClick={() => navigate('/register')}>Register</h1>
        <h1 className='cursor-pointer' onClick={() => navigate('/forgotPassword')}>ForgotPassword</h1>
        <h1 className='cursor-pointer' onClick={() => navigate('/doctorsearch')}>Doctor List</h1>
        <h1 className='cursor-pointer' onClick={() => navigate('/doctorprofile')}>Doctor Profile</h1>
        <h1 className='cursor-pointer' onClick={() => navigate('/book')}>Book Appointment</h1>
        <h1 className='cursor-pointer' onClick={() => navigate('/account/myAppointment')}>My Appointment</h1>
        <h1 className='cursor-pointer' onClick={() => navigate('/account/myProfile')}>My Profile</h1>
        <h1 className='cursor-pointer' onClick={() => navigate('/bookingSuccess')}>Booking Success</h1>
        <h1 className='cursor-pointer' onClick={() => navigate('/aboutUs')}>About Us</h1>
        <h1 className='cursor-pointer' onClick={() => navigate('/changePassword')}>Change Password</h1>
        <h1 className='cursor-pointer' onClick={() => navigate('/bookTopDoctor')}>Book Top Doctor</h1>
        <h1>{height}x{width}</h1>
        {/* <h1 className="md:text-[2.5rem] lg:text-[3.6rem] tracking-widest text-gray-900 font-medium flex items-center space-x-5">
          <p>1. HOLISTIC</p>
          <div className="flex items-center">
            <div className="relative">
              <p>M</p>
              <img  className="md:h-[2.7rem] lg:h-[3.6rem] absolute md:top-[4px] md:left-[0px]  lg:top-[10px] lg:left-[0.3px]" src={require('./assets/images/home/Leaf.png')} alt="M"/>
            </div>
            <p>EDICINE</p>
          </div>
          <p>CONNECTING</p>
        </h1>
        <h1 className="md:text-[2.5rem] lg:text-[3.6rem] tracking-widest text-gray-900 font-medium flex items-center space-x-5">
          <p>2. HOLISTIC</p>
          <div className="flex items-center">
            <div className="relative">
              <p>M</p>
              <img  className="md:h-[2.7rem] lg:h-[3.6rem] absolute md:top-[4px] md:left-[0px]  lg:top-[10px] lg:left-[-0.5px]" src={require('./assets/images/home/Leaf.png')} alt="M"/>
            </div>
            <p>EDICINE</p>
          </div>
          <p>CONNECTING</p>
        </h1>
        <h1 className="md:text-[2.5rem] lg:text-[3.6rem] tracking-widest text-gray-900 font-medium flex items-center space-x-5">
          <p>3. HOLISTIC</p>
          <div className="flex items-center">
            <div className="relative">
              <p>M</p>
              <img  className="md:h-[2.7rem] lg:h-[3.6rem] absolute md:top-[4px] md:left-[0px]  lg:top-[10px] lg:left-[0px]" src={require('./assets/images/home/Leaf.png')} alt="M"/>
            </div>
            <p>EDICINE</p>
          </div>
          <p>CONNECTING</p>
        </h1>
        <img src={require('./assets/images/home/M.png')} alt="M" className='h-[3.6rem]'/> */}
    </div>
  )
}

export default Dummy