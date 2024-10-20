import React, { useState } from 'react'
import WhiteDropdown from '../../assets/images/home/WhiteDropdown.png'
import Image from '../Image'

const FilterInput = ({ toggleFocus, title, value, handleSearchTermChange, placeholder, refEl, focus, handleKeyDown, showIcon, handleClick}) => {
    return (
        <div  className="cursor-pointer flex items-center justify-between relative w-full bg-white text-left text-black md:border-r md:px-2 lg:px-6 2xl:px-10">
            {/* <h1 className='md:text-lg lg:text-xl font-medium tracking-wide'>{title}</h1> */}
            <input disabled={false} onClick={handleClick} ref={refEl} onKeyDown={handleKeyDown} onFocus={toggleFocus}  value={value} onChange={handleSearchTermChange} type="text" className={`w-full outline-none text-size-9 placeholder:font-basic-sans-regular md:placeholder:text-size-7 lg:placeholder:text-searchLg  xl:placeholder:text-size-11 placeholder:tracking-[2px] md:placeholder:tracking-[4px]  placeholder:text-gray-800 focus:placeholder:text-gray-400 placeholder:font-medium bg-white`} placeholder={title} />
            {showIcon && <div onClick={toggleFocus}>
                <Image src={'/home/WhiteDropdown.png'} staticUrl={WhiteDropdown} alt="dropdown" className={`h-[12px] md:h-[14px]  float-right text-[grey] ${focus ? 'rotate-180' : 'rotate-0'} duration-300 transition-transform`}/>
            </div>}
        </div>
    )
}

export default FilterInput