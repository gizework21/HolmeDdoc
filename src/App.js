import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useTranslation } from "react-i18next";
import { Routes, Route, useLocation } from "react-router-dom";
import LayoutRoutes from "./layout/LayoutRoutes";
import TranslateContainer from "./components/TranslateContainer";
import { SnackbarProvider, useSnackbar } from "notistack";
import { fetchBrowseModalDataThunk } from "./redux/browseModal/browseModal.actions";
import {
  clearSelectedFilters,
  resetDoctorList,
} from "./redux/doctor/doctor.reducer";
import { setSpeciality } from "./redux/headerSearch";
// import PageNotFound from "./pages/PageNotFound";
import { fetchMasterDataThunk } from "./redux/master/master.action";
import { fetchFiltersThunk } from "./redux/filters/filters.actions";
import noInternetImage from "./assets/base64Images/nointImage";
// import axios from "axios";
import { fetchGeneralSettingDataThunk } from "./redux/generalSettings/generalSettings.actions";
import {ZIM } from 'zego-zim-web'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

const LandingPage = TranslateContainer(
  lazy(() => import("./pages/LandingPage/LandingPage"))
);
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const DoctorSearchListing = TranslateContainer(
  lazy(() => import("./pages/DoctorSearchListing"))
);
const Account = TranslateContainer(lazy(() => import("./pages/Account")));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const UnderDevelopment = TranslateContainer(
  lazy(() => import("./pages/UnderDevelopment"))
);
const BookTopDoctorAppointment = TranslateContainer(
  lazy(() => import("./pages/BookTopDoctorAppointment"))
);
const General = lazy(() => import("./pages/General/index"));

const underDevelopment = ["/doctorLogin", "/doctorRegister"];
 

function App() {
  const dispatch = useDispatch();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  // const state = useSelector((state) => state.doctor);
console.log("kdjfjd")
  // Retrieve the token from localStorage
  const token = localStorage.getItem('persist:root');

  if (token) {
    try {
      // Parse the token string to an object
      const parsedToken = JSON.parse(token);
  
      // Parse the 'auth' part of the token if it exists
      const authData = parsedToken.auth ? JSON.parse(parsedToken.auth) : null;
      console.log("authData: ", authData);

  
      if (authData && authData.currentUser) {
        const currentUser = authData.currentUser;
        const userId = `${currentUser.id}`; // Provide fallback values if necessary
        const fullName = `${currentUser.patient_first_name}${currentUser.patient_last_name}`;
        
        console.log("currentUser: ", currentUser);
  
        // Assign the values to userID and userName
        const userID = userId;
        const userName = fullName;
  
        // Define appID and serverSecret (provide meaningful values)
        const appID = 1157639492 ; // Replace with actual appID
        const serverSecret = "5cf4533481174705f7e3d06e532e189b"; // Replace with actual serverSecret
  
        // Generate the token
        const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, null, userID, userName);
  
        // Instantiate ZegoUIKitPrebuilt
        const zp = ZegoUIKitPrebuilt.create(TOKEN);
  
        // Add any required plugins
        zp.addPlugins({ ZIM });
      } else {
        console.error("Invalid token format: 'currentUser' not found in auth data");
      }
    } catch (error) {
      console.error("Error parsing token or auth data:", error);
    }
  } else {
    console.error("No token found in localStorage");
  }
  
  // console.log(state)
  const { t, i18n } = useTranslation();
  // const currentUser = useSelector((state) => state.auth);
  const selectedFilters = useSelector((state) => state.doctor.selectedFilters);
  // const importAll = (r) => {
  //   // console.log(r)
  //   const images = [];
  //   r.keys().forEach((item) => {
  //     images[item.replace("./", "")] = r(item);
  //   });
  //   return images;
  // };

  // const preloadImages = () => {
  //   // console.log('preloading')
  //   const images = importAll(require.context("./assets/images/home", false));
  //   // console.log(images);
  //   Object.values(images).forEach((image) => {
  //     const img = new Image();
  //     img.src = typeof image === "string" ? image : image.default;
  //   });
  // };


  useEffect(() => {
    // preloadImages();

    // ! setting image base64 link in localstorage --> Ubaid
    localStorage.setItem("image", noInternetImage);
  }, []);

  const DismissAction = ({ id }) => {
    const { closeSnackbar } = useSnackbar();
    return (
      <span onClick={() => closeSnackbar(id)} className="">
        <img
          className="h-4 cursor-pointer"
          src={require("./assets/images/Login/Close.png")}
          alt="close"
        />
      </span>
    );
  };

  // ! getting image url from local Storage --> Ubaid
  const img = localStorage.getItem("image");

  const location = useLocation();

  useEffect(() => {
    dispatch(fetchMasterDataThunk());
    dispatch(fetchBrowseModalDataThunk());
    dispatch(fetchFiltersThunk());
    dispatch(fetchGeneralSettingDataThunk())
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    return () => {
      clearTimeout(timeout);
    };
  }, [location]);

  useEffect(() => {
    if (
      location.pathname.startsWith("/doctorsearch") ||
      location.pathname.startsWith("/doctor")
    ) {
      return;
    }
    dispatch(resetDoctorList());
    if (JSON.stringify(selectedFilters) === "{}") {
      return;
    }
    dispatch(clearSelectedFilters());
    dispatch(
      setSpeciality({
        id: null,
        seo_url: "",
        type: "",
        title: "",
      })
    );
  }, [dispatch, location, selectedFilters]);

  let isProductionEnvironment = process.env.REACT_APP_CUSTOM_NODE_ENV === "production";
  
  // ! when online changing state to online
  window.addEventListener("online", () => {
    setIsOnline(true);
  });

  // ! when offline changing state to offline
  window.addEventListener("offline", () => {
    setIsOnline(false);
  });

  // ! Conditionally rendering the no internet connection image. --> Ubaid
  if (!isOnline) {
    return (
      <div className="w-[45vw] h-auto p-10 m-auto flex flex-col space-y-5 justify-center items-center">
        {/* image was not showing up on no internet connection --> Ubaid */}
        <img src={img} alt="noint" />
        <h1 className="text-green font-semibold text-size-10">
          Oops!! Internet Connection Lost
        </h1>
      </div>
    );
  }
  return (
    <SnackbarProvider maxSnack={5} action={(key) => <DismissAction id={key} />}>
      <div className="w-full font-basic-sans-regular">
        {!isProductionEnvironment && (
          <div className="bg-[red] p-1 sticky z-50 top-0 flex justify-center text-white">
            <h1 className="capitalize text-xl">{process.env.REACT_APP_CUSTOM_NODE_ENV} Mode</h1>
          </div>
        )}
        <Routes>
          {/* <Route path="/" element={<Dummy />} /> */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/doctorsearch" element={<DoctorSearchListing />} />
          <Route path={`/account/*`} element={<Account />} />
          <Route
            path={"/bookTopDoctor"}
            element={<BookTopDoctorAppointment />}
          />
          <Route path={"/general/*"} element={<General />} />
          {underDevelopment.map((item, key) => (
            <Route key={key} path={item} element={<UnderDevelopment />} />
          ))}
          <Route path={`/*`} element={<LayoutRoutes />} />
        </Routes>
      </div>
    </SnackbarProvider>
  );
}
export default App;
