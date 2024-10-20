import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import useQuery from '../hooks/useQuery';
import { setSelectedMobileFilters } from '../redux/doctor/doctor.reducer';
import { toggleFilterDrawer } from '../redux/sidebar';
import { encrypt } from '../utils/crypto';
import GreenButton from './GreenButton';
import Image from './Image';
import { mapping } from './SearchFilter';
import SearchFilterMobile from "./SearchFilterMobile";

const MobileSearchFilterDrawer = ({ filterOptions }) => {
    const isOpen = useSelector(state => state.sidebar.showFilterDrawer)
    const dispatch = useDispatch()
    const selected = useSelector(state => state.doctor.selectedFilters ?? {})
    const [selectedFilters, setSelectedFilters] = useState(selected ? selected : {})
    const query = useQuery()
    const navigate = useNavigate()
    const location = useLocation()

    const isFilterTypeInUrl = (query) => {
        const queryParams = location.search.split('?')
        return queryParams.find(el => el.includes(query)) ? true : false
      }
    
      const getNewSearhUrl = (filterType, newList, key) => {
        const urlArr = []
        if(newList.length === 0){
            // location.search.split('&').forEach(el => {
            //   if(el.startsWith(filterType)){
            //     return
            //   }
            // })
            return urlArr
        }
        if(isFilterTypeInUrl(filterType)){
          location.search.split('&').forEach(el => {
            if(el.startsWith(filterType)){
              urlArr.push(`${mapping[key]}=${encrypt(newList.join(','))}`)
              return
            }
          }) 
        }else{
          urlArr.push(`${mapping[key]}=${encrypt(newList.join(','))}`)
        }
        return urlArr
      }
    
    useEffect(() => {
        setSelectedFilters(selected)
    },[selected])

    const applyFilters = () => {
        let url = location.pathname
        let urlArr = [location.search.split('&')[0]]
        for(let x in selectedFilters){
            if(mapping[x] === 'filter_specialty'){
                urlArr = [...urlArr, ...getNewSearhUrl('filter_specialty', selectedFilters[x], x)]
            }else if(mapping[x] === 'filter_conditions'){
                urlArr = [...urlArr, ...getNewSearhUrl('filter_conditions', selectedFilters[x], x)]
            }else if(mapping[x] === 'filter_appointment_type'){
                urlArr = [...urlArr, ...getNewSearhUrl('filter_appointment_type', selectedFilters[x], x)]
            }else if(mapping[x] === 'filter_insurance'){
                urlArr = [...urlArr, ...getNewSearhUrl('filter_insurance', selectedFilters[x], x)]
            }else if(mapping[x] === 'filter_language'){
                urlArr = [...urlArr, ...getNewSearhUrl('filter_language', selectedFilters[x], x)]
            }
        } 
        //following when user changes url manually
        if(urlArr[0] === ''){
        //no selected date
            urlArr[0] = `?selected_date=${moment(new Date()).format("YYYY-MM-DD")}`
        }else if(urlArr.length > 0 && !urlArr[0].startsWith('?selected_date')){
        if(urlArr[0].startsWith('?')){
          //http://localhost:3000/doctorsearch?filter_language=U2FsdGVkX18BYcdfRBCBbHwBSE58p896EDhdEPRAqMQ%3D
          urlArr[0] = urlArr[0].slice(1, urlArr[0].length)
        }
            urlArr = [ `?selected_date=${moment(new Date()).format("YYYY-MM-DD")}` ,...urlArr]
        }
        navigate(url + urlArr.join('&'))
        dispatch(setSelectedMobileFilters(selectedFilters))
        dispatch(toggleFilterDrawer())
    }

    const cancelFilters = () => {
        setSelectedFilters(selected)
        dispatch(toggleFilterDrawer())
    }

    const handleFilterChange = (key, values) => {
        setSelectedFilters(f => {
            return {
                ...f,
                [key] : values
            }
        })
    }
    
    return (
        <>
            {
                isOpen && ReactDOM.createPortal(
                    <div
                        className={`block md:hidden fixed min-h-[100vh] w-[100vw]  inset-0 z-40 bg-white ease-in-out transition-all duration-300`}
                    >
                        <div className="relative h-full overflow-y-scroll scrollbar-hide">
                            <button
                                onClick={cancelFilters}
                                className="absolute right-5 top-5 bg-gray-100 h-11 w-11 flex items-center justify-center rounded-full"
                            >
                                <Image
                                    src={'/icons/Cross.png'}
                                    staticUrl={require("../assets/images/icons/Cross.png")}
                                    className="h-4"
                                    alt="cross"
                                />
                            </button>
                            <div className="absolute top-20 pb-10 w-full">
                                <div className="px-5 w-full font-basic-sans-regular">
                                    <h1 className='text-size-9 border-b pb-4 border-gray-400 font-gray-800 tracking-[2px] font-semibold'>Filters</h1>
                                    <div className="mt-0 md:hidden block">
                                        {
                                            filterOptions.map(item => {
                                                const key = Object.keys(item.value[0])[1]
                                                return (
                                                    <SearchFilterMobile
                                                        key={item.title}
                                                        list={item.value}
                                                        showLimit={3}
                                                        title={item.title}
                                                        selectedFilter={selectedFilters[key] ?? []}
                                                        handleFilterChange={handleFilterChange}
                                                    />
                                                )
                                            }
                                            )
                                        }
                                    </div>
                                    <div className='flex items-center justify-center space-x-3 my-8'>
                                        <GreenButton outline additionalStyles={"w-full py-0 h-[2.5rem]"} handleClick={cancelFilters}>Cancel</GreenButton>
                                        <GreenButton additionalStyles={"w-full py-0 h-[2.5rem]"} handleClick={applyFilters}>Apply</GreenButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>,
                    document.getElementById('portal')
                )
            }
        </>
    )
}

export default MobileSearchFilterDrawer