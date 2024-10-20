import React, { useState  } from "react";
import HeaderDropDown from "../components/HeaderDropDown";
import { useSelector, useDispatch } from "react-redux";
// import { signOut } from "../redux/auth/auth.reducer";
import { useNavigate } from "react-router-dom";
import { Login } from "../data/urls";
import { logoutThunk } from "../redux/auth/auth.actions";
import PagesMenu from "./PagesMenu";
import LogoutModal from "./LogoutModal";


const NavbarAuthOption = () => {
  const token = useSelector((state) => state.auth.currentUser?.remember_token);
  const dispatch = useDispatch();
  const isLoggedIn = !!token;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false)

  const logout = () => {
    setShowModal(false)
    dispatch(logoutThunk());
    navigate(Login);
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className="font-basic-sans-regular font-semibold text-xs lg:text-navbarLg">
          <HeaderDropDown />
        </div>
      ) : (
        <>
          <PagesMenu logout={() => setShowModal(true)} />
        </>
      )}
      <LogoutModal showPortal={showModal} logout={logout} closePortal={() => setShowModal(false)}/>
    </>
  );
};

export default NavbarAuthOption;
