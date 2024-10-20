import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Login } from "../data/urls";
import Image from "./Image";

export default function AutheticationModal({ showPortal, closePortal }) {
  const navigate = useNavigate();
  return (
    <>
      {showPortal &&
        ReactDOM.createPortal(
          <div className="h-[16rem] w-[94vw] sm:w-[32rem] fixed inset-x-[50%] translate-x-[-50%] top-[30%] bg-white rounded-md z-10">
            <div className="w-full h-full relative flex flex-col items-center justify-center">
              <Image
                src={"/icons/Cross.png"}
                onClick={closePortal}
                staticUrl={require("../assets/images/Login/Close.png")}
                alt="cancel"
                className="h-3 absolute right-6 top-6 cursor-pointer"
              />
              {/* <img src={require("../assets/images/icons/UnAuthenticated.png")} alt="success" className="h-32 mt-8" /> */}
              <h1 className="lg:text-size-12 sm:text-size-5 md:text-size-12 text-green font-black font-basic-sans-regular tracking-[3px] mt-8">
                Authentication Required
              </h1>
              <span className="text-gray-700 text-size-5 mt-1 mb-8">
                This action requires you to Login.
              </span>
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
                <button
                  onClick={closePortal}
                  className={`border-green border w-[10rem] h-[2.8rem]  text-green py-1 rounded-full font-basic-sans-regular text-size-3 z-10  font-medium tracking-[0.5px]`}
                >
                  Back to browse
                </button>
                <button
                  onClick={() => navigate(Login)}
                  className={`bg-green w-[10rem] h-[2.8rem] text-white  py-1 rounded-full font-basic-sans-regular text-size-3 z-10 btn-wordspace  font-medium tracking-[0.5px]`}
                >
                  Login
                </button>
              </div>
            </div>
          </div>,
          document.getElementById("portal")
        )}
      {showPortal &&
        ReactDOM.createPortal(
          <div
            onClick={closePortal}
            className="h-full w-full fixed inset-0 bg-gray-600 bg-opacity-50"
          ></div>,
          document.getElementById("backdrop")
        )}
    </>
  );
}
