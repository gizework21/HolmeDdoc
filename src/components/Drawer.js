import React from "react";
import { BiArrowBack } from "react-icons/bi";
import useWindowWidth from "../hooks/useWindowWidth";

export default function Drawer({ children, isOpen, setIsOpen,isSmallScreen }) {
  
  return (
    <main
      className={
        " fixed overflow-clip z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out translate-x-0" +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 -translate-x-full  ")
      }
    >
      <section
        className={
          " w-screen max-w-[16rem] left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " -translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-[16rem] pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <header className="p-4 pb-0 font-bold text-lg">
            <div className="text-lg font-sharp-sans-bold  flex flex-row items-baseline justify-between">
              <p className=""> Filters</p>
              <BiArrowBack
                color="#52C3BF"
                className="hover:cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              ></BiArrowBack>
            </div>
          </header>
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
