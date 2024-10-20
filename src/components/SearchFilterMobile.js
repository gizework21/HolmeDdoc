import React from "react";
import { useState } from "react";
import Checkbox from "../components/inputs/Checkbox";

function SearchFilterMobile(props) {
  const { list, showLimit, title, selectedFilter, handleFilterChange } = props;
  const key = Object.keys(list[0])[1]
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const handleChange = async (e) => {
    let selectedValue = parseInt(e.target.value);
    let selectedIsChecked = e.target.checked;
    let newList = [];

    if (!selectedFilter.includes(selectedValue) && selectedIsChecked) {
      newList = [...selectedFilter, selectedValue];
    } else if (selectedFilter.includes(selectedValue) && !selectedIsChecked) {
      let newArray = selectedFilter.filter((el) => el != selectedValue);
      newList = newArray;
    } else {
      newList = selectedFilter;
    }
    handleFilterChange(key, newList)
  };

  return (
    <div className="w-full pt-4 sm:pr-4 md:pr-12" key={show}>
      <p className="mb-2 font-basic-sans-regular  text-gray-900 font-black text-size-6 tracking-[2px]">{title}</p>
      {list
        .map((el) => {
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
                isChecked={selectedFilter.includes(el.id)}
              />
              <label
                className="tracking-widest text-gray-800 ml-2 font-basic-sans-regular font-thin text-size-6 md:text-[1rem] hover:cursor-pointer"
                htmlFor={title + el.id}
                onClick={() => handleChange({ target: {
                  checked: !selectedFilter.includes(el.id),
                  value: el.id
                }})}
              >
                {el[key]}
              </label>
            </div>
          );
        })
        .filter((el, key) => {
          if (!show) {
            return key < showLimit;
          }
          return true;
        })}
      {showLimit < list.length ? (
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
  );
}

export default SearchFilterMobile;
