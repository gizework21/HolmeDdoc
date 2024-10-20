import React from 'react'

const ProfileHeader = ({ children }) => {
  return (
      <div className='w-full text-center'>
            <h1 className='text-3xl text-gray-900 font-basic-sans-regular tracking-[2px]'>
                { children }
            </h1>
      </div>
  )
}

export default ProfileHeader