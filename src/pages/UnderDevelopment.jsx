import React from 'react'
import Image from '../components/Image';
import NewNavBarHolmeddoc from "../parts/NewNavBarHolmeddoc"; 

const UnderDevelopment = () => {
  return (
    <div className='h-[100vh] flex flex-col'>
      <NewNavBarHolmeddoc />
      <div className='flex-1 w-full flex flex-col items-center justify-center md:pt-24'>
        <Image className='h-[12rem] md:h-[18rem]' src={'/home/UnderMaintenance.png'} staticUrl={require('../assets/images/UnderMaintenance.png')} alt="maintenance"/>
        <h1 className='mt-5 text-gray-600'>WE ARE COMING SOON</h1>
        <h1 className='mt-4 text-size-8 md:text-size-10 font-bold text-grey tracking-[2px] text-center'>The page is under maintenance!</h1>
      </div>
    </div>
  )
}

export default UnderDevelopment 