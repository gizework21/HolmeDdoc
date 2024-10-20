import React, { useState } from "react";
import Logo from "../assets/images/home/Logo.png";
import HeaderFilter from "../components/HeaderFilter";
import { useNavigate } from "react-router-dom"
import MobileMenu from "../components/MobileMenu"
import { Home } from "../data/urls";
import NavbarAuthOption from "../components/NavbarAuthOption";
import { useRef } from "react";
import { useEffect } from "react";
import Image from "../components/Image";

function NavbarWithFilter(props) {
  let [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  function closeModal() {
    setIsOpen(false);
  }



  function openModal() {
    setIsOpen(true);
  }



  return (
    <div
      className="px-6 py-1 md:py-3 md:px-2 lg:px-2 xl:px-8 text-slate-700  lg:py-1
      grid grid-col-12 bg-white  drop-shadow-md lg:h-[8.5rem]"
    >
      <div className="hidden md:flex flex-row justify-between items-center ">
        <Image
          src={'/icons/Logo.png'}
          staticUrl={Logo}
          alt=""
          className="bg-transparent cursor-pointer w-[8rem]"
          onClick={() => navigate(Home)}
        />
        <HeaderFilter />
        <NavbarAuthOption />
      </div>
      <MobileMenu 
        isOpen={isOpen}
        closeModal={closeModal}
        openModal={openModal}
      />
    </div>
  );
}

export default NavbarWithFilter;
