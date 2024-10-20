import { useState, useEffect, useRef, useCallback } from 'react';
import useToggle from "../../hooks/useToggle"
import Label from './Label'
import ErrorMessage from '../ErrorMessage';
import { Controller } from "react-hook-form";
import FilterDropdownItem from '../FilterDropdownItem'
import useEnableArrowKeys from '../../hooks/useEnableArrowKeys';

export default function InputDropdown({ options, nameKey, control, selectedOption, selectOption, placeholder, showDropdownIcon, label, showDropdownIconWithoutBorder, getDataOnSearch, setValueDuringChange,  clearValueOnClick, bifurcatedOptions, showDropdownWhenSearch, ...otherProps }) {
    const [showDropdown, toggleShowDropdown] = useToggle(false)
    const [selected, setSelected] = useState({})
    const dropdownEl = useRef()
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        if(!searchTerm) return
        if(!showDropdown){
            if(!selected.id){
                setSearchTerm('')
            }
        }
    }, [selected, searchTerm, showDropdown])

    nameKey = nameKey ?? 'title'

    useEffect(() => {
        const selectedItem = options.find(option => option.id == otherProps?.defaultId)
        if (!selectedItem) {
            return
        }
        setSearchTerm(selectedItem[nameKey])
        setSelected(selectedItem)
        otherProps.setValue(otherProps.name, selectedItem, { shouldValidate: true })
    }, [otherProps.defaultId, options])

    useEffect(() => {
        if(otherProps.defaultId === null){
            setSearchTerm('')
            return
        }
        const selectedItem = options.find(option => option.id == otherProps?.defaultId)
        if (!selectedItem && !showDropdown) {
            setSearchTerm('')
        }
    }, [otherProps.defaultId])

    let borderColor = "";
    if (otherProps.errorMessage) {
        borderColor = "border-red-500";
    } else {
        borderColor = "border-green";
    }

    let height = "h-[43px]  md:h-[43px]"
    let iconSize = 'h-[6px] w-[10px]'
    let fontStyles = 'placeholder:text-size-5 md:placeholder:text-sm placeholder:font-thin'
    if (otherProps.size === "large") {
        height = 'h-[64px]'
        iconSize = 'h-[12.5px] w-[12px]'
        fontStyles = 'placeholder:text-size-6 placeholder:font-thin placeholder:tracking-[3px]'
    } else if (otherProps.grayDropdownIcon) {
        fontStyles = 'font-sharp-sans-semibold text-sm placeholder:text-gray-300'
    }

    const handleSearchTermChange = (e) => {
        if (otherProps.setSearchValue && setValueDuringChange) {
            otherProps.setSearchValue(e.target.value)
        }
        setSearchTerm(e.target.value)
    }

    useEffect(() => {
        //shouldnt execute for edit profile dropdown
        if (otherProps.setSearchValue && !setValueDuringChange) {
            otherProps.setSearchValue(searchTerm)
        }
    }, [searchTerm])

    const handleSelectedChange = (selectedOption) => {
        otherProps.setValue(otherProps.name, selectedOption, { shouldValidate: true })
        setSearchTerm(selectedOption[nameKey])
        setSelected(selectedOption)
        toggleShowDropdown(false)
    }


    let filteredOptions = [...options]
    if (!otherProps.searchDisabled && !otherProps.disableFilter) {
        filteredOptions = options.filter(option => option?.[nameKey]?.includes(searchTerm))
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

    let inputStyle = `h-full w-full rounded-[0.2rem] ${borderColor} ${padding} outline-none ${fontStyles} bg-white border-opacity-80 `
    let iconStyle = `cursor-pointer bg-[white] ${borderColor} h-full flex items-center justify-center`
    if (showDropdownIcon) {
        inputStyle += ` rounded-r-none ${borderColor} border-y border-l`
        iconStyle += ` border-green border-y border-r border-l rounded-r-md px-3  `
    } else if (showDropdownIconWithoutBorder) {
        inputStyle += ` rounded-r-none ${borderColor} border-y border-l`
        iconStyle += ` border-green border-y border-r rounded-r-md pl-3 pr-6  `
    } else if (otherProps.grayDropdownIcon) {
        inputStyle += `rounded-l-md rounded-r-none border-y border-l border-r-none ${borderColor}`
        iconStyle += ' border-green px-3 rounded-l-none -ml-1 border-l-none rounded-r-md border-y border-r'
    }
    else {
        inputStyle += ` border-[1px]`
        iconStyle += `px-3 hidden`
    }

    let width = 'lg:w-[95%]'
    if (otherProps.fullWidth) {
        width = 'w-[100%]'
    }

    const Icon = otherProps.grayDropdownIcon ? require('../../assets/images/Login/GrayDropdown.png') : require("../../assets/images/GreenArrowDown.png")

    // const [cursor, setCursor] = useState(0)
    // const selectRef = useRef(null);

    // const selectedItemRef = selectRef?.current?.querySelector(".active-dropdown-item");
    // if (selectedItemRef) {
    //     selectedItemRef?.scrollIntoView({
    //     top: 20,
    //     behavior: "smooth",
    //     block: "nearest"
    //   });
    // }

    // const handleKeyDown = useCallback((e) => {
    //     const optionsLength = bifurcatedOptions ? ((filteredOptions?.[0]?.options?.length ?? 0 ) + (filteredOptions?.[1]?.options?.length ?? 0)) : filteredOptions?.length 
    //     if(e.key === "ArrowUp" && cursor > 0){
    //         selectRef.current.scrollTop -= 26
    //         setCursor(c => c-1)
    //     }else if(e.key === "ArrowDown" && cursor < optionsLength-1){
    //         selectRef.current.scrollTop += 26
    //         setCursor(c => c+1)
    //     }else if(e.key === "Enter"){
    //         if(!bifurcatedOptions){
    //             handleSelectedChange(filteredOptions[cursor])
    //         }else{
    //             if(cursor <= filteredOptions[0].options.length){
    //                 handleSelectedChange(filteredOptions[0].options[cursor])
    //             }else{
    //                 const selectedIndex = cursor - filteredOptions[0].options.length
    //                 handleSelectedChange(filteredOptions[1].options[selectedIndex])
    //             }
    //         }
    //     }
    // }, [filteredOptions, cursor])

    // useEffect(() => {
    //     setCursor(0)
    // }, [searchTerm])

    const { handleKeyDown, cursor, scrollContainerRef } = useEnableArrowKeys({
        onSelect: handleSelectedChange,
        bifurcatedOptions: bifurcatedOptions,
        options: filteredOptions,
        searchTerm
    })

    const handleClick = () => {
        if(!showDropdown){
            toggleShowDropdown(true)
        }
        if(!clearValueOnClick) return
        if(searchTerm && selected[nameKey]){
            otherProps.setValue(otherProps.name, null, { shouldValidate: true })
            setSearchTerm('')
            setSelected({})
        }
        if(otherProps.setSearchValue){
            otherProps.setSearchValue('')
        }
    }
    let showDropdownData = showDropdown
    if(showDropdownWhenSearch){
        showDropdownData = showDropdown && searchTerm
    }
    return (
        <div ref={dropdownEl} className={`relative h-[fit-content] w-full ${width} border-none shadow-none`}
        >
            <div className='flex flex-col'>
                {label && <Label label={label} textXs={otherProps.textXs} fontColor={otherProps.labelFont} />}
                <div className={`${height} w-full flex items-center justify-center`}>
                    <input
                        className={inputStyle}
                        // onFocus={toggleShowDropdown}
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        placeholder={placeholder}
                        disabled={otherProps.disableInput}
                        onClick={handleClick}
                        type={"text"}
                        onKeyDown={handleKeyDown}
                        autoComplete={'off'}
                    />
                    <div className={iconStyle} onClick={toggleShowDropdown}>
                        <img alt="Dropdown" src={Icon} className={`${iconSize} text-green ${showDropdown ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`} />
                    </div>
                </div>
                <ErrorMessage errorMessage={otherProps.errorMessage} />
            </div>
            <Controller
                name={otherProps.name}
                control={control}
                render={({
                    field: { onChange, onBlur, value, name, ref },
                    formState: { errors }
                }) => (
                    <>{(showDropdownData && filteredOptions.length > 0) &&
                            <ul 
                            ref={scrollContainerRef} 
                            className='absolute top-16 bg-white z-20 px-4 py-3  cursor-pointer shadow-md rounded-md w-full space-y-1 overflow-auto max-h-[20rem]'>
                                {!bifurcatedOptions ? (
                                    filteredOptions.map((option, idx) => <FilterDropdownItem
                                        selectedItem={selected}
                                        key={option.id}
                                        option={option}
                                        nameKey={nameKey}
                                        cursor={cursor}
                                        index={idx}
                                        handleItemSelected={handleSelectedChange}
                                    />)
                                ) : (
                                    filteredOptions.map((item, index) =>
                                        <div key={item.id} className="mb-2">
                                            <h1 className='text-gray-500' >{item.title}</h1>
                                            <div>
                                                {item.options.map((option, idx) => {
                                                    let currentId = idx
                                                    if(index === 1){
                                                        currentId = idx + (filteredOptions?.[0].options?.length ?? 0)
                                                    }
                                                    return (
                                                        <FilterDropdownItem
                                                            selectedItem={selected}
                                                            key={option.id}
                                                            option={option}
                                                            type={item.title}
                                                            cursor={cursor}
                                                            index={currentId}
                                                            nameKey={nameKey}
                                                            handleItemSelected={handleSelectedChange}
                                                        />
                                                    )
                                                }
                                                )}
                                            </div>
                                        </div>
                                    )

                                )}
                            </ul>
                    }
                    </>
                )}
            />
        </div>
    );
}