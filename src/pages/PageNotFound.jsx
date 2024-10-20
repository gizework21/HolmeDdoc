import React from 'react'
import Logo from "../assets/images/icons/Logo.png";
import Image from '../components/Image';


const PageNotFound = () => {
  return (
    <div className='flex h-[100vh] space-y-3 justify-center flex-col items-center'>
      <Image className='h-[40vh] w-auto' src={'/icons/Logo.png'} staticUrl={Logo} alt="logo" />
      <h1 className='text-4xl text-gray-500'>404</h1>
      <h1 className='text-5xl text-gray-500'>Page Not Found</h1>
    </div>
  )
}

export default PageNotFound