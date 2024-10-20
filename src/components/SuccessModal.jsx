import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Home, Login } from "../data/urls";
import GreenButton from "./GreenButton";
import Image from "./Image";

export default function SuccessModal({ showPortal, closePortal, successUrl, btnText }) {
  const navigate = useNavigate();
  return (
    <>
      {showPortal &&
        ReactDOM.createPortal(
          <div className="h-[20rem] w-[90vw] sm:w-[30rem] fixed inset-x-[50%] translate-x-[-50%] top-[30%] bg-white rounded-md z-10">
            <div className="w-full h-full relative flex flex-col items-center">
              <Image
                src={'/icons/Cross.png'}
                onClick={closePortal}
                staticUrl={require("../assets/images/Login/Close.png")}
                alt="cancel"
                className="h-3 absolute right-4 top-4 cursor-pointer"
              />
              <Image
                src={'/login/Success.png'}
                staticUrl={require("../assets/images/Login/Success.png")}
                alt="success"
                className="h-32 mt-8"
              />
              <h1 className="text-2xl text-green font-black font-basic-sans-regular tracking-[3px] mt-4">
                Password Changed!
              </h1>
              <span className="text-gray-600 text-size-3 font-thin mt-1 mb-6">
                Your password has been changed successfully.
              </span>
              <GreenButton
                additionalStyles={"font-black border-[1px]"}
                handleClick={() => navigate(successUrl)}
              >
                {btnText}
              </GreenButton>
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
