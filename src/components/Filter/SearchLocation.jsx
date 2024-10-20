import React, { useState, useRef, useEffect, useCallback } from 'react'
import FilterInput from './FilterInput'
import FilterDropdownItem from '../FilterDropdownItem'
import customAxios from '../../utils/CustomAxios'
import _debounce from 'lodash/debounce';
import useEnableArrowKeys from '../../hooks/useEnableArrowKeys';

const SearchLocation = ({ selectedItem, setSelectedItem, setLocationStr }) => {
    const [focus, setFocus] = useState(false)
    const searchEl = useRef()
    const [items, setItems] = useState([])

    const getLocations = async (searchTerm) => {
        if(!searchTerm) return
        const response = await customAxios.post('/patient/master/areas', {
            name: searchTerm,
        })
        setItems(response.data.data?.result?.map(el => ({
            id: el.city_id + "-" + el.state_id + "-" + el.zip_code_id,
            title: el.city
        })) ?? [])
    }
    const debounceFn = _debounce((searchTerm) => getLocations(searchTerm), 1000, {
        'leading': true,
        'trailing': false
    })

    // useEffect(() => {
    //     debounceFn()
    // },[selectedItem])

    useEffect(() => {
        //on blur if no item is selected then reset input text
        if(!focus && selectedItem.id === null){
            setSelectedItem({ id: null, title: '' })
        }
    },[focus])

    const showDropdown = !!selectedItem.title && items.length > 0

    const handleItemSelected = (item) => {
        // console.log(item)
        setSelectedItem(item)
        setFocus(false)
    }
    const handleFocus = () => {
        // if (focus) return
        setFocus(f => !f)
    }

    // const toggleFocus = () => {}


    const handleSearchTermChange = (e) => {
        debounceFn(e.target.value)
        setSelectedItem({ id: null, title: e.target.value })
        setLocationStr(e.target.value)
    }

    // const clearSearchTerm = () => {
    //     setSelectedItem({ id: null, title: '' })
    // }

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

    const { handleKeyDown, cursor, scrollContainerRef } = useEnableArrowKeys({
        onSelect: handleItemSelected,
        bifurcatedOptions: false,
        options: items,
        searchTerm: selectedItem.title
    })

    const handleClick = () => {
        if(selectedItem.title){
            setSelectedItem({ id: null, title: '' })
        }
    }


    return (
        <>
            {/* {fullScreen && isSmallScreen && ReactDOM.createPortal(<div ref={searchEl} className="fixed top-0 bg-white z-10 h-full w-full" onFocus={(e) => setFocus(true)}>
                <div className="flex border py-2 relative w-full cursor-default overflow-hidden  bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <MapPinIcon
                            className="h-5 w-5 text-primary"
                            aria-hidden="true"
                        />
                    </div>
                    <input value={selectedItem.title} onChange={handleSearchTermChange} type="text" className="w-full border-none outline-none py-2 pr-3 pl-10 text-sm leading-5 focus:ring-0 text-primary" placeholder={"My current location"} />
                    {selectedItem.title && <button onClick={clearSearchTerm}><XMarkIcon className='h-5' /></button>}
                    <button className='px-2 text-sm text-primary' onClick={removeShowFullScreen}>Cancel</button>
                </div>
                {focus && filteredItems.length > 0 &&
                    <div className="absolute mt-1 px-6 h-full w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        <div>
                            {
                                filteredItems.map(option =>
                                    <FilterDropdownItem 
                                        selectedId={selectedItem.id} 
                                        key={option.id} 
                                        option={option} 
                                        handleItemSelected={handleItemSelected} 
                                    />
                                )
                            }
                        </div>
                    </div>
                }
            </div>, document.getElementById('portal'))} */}
            {/* {!fullScreen && */}
                <div ref={searchEl} className="w-full relative" onFocus={(e) => setFocus(true)}>
                    <FilterInput 
                        // toggleFocus={()=>{}}
                        title={"Location"}
                        toggleFocus={handleFocus}
                        handleSearchTermChange={handleSearchTermChange}
                        placeholder={"State or Zip code"}
                        value={selectedItem.title}
                        handleClick={handleClick}
                        focus={selectedItem.title && focus}
                        handleKeyDown={handleKeyDown}
                        showIcon={false}
                    />
                    {(focus && showDropdown)  &&
                        <ul                             
                        ref={scrollContainerRef} 
                        className="absolute mt-1 px-6 max-h-60 z-10 w-full md:min-w-[30rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg  focus:outline-none sm:text-sm">
                                {
                                    items.map((option, idx) =>
                                        <FilterDropdownItem 
                                            selectedItem={selectedItem}
                                            key={option.id}
                                            cursor={cursor} 
                                            idNotInteger={true}
                                            index={idx}
                                            option={option} 
                                            handleItemSelected={handleItemSelected} 
                                        />
                                    )
                                }
                        </ul>
                    }
                </div>
        </>
    )
}

export default SearchLocation


















