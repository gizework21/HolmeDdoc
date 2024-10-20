import React, { useRef, useState, useEffect } from "react";
import UserIcon from "../assets/images/home/User.png";
import { useNavigate } from "react-router-dom";
import { DoctorLogin, Login, Register } from "../data/urls";
import Image from "./Image";

function HeaderDropDown(props) {
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const ref = useRef();

  const hideOptions = (e) => {
    if (!ref.current.contains(e.target)) {
      setState(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", hideOptions, true);

    return () => {
      window.removeEventListener("click", hideOptions, true);
    };
  }, []);

  return (
    <div className="w-full z-40" ref={ref}>
      <div className="mx-auto w-full max-w-md">
        <div>
          <div className="relative z-20">
            <button
              onClick={() => setState((v) => !v)}
              className="flex w-full justify-between items-center 
              px-0 pt-0  text-left text-sm text-black focus:outline-none font-semibold z-50"
            >
              <span className="font-basic-sans-regular font-semibold text-xs lg:text-navbarLg  mr-2 tracking-[.15rem] cursor-pointer">
                LOGIN/SIGNUP
              </span>
              <div>
                <Image src={'/home/User.png'} className="h-7" staticUrl={UserIcon} alt="user" />
              </div>
            </button>
            {state && (
              <div
                className=" text-sm text-primary bg-white absolute -bottom-24 right-0"
                as="div"
              >
                <div className="p-4 flex flex-col whitespace-nowrap">
                  <div className="flex flex-row items-center justify-between pb-2">
                    <div className="pr-2 font-sharp-sans-semibold">
                      Patients
                    </div>
                    <button
                      className="mr-2 border-b border-primary border-dotted 
        hover:border-solid font-sharp-sans-medium text-sm"
                      onClick={() => navigate(Login)}
                    >
                      Log in
                    </button>
                    <button
                      className="border-b border-primary border-dotted 
        hover:border-solid font-sharp-sans-medium text-sm"
                      onClick={() => navigate(Register)}
                    >
                      Sign up
                    </button>
                  </div>
                  <hr className="" />
                  <div className="flex flex-row items-center justify-start pt-2">
                    <div className="pr-2 font-sharp-sans-semibold">Doctors</div>
                    <button
                      className="border-b border-primary border-dotted 
        hover:border-solid font-sharp-sans-medium text-sm"
                      onClick={() => navigate(DoctorLogin)}
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
