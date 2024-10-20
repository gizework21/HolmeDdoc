import React from 'react'

const Header = ({ children }) => {
  return (
    <div>
        <div className='h-1 w-20 bg-golden'></div>
        <h1 className='text-2xl xl:text-4xl tracking-[6px] font-bold text-gray-900 py-5'>{children}</h1>
    </div>
  )
}

export default Header