import React from 'react'

const Container = ({ children, bgColor, isFilter }) => {
  return (
    <div className={`md:max-w-full px-5 md:px-11 ${isFilter ? 'pt-8 pb-5 md:pb-20 md:pt-20' : 'py-10 md:pt-20'} bg-${bgColor}`}>
        {children}
    </div>
  )
}

export default Container