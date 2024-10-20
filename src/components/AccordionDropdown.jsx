import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlackDropdown from "../assets/images/home/BlackDropdown.png";
import RollingLoader from "../assets/images/Login/RollingLoader.svg";
import Image from "./Image";

export default function AccordionDropdown({ title, options, id, handleItemClicked, selectedId, isFetched }) {
  // const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const selected = id === selectedId

  const handleClick = () => {
    if(selected){
      handleItemClicked(null)
      return
    }
    handleItemClicked(id)
  }

  return (
    <div className="relative w-full text-left text-sm text-slate-700 focus:outline-none font-semibold rounded-none px-2 py-4">
      <div onClick={handleClick} className="flex w-full pb-6 md:pb-8 border-b border-gray-400 items-center justify-between md:h-[4rem]">
        <span className="text-size-6 cursor-pointer md:text-base xl:text-xl tracking-[0.1rem] xl:tracking-[0.2rem] mr-2">
          {title}
        </span>
        <Image
          src={'/home/BlackDropdown.png'}
          staticUrl={BlackDropdown}
          alt="drop"
          className={`${selected  ? "rotate-180 transform" : ""} h-2.5 sm:h-4 text-primary cursor-pointer`}
        />
      </div>
      {selected && (
        <div className="absolute z-10 bg-white w-full top-[50px] md:top-[64px] px-4 py-3 text-size-5 md:text-lg text-gray rounded-lg">
          {isFetched && options.map((option, idx) => (
            <h1
              key={idx}
              className="hover:underline mt-1 text-grey tracking-[0.1rem] cursor-pointer"
              onClick={() => navigate(`/doctorsearch?specialty=${option.seo_url}`)}
            >
              {option.title}
            </h1>
          ))}
          {
            (isFetched && options.length === 0) && <h1 className="text-center">No Specialities Available</h1>
          }
          {!isFetched && 
            <div className="w-full flex justify-center">
              <Image
                src={'/login/RollingLoader.svg'}
                staticUrl={RollingLoader} 
                alt={"loader"}
                className="h-[5rem]"
              />
            </div>
          }
        </div>
      )}
    </div>
  );
}