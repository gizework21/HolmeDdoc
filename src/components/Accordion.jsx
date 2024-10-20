import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import BlackDropdown from "../assets/images/home/BlackDropdown.png";
import Image from "./Image";

export default function Accordion({ title, options }) {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  return (
    // <div className="w-full">
    <div className="w-full h-full">
      {/* <div className="mx-auto w-full  max-w-5xl bg-inherit p-2 border-b "> */}
      <div className={`${toggle ? "bg-inherit p-2" : "bg-inherit p-2 "}`}>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full  py-2 text-left text-sm text-slate-700 focus:outline-none lg:font-semibold rounded-none">
                {/* <Disclosure.Button className="flex tray-gray items-center justify-start md:justify-start   py-2 text-left text-sm text-slate-700 focus:outline-none lg:font-semibold rounded-none"> */}
                <div className="flex flex-col w-full border-b border-gray-400">
                  <div className="flex w-full pb-6 md:pb-8 items-center justify-between md:h-[4rem]">
                    <span className="text-size-6 md:text-base xl:text-xl md:tracking-[0.1rem] xl:tracking-[0.2rem] mr-2 ">
                      {title}
                    </span>
                    <Image
                      src={"/home/BlackDropdown.png"}
                      staticUrl={BlackDropdown}
                      alt="drop"
                      onClick={() => setToggle(!toggle)}
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-4 text-primary`}
                    />
                  </div>
                  {open && (
                    <Disclosure.Panel className="px-4 pb-3 md:py-3 text-size-5 md:text-lg text-gray rounded-lg">
                      {options.map((option) => (
                        <h1
                          className="hover:underline mt-1 text-grey tracking-[0.1rem]"
                          onClick={() => navigate(`/${title}`)}
                        >
                          {option.title}
                        </h1>
                      ))}
                    </Disclosure.Panel>
                  )}
                </div>
              </Disclosure.Button>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
