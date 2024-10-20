import React from "react";
import { useState } from "react";
import Checkbox from "../components/inputs/Checkbox";
import { setSelectedFilters } from "../redux/doctor/doctor.reducer";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useQuery from '../hooks/useQuery';
import { encrypt } from '../utils/crypto'
import moment from 'moment'

export const mapping = {
  "appointment_type": "filter_appointment_type",
  "insurance_company_name": "filter_insurance",
  "language_title": "filter_language",
  "medical_condition_name": "filter_conditions",
  "medical_speciality_name": 'filter_specialty'
}

function SearchFilter(props) {
  const { list, showLimit, title } = props;
  const key = Object.keys(list[0] ?? {})[1];
  const location = useLocation()
  const selected = useSelector((state) => state.doctor.selectedFilters[key] ?? []);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const query = useQuery()
  const navigate = useNavigate()

  const handleShow = () => {
    setShow(!show);
  };

  const isFilterTypeInUrl = (query) => {
    const queryParams = location.search.split('?')
    return queryParams.find(el => el.includes(query)) ? true : false
  }

  const getNewSearhUrl = (filterType, newList, key) => {
    const urlArr = []
    if(newList.length === 0){
      location.search.split('&').forEach(el => {
        if(el.startsWith(filterType)){
          return
        }
        urlArr.push(el)
      })
      return urlArr
  }
  
    if(isFilterTypeInUrl(filterType)){
      location.search.split('&').forEach(el => {
        if(el.startsWith(filterType)){
          urlArr.push(`${mapping[key]}=${encrypt(newList.join(','))}`)
          return
        }
        urlArr.push(el)
      }) 
    }else{
      location.search.split('&').forEach(el => {
        urlArr.push(el)
      }) 
      urlArr.push(`${mapping[key]}=${encrypt(newList.join(','))}`)
    }
    return urlArr
  }

  const handleChange = async (e) => {
    let selectedValue = parseInt(e.target.value);
    let selectedIsChecked = e.target.checked;
    let newList = [];

    if (!selected.includes(selectedValue) && selectedIsChecked) {
      newList = [...selected, selectedValue];
    } else if (selected.includes(selectedValue) && !selectedIsChecked) {
      let newArray = selected.filter((el) => el != selectedValue);
      newList = newArray;
    } else {
      newList = selected;
    }

    const filterArr = newList.filter(el => Number.isInteger(el))

    dispatch(setSelectedFilters({ selected: filterArr, filterName: key }));

    let url = location.pathname
    let urlArr = []
    if(mapping[key] === 'filter_specialty'){
      urlArr = getNewSearhUrl('filter_specialty', newList, key)
    }else if(mapping[key] === 'filter_conditions'){
      urlArr = getNewSearhUrl('filter_conditions', newList, key)
    }else if(mapping[key] === 'filter_appointment_type'){
      urlArr = getNewSearhUrl('filter_appointment_type', newList, key)
    }else if(mapping[key] === 'filter_insurance'){
      urlArr = getNewSearhUrl('filter_insurance', newList, key)
    }else if(mapping[key] === 'filter_language'){
      urlArr = getNewSearhUrl('filter_language', newList, key)
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
  };

  const listToMap = useCallback(() => {
    return list.filter((el, index) => {
      if (search.length > 0) {
        if (el[key].toLowerCase().includes(search.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      } else {
        if(!showLimit){
          return true
        }
        if (!show) {
          return index < showLimit;
        } else {
          return true;
        }
      }
    });
  }, [list, search, show]);

  return (
    <div className={`w-full pt-4 sm:pr-4 md:pr-1 `} key={show}>
      <p className="mb-2 font-basic-sans-regular  text-gray-900 font-black text-size-6 tracking-[2px]">
        {title}
      </p>
      {list.length > 5 ? (
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="mb-2 border-green border-opacity-60 rounded-md  focus:outline-none border-solid border p-1 "
        />
      ) : (
        ""
      )}
      <div className={`${listToMap().length > 5 && 'filter-scrollbar overflow-y-scroll overflow-x-hidden'} h-full max-h-36`} key={search}>
        {listToMap().length !== 0
          ? listToMap().map((el) => {
              return (
                <div
                  className="flex flex-row items-start justify-start mb-1 hover:cursor-pointer"
                  key={el.id}
                >
                  <Checkbox
                    id={el.id}
                    handleChange={handleChange}
                    value={el.id}
                    borderGrey
                    isChecked={selected.includes(el.id)}
                  />
                  <label
                    className="tracking-widest text-gray-800 ml-2 font-basic-sans-regular font-thin text-size-6 md:text-[1rem] hover:cursor-pointer"
                    htmlFor={title + el.id}
                    onClick={() => handleChange({ target: {
                      checked: !selected.includes(el.id),
                      value: el.id
                    }})}
                  >
                    {el[key]}
                  </label>
                </div>
              );
            })
          : "No Data..."}
        {showLimit < list.length && list.length <= 5 ? (
          <button
            className=" text-size-6 tracking-[1px] md:tracking-normal md:text-[1rem] underline text-[#eba134]"
            onClick={handleShow}
          >
            {show ? "View Less" : "View All"}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SearchFilter;