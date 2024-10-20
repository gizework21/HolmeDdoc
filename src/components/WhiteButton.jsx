import React from 'react'

const WhiteButton = ({ additionalStyles, handleClick, type, children, disable }) => {
  return (
    <button onClick={handleClick} disabled={disable} type={type} className={`bg-white text-green border-2 border-green px-7 py-3 rounded-full font-basic-sans-regular sm:text-base text-sm z-10 btn-wordspace  font-medium tracking-[0.5px] ${additionalStyles}`}>
        {children}
    </button>
  )
}

export default WhiteButton