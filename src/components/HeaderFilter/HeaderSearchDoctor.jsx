import React, { useState, useRef, useEffect, useMemo } from "react";
import FilterDropdownItem from "./../FilterDropdownItem";
// import customAxios from "../../utils/CustomAxios";
// import _debounce from 'lodash/debounce';
import useEnableArrowKeys from "../../hooks/useEnableArrowKeys";
import { useSelector } from "react-redux";

const SearchDoctor = ({ selectedItem, setSelectedItem }) => {
  const [focus, setFocus] = useState(false);
  const searchEl = useRef();
  const { specialities, conditions } = useSelector((state) => state.master);

  // const [items, setItems] = useState([])
  // const dispatch = useDispatch()
  const items = useMemo(() => {
    const filteredSpecialities = specialities.filter((item) =>
      item.title.toLowerCase().includes(selectedItem.title)
    );
    const filteredConditions = conditions.filter((item) =>
      item.title.toLowerCase().includes(selectedItem.title)
    );
    let arr = [];
    if (filteredSpecialities.length > 0) {
      arr.push({
        title: "Specialities",
        id: arr.length,
        options: filteredSpecialities,
      });
    }
    if (filteredConditions.length > 0) {
      arr.push({
        title: "Conditions",
        id: arr.length,
        options: filteredConditions,
      });
    }
    return arr;
  }, [specialities, conditions, selectedItem?.title]);

  // const getData = async () => {
  //   const specialities = await customAxios.post('patient/master/speciality', {
  //     name: selectedItem.title ?? ''
  //   })
  //   const conditions = await customAxios.post('patient/master/condition', {
  //     name: selectedItem.title ?? ''
  //   })
  //   const transformedSpecialities = specialities.data.data?.result.map(el => ({
  //     title: el.medical_speciality_name,
  //     id: el.id,
  //     type: 'Specialities',
  //     seo_url: el.speciality_url
  //   })) ?? []

  //   const transformedConditions = conditions.data.data?.result.map(el => ({
  //     title: el.medical_condition_name,
  //     id: el.id,
  //     type: 'Conditions',
  //     seo_url: el.condition_url
  //   })) ?? []

  //   let arr = []
  //   if (transformedSpecialities.length > 0) {
  //     arr.push({
  //       title: 'Specialities',
  //       id: arr.length,
  //       options: transformedSpecialities
  //     })
  //   }
  //   if (transformedConditions.length > 0) {
  //     arr.push({
  //       title: 'Conditions',
  //       id: arr.length,
  //       options: transformedConditions
  //     })
  //   }
  //   setItems(arr)
  // }
  // const debounceFn = useCallback(_debounce(getData, 1000, {
  //   'leading': true,
  //   'trailing': false
  // }), [selectedItem]);

  // useEffect(() => {
  //   debounceFn()
  // }, [selectedItem])

  const handleItemSelected = (item) => {
    setFocus(false);
    setSelectedItem(item);
  };

  const handleFocus = () => {
    if (focus) return;
    setFocus(true);
  };

  const handleSearchTermChange = (e) => {
    setSelectedItem({ id: null, title: e.target.value, typing: true });
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
    bifurcatedOptions: true,
    options: items,
    searchTerm: selectedItem?.title ?? "",
  });

  const handleClick = () => {
    if (!focus) {
      setFocus(true);
    }
    if (selectedItem.title) {
      setSelectedItem({
        id: null,
        title: "",
        type: "",
        seo_url: "",
        typing: true,
      });
    }
  };

  return (
    <>
      <div
        ref={searchEl}
        className="w-[30%] relative"
        onFocus={(e) => setFocus(true)}
      >
        <div>
          <input
            onFocus={handleFocus}
            value={selectedItem.title}
            onChange={handleSearchTermChange}
            placeholder={"Specialty"}
            type="text"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            disabled={false}
            className="h-[2.5rem] text-size-7 fonr-basis-sans-regular border-r w-full px-2 focus:outline-none active:outline-none bg-white"
          />
        </div>
        {focus && items.length > 0 && (
          <div
            ref={scrollContainerRef}
            className="absolute top-[2.5rem] mt-1 px-6 max-h-60 min-w-[20rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {items.map((item, index) => (
              <div key={item.id} className="mb-2">
                <h1 className="text-gray-500">{item.title}</h1>
                <div>
                  {item.options.map((option, idx) => {
                    let currentId = idx;
                    if (index === 1) {
                      currentId = idx + (items?.[0].options?.length ?? 0);
                    }
                    return (
                      <FilterDropdownItem
                        selectedItem={selectedItem}
                        key={option.id}
                        type={item.title}
                        index={currentId}
                        cursor={cursor}
                        option={option}
                        handleItemSelected={handleItemSelected}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(SearchDoctor);
