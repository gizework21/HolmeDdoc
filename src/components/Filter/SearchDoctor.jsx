import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import FilterInput from './FilterInput'
import FilterDropdownItem from '../FilterDropdownItem'
// import customAxios from '../../utils/CustomAxios'
// import _debounce from 'lodash/debounce';
import useEnableArrowKeys from '../../hooks/useEnableArrowKeys';
import { useSelector } from 'react-redux';

const SearchDoctor = ({ isSmallScreen, selectedItem, setSelectedItem }) => {
    const [focus, setFocus] = useState(false)
    const searchEl = useRef()
    // const [items, setItems] = useState([])
    const { specialities, conditions } = useSelector(state => state.master)

    const items = useMemo(() => {
        const filteredSpecialities = specialities.filter(item => item.title.toLowerCase().includes(selectedItem.title))
        const filteredConditions = conditions.filter(item => item.title.toLowerCase().includes(selectedItem.title))
        let arr = []
        if(filteredSpecialities.length > 0){
                arr.push({
                    title: 'Specialities',
                    id : arr.length,
                    options: filteredSpecialities
                })
        }
        if(filteredConditions.length > 0){
                arr.push({
                    title: 'Conditions',
                    id : arr.length,
                    options: filteredConditions
                })
        }
        return arr
    }, [specialities, conditions, selectedItem?.title])

    useEffect(() => {
        //on blur if no item is selected then reset input text
        if(!focus && selectedItem.id === null){
            setSelectedItem({ id: null, title: '', type: '', seo_url: '' })
        }
    },[focus])
    
    // const getData = async() => {
    //     const specialities = await customAxios.post('patient/master/speciality', {
    //         name: selectedItem.title
    //     })
    //     const conditions = await customAxios.post('patient/master/condition', {
    //         name: selectedItem.title
    //     })
    //     const transformedSpecialities = specialities.data.data?.result.map(el => ({
    //         title: el.medical_speciality_name,
    //         id: el.id,
    //         type: 'Specialities',
    //         seo_url: el.speciality_url
    //     })) ?? []
    //     const transformedConditions = conditions.data.data?.result.map(el => ({
    //         title: el.medical_condition_name,
    //         id: el.id,
    //         type: 'Conditions',
    //         seo_url: el.condition_url
    //     })) ?? []
    //     let arr = []
    //     if(transformedSpecialities.length > 0){
    //         arr.push({
    //             title: 'Specialities',
    //             id : arr.length,
    //             options: transformedSpecialities
    //         })
    //     }
    //     if(transformedConditions.length > 0){
    //         arr.push({
    //             title: 'Conditions',
    //             id : arr.length,
    //             options: transformedConditions
    //         })
    //     }
    //     setItems(arr)
    // }

    // const debounceFn = useCallback(_debounce(getData, 1000, {
    //     'leading': true,
    //     'trailing': false
    // }), [selectedItem.title, getData]);

    // useEffect(() => {
    //     debounceFn()
    // }, [selectedItem])


    const handleItemSelected = (item) => {
        // console.log(item)
        setSelectedItem(item)
        setFocus(false)
        removeShowFullScreen()
    }

    const handleFocus = () => {
        setFocus(f => !f)
    }

    const handleSearchTermChange = (e) => {
        setSelectedItem({ id: null, title: e.target.value.toLowerCase(), type: '', seo_url: '' })
    }


    const hideSearchOptions = (e) => {
        if (!searchEl.current.contains(e.target)) {
            setFocus(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', hideSearchOptions, true)

        return () => {
            window.removeEventListener('click', hideSearchOptions, true)
        }
    }, [])

    const removeShowFullScreen = () => {
        setFocus(false)
    }

    const { handleKeyDown, cursor, scrollContainerRef } = useEnableArrowKeys({
        onSelect: handleItemSelected,
        bifurcatedOptions: true,
        options: items,
        searchTerm: selectedItem.title
    })

    const handleClick = () => {
        if(!focus){
            setFocus(true)
        }
        if(selectedItem.title){
            setSelectedItem({ id: null, title: '', type: '', seo_url: '' })
        }
    }

    return (
        <>          
                <div ref={searchEl} className="w-full relative" onFocus={(e) => setFocus(true)}>
                    <FilterInput 
                        // toggleFocus={() => {}}
                        title={'Specialty/Condition'}
                        toggleFocus={handleFocus}
                        handleSearchTermChange={handleSearchTermChange}
                        placeholder={"Procedure, doctor..."}
                        value={selectedItem.title}
                        handleClick={handleClick}
                        focus={focus}
                        handleKeyDown={handleKeyDown}
                        showIcon
                    />
                    {(focus && items.length > 0) &&
                        <ul ref={scrollContainerRef} className="absolute mt-1 px-6 max-h-60 z-10 w-full md:min-w-[30rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {
                                    items.map((item, index) =>
                                        <div key={item.id} className="mb-2">
                                            <h1 className='text-gray-500' >{item.title}</h1>
                                            <div>
                                                {item.options.map((option, idx) => {
                                                    let currentId = idx
                                                    if(index === 1){
                                                        currentId = idx + (items?.[0].options?.length ?? 0)
                                                    }
                                                    return <FilterDropdownItem 
                                                        selectedItem={selectedItem}
                                                        key={option.id} 
                                                        cursor={cursor}
                                                        index={currentId}
                                                        option={option} 
                                                        type={item.title}
                                                        handleItemSelected={handleItemSelected} 
                                                    />
                                                }
                                                )}
                                            </div>
                                        </div>
                                    )
                                }
                        </ul>
                    }
                </div>
            
        </>
    )
}

export default SearchDoctor