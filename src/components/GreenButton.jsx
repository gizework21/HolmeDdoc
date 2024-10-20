import React from 'react'

const GreenButton = ({ additionalStyles, handleClick, outline, type, children, disable, className }) => {
  return (
    <button onClick={handleClick} disabled={disable} type={type} className={`${className ? className : null} ${!outline ? 'bg-green text-white' : 'bg-transparent text-green border-2 border-green' } px-7 py-3 rounded-full font-basic-sans-regular sm:text-base text-sm z-10 btn-wordspace  font-medium tracking-[0.5px] ${additionalStyles}`}>
        {children}
    </button>
  )
}

export default GreenButton