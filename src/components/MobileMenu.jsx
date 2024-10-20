import React, { useEffect, useState } from "react";
import footerM from "../assets/images/LogoSmall.png";
import {
  AboutUs,
  DoctorLogin,
  Login,
  Register,
  Home,
  MakeAppointment,
  ChangePassword,
  MyProfile,
  MyAppointment,
} from "../data/urls";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import { toggleMobileMenu } from "../redux/sidebar";
import SearchBar from "./SearchBar";
import DeleteAccountModal from "./DeleteAccountModal";
import LogoutModal from "./LogoutModal";
import { signOut } from "../redux/auth/auth.reducer";
import Image from "./Image";

const MENU = [
  { title: "Home", protected: false, type: "link", link: Home },
  { title: "About Us", protected: false, type: "link", link: AboutUs },
  {
    title: "Make an appointment",
    protected: false,
    type: "link",
    link: MakeAppointment,
  },
  { title: "Browse", protected: false, type: "modal" },
  { title: "My Profile", protected: true, type: "link", link: MyProfile },
  {
    title: "My Appointments",
    protected: true,
    type: "link",
    link: MyAppointment,
  },
  {
    title: "Change Password",
    protected: true,
    type: "link",
    link: ChangePassword,
  },
  { title: "Delete Account", protected: true, type: "modal" },
  { title: "Sign out", protected: true, type: "modal" },
];

const MobileMenu = ({ logoHidden, hideHam }) => {
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.sidebar.showMobileMenu);
  const token = useSelector((state) => state.auth.currentUser?.remember_token);
  const name = useSelector((state) => state.auth.userName);


  const [showCity, setShowCity] = useState(false);
  const dispatch = useDispatch();
  const IsLoggedIn = !!token;
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const data = useSelector((state) => state.browseModal.city);
  const [citySearchTerm, setCitySearchTerm] = useState("");

  const filteredMenuItems = MENU.filter(
    (item) => IsLoggedIn || !item.protected
  );

  useEffect(() => {
    // clear searchterm when modal is closed/opened
    setCitySearchTerm("");
  }, [showCity]);

  const handleItemClick = (item) => {
    if (item.type === "modal") {
      if (item.title === "Browse") {
        setShowCity(true);
      } else if (item.title === "Delete Account") {
        setShowModal(true);
      } else {
        setShowAuthModal(true);
      }
      return;
    }
    dispatch(toggleMobileMenu());
    navigate(item.link);
  };

  const handleLogout = () => {
    dispatch(signOut());
    dispatch(toggleMobileMenu());
    navigate(Login);
  };

  const handleAuthlinkClick = (link) => {
    dispatch(toggleMobileMenu());
    navigate(link);
  };

  const handleCityClick = (id) => {
    navigate(`${MakeAppointment}?city_id=${id}`);
    dispatch(toggleMobileMenu());
  };


  return (
    <div className="md:hidden flex justify-between items-center md:py-2 sm:py-2 py-2 md:ml-5">
      <DeleteAccountModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
      />
      <LogoutModal
        showPortal={showAuthModal}
        closePortal={() => setShowAuthModal(false)}
        logout={handleLogout}
      />
      {!logoHidden && (
        <div onClick={() => navigate(Home)}>
          <Image
            src={"/home/LogoSmall.png"}
            staticUrl={footerM}
            alt=""
            className="w-[35%] z-10"
          />
        </div>
      )}
      {!hideHam && (
        <div className="flex items-center float-right z-10">
          <button
            type="button"
            onClick={() => dispatch(toggleMobileMenu())}
            className="rounded-md  bg-none bg-opacity-20 px-4 sm:py-2  sm:text-2xl text-lg  hover:bg-opacity-30 focus:outline-none"
          >
            <Image
              src={"/icons/Hamburger.png"}
              staticUrl={require("../assets/images/icons/Hamburger.png")}
              className="h-5"
              alt="ham"
            />
          </button>
        </div>
      )}
      {ReactDOM.createPortal(
        <div
          className={`block lg:hidden fixed min-h-[100vh] w-[100vw] overflow-y-scroll inset-0 z-40 bg-white ease-in-out duration-300 transition-all ${
            isOpen ? "translate-x-0" : "translate-x-[100%]"
          } ${showCity ? "opacity-0" : "opacity-[1]"} duration-300`}
        >
          <div className="relative min-h-full">
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="absolute right-5 top-5 bg-gray-100 h-11 w-11 flex items-center justify-center rounded-full"
            >
              <Image
                src={"/icons/Cross.png"}
                staticUrl={require("../assets/images/icons/Cross.png")}
                className="h-4"
                alt="cross"
              />
            </button>
            <div className="absolute top-20 pb-10 w-full">
              <div className="px-5 w-full font-basic-sans-regular">
                {IsLoggedIn && (
                  <h1 className="text-green text-size-11">Hello, {name}</h1>
                )}
                {!IsLoggedIn && (
                  <>
                    <div
                      className={`w-full text-size-6 py-4 border-b border-dotted border-gray-300 text-black font-light`}
                    >
                      <div className="flex items-center">
                        <h1 className="w-[5rem]">Patients</h1>
                        <button
                          className="mr-2 border-b-[1px] border-gray-600 border-dashed 
        font-basic-sans-regular text-size-3"
                          onClick={() => handleAuthlinkClick(Login)}
                        >
                          Log in
                        </button>
                        <button
                          className="border-b-[1px] border-gray-600 border-dashed
          font-basic-sans-regular text-sm ml-5"
                          onClick={() => handleAuthlinkClick(Register)}
                        >
                          Sign up
                        </button>
                      </div>
                    </div>
                    <div
                      className={`w-full mb-3 text-size-6 py-4 border-b border-dotted border-gray-300 text-black font-light`}
                    >
                      <div className="flex items-center">
                        <h1 className="w-[5rem]">Doctors</h1>
                        <button
                          className="mr-2 border-b-[1px] border-gray-600 border-dashed 
        font-basic-sans-regular text-size-3"
                          onClick={() => handleAuthlinkClick(DoctorLogin)}
                        >
                          Log in
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {filteredMenuItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleItemClick(item)}
                    className={`w-full text-size-6 py-4 ${
                      idx !== filteredMenuItems.length - 1 &&
                      "border-b border-gray-300"
                    } text-black font-light`}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.getElementById("portal")
      )}
      {showCity &&
        ReactDOM.createPortal(
          <div
            className={`block md:hidden fixed min-h-[100vh] w-[100vw] overflow-y-scroll scrollbar-hide inset-0 z-50 bg-white ease-in-out transition-opacity duration-300 opacity-0 ${
              showCity && "opacity-[1]"
            }`}
          >
            <div className="relative min-h-full">
              <button
                onClick={() => setShowCity(false)}
                className="absolute right-5 top-5 bg-gray-100 h-11 w-11 flex items-center justify-center rounded-full"
              >
                <Image
                  src={"/profile/Cross.png"}
                  staticUrl={require("../assets/images/icons/Cross.png")}
                  className="h-4"
                  alt="cross"
                />
              </button>
              <div className="absolute top-24 pb-12 w-full">
                <div className="px-5 w-full font-basic-sans-regular">

                  {/* <SearchBar
                    handleSearch={(searchTerm) => setCitySearchTerm(searchTerm)}
                  /> */}
                  <div className="text-size-6 font-bold tracking-[2px] mt-3">
                    Browse Doctors near you
                  </div>
                  <div className="space-y-3 mt-3">
                    {data
                      .filter((el) =>
                        el?.city_name
                          .toLowerCase()
                          .includes(citySearchTerm.toLowerCase())
                      )
                      .map((el, key) => (
                        <div
                          key={key}
                          onClick={() => handleCityClick(el.zip_code_id)}
                          className="bg-blueBg bg-opacity-50 w-full p-3 flex items-center space-x-4 rounded-xl cursor-pointer"
                        >
                          <Image
                            src={"/home/CityLocation.png"}
                            className="h-5"
                            staticUrl={require("../assets/images/CityLocation.png")}
                            alt="location"
                          />
                          <h1 className="text-green text-size-5 tracking-[2px]">
                            {el?.city_name}
                          </h1>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.getElementById("city")
        )}
    </div>
  );
};

export default MobileMenu;
