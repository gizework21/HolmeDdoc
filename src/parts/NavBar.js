import React, { useState } from "react";
import logo from "../assets/images/logo.svg";
import { HiMenu } from "react-icons/hi";
import { ImCross } from "react-icons/im";

function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    // console.log(showMenu);
    setShowMenu(!showMenu);
  };
  return (
    <>
      <div className="bg-[#D6E5F3]  flex justify-between items-center w-full py-5 ">
        <img src={logo} alt="logo" className="ml-20 cursor-pointer " />
        <div className="  hidden lg:block    ">
          <ul className="flex justify-center ">
            <div className="border-r-[1px] border-primary m-1">
              <li className="border-b border-primary border-dotted hover:border-solid pl-5 pr-5 cursor-pointer ">
                Browser
              </li>
            </div>
            <div className="border-r-[1px] border-primary ">
              <li className="underline decoration-dotted pl-5 pr-5 cursor-pointer">
                Help
              </li>
            </div>

            <div className="border-r-[1px] border-primary">
              <li className="underline decoration-dotted pl-5 pr-5 cursor-pointer">
                List your Practice on ZocDoc
              </li>
            </div>
            <div>
              <li className="underline decoration-dotted pl-5 pr-5 cursor-pointer">
                <select name="auth" id="auth" className="bg-[#D6E5F3]">
                  <option value="volvo" className="mt-[225px] bg-red-400">
                    <span>Patients : </span>
                    <span className="underline decoration-dotted ">Login</span>
                    <span className="underline decoration-dotted">Signup</span>
                  </option>

                  <option value="saab">
                    <span>Doctor : </span>
                    <span className="underline decoration-dotted">Login</span>
                  </option>
                </select>
              </li>
            </div>
          </ul>
        </div>
        <div className="lg:hidden absolute right-20">
          {!showMenu ? (
            <HiMenu className="text-2xl" onClick={toggleMenu} />
          ) : (
            <ImCross onClick={toggleMenu} />
          )}
          {showMenu ? (
            <div className="w-full ">
              <ul className="transition ease-in-out delay-250">
                <li>Login</li>
                <li>SignUp</li>
                <li>Browser</li>
                <li>Help</li>
                <li>Contact Us</li>
                {/* <li>List your Practice on ZocDoc Patients</li> */}
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
