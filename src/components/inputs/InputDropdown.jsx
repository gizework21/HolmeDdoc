import { useState, useEffect, useRef } from 'react';
import useToggle from "../../hooks/useToggle"
import Label from './Label'
import ErrorMessage from '../ErrorMessage';

export default function InputDropdown({ options, nameKey, searchTerm, selectedOption, selectOption, placeholder, showDropdownIcon, label, showDropdownIconWithoutBorder, allowClick, ...otherProps }) {
    const [showDropdown, toggleShowDropdown] = useToggle(false)
    const [selected, setSelected] = useState({})
    const dropdownEl = useRef()

    nameKey = nameKey ?? 'title'

    useEffect(() => {
        if(otherProps.value){
            const selectedItem = options.find(option => option.id == otherProps.value)
            if(!selectedItem){
                return
            }
            setSelected(selectedItem) 
            otherProps.setValue(otherProps.name , selectedItem[nameKey], { shouldValidate: true } )
        }
    }, [otherProps.value])

    let borderColor = "";
    if (otherProps.errorMessage) {
        borderColor = "border-red-500";
    } else {
        borderColor = "border-green";
    }

    let height = "h-[43px]  md:h-[43px]"
    let iconSize = 'h-[6px] w-[10px]'
    let fontStyles = 'placeholder:text-size-5 md:placeholder:text-sm placeholder:font-thin'
    if(otherProps.size === "large"){
        height = 'h-[64px]'
        iconSize = 'h-[12.5px] w-[12px]'
        fontStyles = 'placeholder:text-size-6 placeholder:font-thin placeholder:tracking-[3px]'
    }else if(otherProps.grayDropdownIcon){
        fontStyles = 'font-sharp-sans-semibold text-sm placeholder:text-gray-300'
    }


    const handleSelectedChange = (selectedOption) => {
        otherProps.setValue(otherProps.name , selectedOption[nameKey], { shouldValidate: true } )
        setSelected(selectedOption)
        toggleShowDropdown(false)
    }


    let filteredOptions = [...options]
    if(!otherProps.searchDisabled){
        filteredOptions =  options.filter(option => option?.[nameKey]?.includes(searchTerm))
    }

    const hideDropdown = (e) => {
        if (!dropdownEl.current.contains(e.target)) {
            toggleShowDropdown(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', hideDropdown, true)

        return () => {
            window.removeEventListener('click', hideDropdown, true)
        }
    }, [])
    let padding = showDropdownIconWithoutBorder ? 'px-4' : 'px-2'

    let inputStyle = `w-full ${padding} outline-none ${fontStyles} bg-white `
    let iconStyle = `cursor-pointer bg-[white] ${borderColor} h-[98%] flex items-center justify-center`
    let borderStyles = `${borderColor} rounded-md`
    if(showDropdownIcon){
        borderStyles += `  border border-green pr-3`
        iconStyle += ` border-green border-y border-r border-l rounded-r-md px-3  `
    }else if(showDropdownIconWithoutBorder){
        borderStyles += ` rounded-r-none ${borderColor} border-y border-l`
        iconStyle += ` border-green border-y border-r rounded-r-md pl-3 pr-6  `
    }else if(otherProps.grayDropdownIcon){
        borderStyles += ` border border-green pr-3`
    }
    else{
        borderStyles += ` border-[1px]`
        iconStyle += `px-3 hidden`
    }

    let width = 'lg:w-[95%]'
    if(otherProps.fullWidth){
        width = 'w-[100%]'
    }

    const Icon = otherProps.grayDropdownIcon ? require('../../assets/images/Login/GrayDropdown.png') : require("../../assets/images/GreenArrowDown.png")

    const handleClick = () => {
        if(!allowClick) return
        if(!showDropdown){
            toggleShowDropdown(true)
        }else{
            toggleShowDropdown(false)
        }
    }

    return (
        <div ref={dropdownEl} className={`relative h-[fit-content] w-full ${width} border-none shadow-none`}
        >
            <div className='flex flex-col'>
                {label && <Label label={label} textXs={otherProps.textXs} fontColor={otherProps.labelFont}/>}
                <div onClick={handleClick} className={`${height} ${borderStyles} w-full flex items-center`}>
                    <input 
                        className={inputStyle} 
                        onFocus={toggleShowDropdown} 
                        {...otherProps.isValidationSet ? {...otherProps.register(otherProps.name, {
                            ...otherProps.schema
                        })} : null}
                        placeholder={placeholder}
                        disabled={otherProps.disableInput}
                        autoComplete='off'
                    />
                    <img alt="Dropdown" src={Icon} className={`${iconSize} text-green ${showDropdown ? 'rotate-180' : 'rotate-0'} transition-transform duration-300 cursor-pointer`} />
                </div>
                <ErrorMessage errorMessage={otherProps.errorMessage} />
            </div>
            {showDropdown && <div className="absolute top-16 bg-white z-20 px-4 py-3 max-h-[20rem] overflow-auto cursor-pointer shadow-md rounded-md w-full">
                <ul className='space-y-1'>
                    {
                        filteredOptions.map(item => <li key={item.id} className={`${selected.id === item.id && 'text-green'}`} onClick={() => handleSelectedChange(item)}>{item[nameKey]}</li>)
                    }
                </ul>
            </div>}
        </div>
    );
}