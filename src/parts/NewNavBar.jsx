import React, { useState } from "react";
import HeaderDropDown from "../components/HeaderDropDown";
import MobileMenu from "../components/MobileMenu";

function NewNavBar(props) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className="px-6 md:px-10 lg:px-16 xl:px-20 text-primary  bg-[#DCE9FD]  flex justify-between items-center w-full py-1 md:py-5">
      <a href="#" className="headerImage" />
      <div className="gap-4 lg:flex flex-row items-baseline justify-between  hidden  ">
        <div
          className="border-b border-primary border-dotted 
        hover:border-solid font-sharp-sans-semibold text-sm"
        >
          Browse
        </div>
        <div>|</div>
        <div
          className="border-b border-primary border-dotted 
        hover:border-solid font-sharp-sans-semibold text-sm"
        >
          Help
        </div>
        <div>|</div>
        <div
          className="border-b border-primary border-dotted 
        hover:border-solid font-sharp-sans-semibold text-sm"
        >
          List your practice on Zocdoc
        </div>
        <div>|</div>
        <div
          className="border-b border-primary border-dotted 
        hover:border-solid font-sharp-sans-semibold text-sm"
        >
          <HeaderDropDown />
        </div>
      </div>
      <MobileMenu 
        isOpen={isOpen}
        closeModal={closeModal}
        openModal={openModal}
      />
    </div>
  );
}

export default NewNavBar;
