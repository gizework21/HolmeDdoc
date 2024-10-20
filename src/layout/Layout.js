import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NewFooter from "../parts/NewFooter";
const Header = React.lazy(() => import("../parts/NewNavBarHolmeddoc"));
const Footer = React.lazy(() => import("../parts/Footer"));

function Layout(props) {
  const [backdropAllowed, setBackdropAllowed] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if(window.innerWidth >= 991){
  //     setBackdropAllowed(false)
  //   }
  // }, [])

  useEffect(() => {
    const handleInvalidToken = () => {
      if (
        !localStorage.getItem("token") &&
        window.location.href.split("/").pop() != "login"
      ) {
        // enqueueSnackbar("Please login first!", { variant: "error" });
        navigate("/login");
      }
    };

    window.addEventListener("storage", handleInvalidToken);

    return () => {
      window.removeEventListener("storage", handleInvalidToken);
    };
  }, []);
  return (
    <Fragment>
      <Header />
      <Outlet />
      <NewFooter />
    </Fragment>
  );
}

export default Layout;
