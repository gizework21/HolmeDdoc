import React, { useState, useRef, useEffect, useCallback } from "react";
import FilterDropdownItem from "./../FilterDropdownItem";
import customAxios from "../../utils/CustomAxios";
import _debounce from 'lodash/debounce';
import useEnableArrowKeys from '../../hooks/useEnableArrowKeys';

const HeaderSearchLocation = ({ selectedItem, setSelectedItem }) => {
  const [focus, setFocus] = useState(false);
  const searchEl = useRef();

  const [items, setItems] = useState([])


  const getLocations = async(searchTerm) => {
    if(!selectedItem.title) return
    const response = await customAxios.post('/patient/master/areas', {
        name: searchTerm    
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

  useEffect(() => {
    if(!selectedItem.title) return
    debounceFn(selectedItem.title)
  }, [selectedItem])

  const showDropdown = !!selectedItem.title && items.length > 0

  const handleItemSelected = (item) => {
    setSelectedItem(item);
    setFocus(false);
  };

  const handleFocus = () => {
    if (focus) return;
    setFocus(true);
  };


  const handleSearchTermChange = (e) => {
    debounceFn(e.target.value)
    setSelectedItem({ id: null, title: e.target.value });
  };


  const hideSearchOptions = (e) => {
    if (!searchEl.current.contains(e.target)) {
      setFocus(false);
    }
  };


  useEffect(() => {
    window.addEventListener("click", hideSearchOptions, true);

    return () => {
      window.removeEventListener("click", hideSearchOptions, true);
    };
  }, []);

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
      <div ref={searchEl} className="w-[30%] relative" onFocus={(e) => setFocus(true)}>
        <div>
          <input
            onFocus={handleFocus}
            value={selectedItem.title}
            onChange={handleSearchTermChange}
            type="text"
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            placeholder="Location"
            disabled={false}
            className="h-[2.5rem] text-size-7 w-full border-r px-2 focus:outline-none active:outline-none bg-white"
          />
        </div>
        {(focus && showDropdown) && (
          <ul ref={scrollContainerRef} className="absolute top-[2.5rem] mt-1 px-6 max-h-60 min-w-[20rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((option, idx) => (
                <FilterDropdownItem
                  selectedItem={selectedItem}
                  key={option.id}
                  cursor={cursor}
                  index={idx}
                  option={option}
                  handleItemSelected={handleItemSelected}
                />
              ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default HeaderSearchLocation;
