import React, { useState } from "react";
import Accordion from "../components/Accordion";
import { AccordionDummy } from "../utils/DummyData";
import useWindowWidth from '../hooks/useWindowWidth'

const Column2DArr = () => {
  const noOfItemsInCol = 5
  let start = 0
  let end = noOfItemsInCol
  const arr = []
  const length = AccordionDummy.length
  while(end <= length){
    arr.push([start, end])
    start = end
    end = start + noOfItemsInCol
  }
  const remItems = length - (end-noOfItemsInCol)
  if(remItems > 0){
    arr.push([end, end+remItems+1])
  }
  return arr
}

function FindDoctors() {
  const { isSmallScreen } = useWindowWidth()
  const [showAllFAQ, setShowAllFAQ] = useState(isSmallScreen ? false : true)
  const grid = Column2DArr()

  const toggleFAQDisplay = () => {
    setShowAllFAQ(s => !s)
  }

  return (
    <>
      <div className="px-6 md:px-10 lg:px-16 xl:px-20 sm:pl-10 lg:pl-16 xl:pl-20 sm:pr-10 lg:pr-16 xl:pr-20 py-20 bg-[#f7f8f9]">
        <h1 className="text-2xl font-sharp-sans-bold">
          Find doctors and dentists by city
        </h1>
        <div className=" pt-10 hidden md:grid md:gap-2 md:grid-cols-4 bg-[#f7f8f9]">
          {grid.map(el => 
            <div className="space-y-2">
            { AccordionDummy.slice(el[0],el[1]).map((item, index) => {
              const { title, options } = item;
              return (
                <div key={index}>
                  <Accordion title={title} options={options} />
                </div>
              );
            })}
            </div>
            )}
        </div>
        <div className="pt-10 grid md:hidden bg-[#f7f8f9]">
            { AccordionDummy.map((item, index) => {
              if(!showAllFAQ && index > 4) return null
              const { title, options } = item;
              return (
                <div key={index}>
                  <Accordion title={title} options={options} />
                </div>
              );
            })}
        </div>
        <button className="md:hidden border border-primary p-3 rounded-sm w-full mt-4" onClick={toggleFAQDisplay}>{showAllFAQ ? "Show Less" : "Show More"}</button>
      </div>
    </>
  );
}

export default FindDoctors;