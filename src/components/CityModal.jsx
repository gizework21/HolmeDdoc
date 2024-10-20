import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { MakeAppointment } from "../data/urls.js";
import Backdrop from "./Backdrop";
import { useSelector } from "react-redux";
import HolmeddocLoader from "./HolmeddocLoader.jsx";
import Image from "./Image.jsx";

const CityModal = ({ isModalVissible, closeModal }) => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.browseModal.city);
  const fetching = useSelector((state) => state.browseModal.isFetching);

  const handleCityClicked = (id) => {
    closeModal();
    navigate(`${MakeAppointment}?city_id=${id}`);
  };

  const data1 = [];

  return (
    <>
      {isModalVissible &&
        ReactDOM.createPortal(
          <div className="rounded-2xl block fixed inset-x-[50%] translate-x-[-50%] top-[14%] bg-white min-h-[20rem] min-w-[75vw] 2xl:min-w-[70vw]  z-50">
            <div className="flex justify-between items-center px-8 rounded-2xl border-[1px] border-gray-50 py-5 bg-blueBg ">
              <div className="text-size-12 font-bold tracking-[2px]">
                Browse Doctors
              </div>
              <Image
                src={"/icons/Cross.png"}
                className="h-4 cursor-pointer"
                onClick={closeModal}
                staticUrl={require("../assets/images/Login/Close.png")}
                alt="close"
              />
            </div>
            <div>
              {/* added this text when no cities are available  */}
              {data.length === 0 && (
                <h1 className="text-green mx-16 p-8 mt-16 bg-blueBg bg-opacity-50 text-center text-size-10 lg:text-size-12 tracking-[2px]">
                  No doctors are available at the moment.
                </h1>
              )}
            </div>
            <div className="w-full grid grid-cols-3 xl:grid-cols-4 justify-items-center gap-y-5 gap-x-8 px-8 py-10">
              {fetching === true ? (
                <div className="flex-1 flex justify-center">
                  <HolmeddocLoader />
                </div>
              ) : null}
              {data.map((item, key) => (
                <div
                  key={key}
                  className="bg-blueBg bg-opacity-50 w-[11rem] lg:w-[13rem] 2xl:w-[14rem] p-3 flex items-center space-x-4 rounded-xl cursor-pointer"
                  onClick={() => handleCityClicked(item.zip_code_id)}
                >
                  <Image
                    src={"/home/CityLocation.png"}
                    className="h-6"
                    staticUrl={require("../assets/images/CityLocation.png")}
                    alt="location"
                  />
                  <h1 className="text-green text-size-4 lg:text-size-8 tracking-[2px]">
                    {item.city_name}
                  </h1>
                </div>
              ))}
            </div>
          </div>,
          document.getElementById("portal")
        )}
      {isModalVissible && <Backdrop zIndex={"z-40"} handleClick={closeModal} />}
    </>
  );
};

export default CityModal;
