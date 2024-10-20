import axios from "axios";
import { logoutThunk } from "../redux/auth/auth.actions";
import store from "../redux/store";

// "http://skyonliners.com/demo/holmeddoc"
// https://3f60-110-227-197-199.in.ngrok.io/holmeddoc
const customAxios = axios.create({
  baseURL: process.env.REACT_APP_CUSTOM_NODE_ENV === "production" ? "https://telehealth.ikrajindustries.com/" : "https://telehealth.ikrajindustries.com/",
  timeout: process.env.REACT_APP_CUSTOM_NODE_ENV === "development" ? 2000*60 : 1000*60,
});
// process.env.NODE_ENV === "production" ? "http://webservices.holmeddoc.com" : "http://skyonliners.com/demo/holmeddoc",
customAxios.interceptors.request.use((config) => {
  config.headers.platform = "web";
  config.headers["device-id"] = 14;
  config.headers.Authorization = `Basic YWRtaW46bXlwY290`;
  config.headers["Content-Type"] = "application/json";
  config.headers["access-token"] = `${
    store.getState()?.auth?.currentUser?.remember_token
  }`;
  return config;
});

customAxios.interceptors.response.use(
  (res) => {
    // console.log("🚀 ~ file: CustomAxios.js:22 ~ res", res)
    if (res.data.success === 4) {
      window.location.href = "/login";
      store.dispatch(logoutThunk()); //if token expired logout
    } else {
      return res;
    }
  },  
  (err) => {
    if (err.status === 401) {
      store.dispatch(logoutThunk()); //if token expired logout
    } else if (err.code === "ECONNABORTED") {
      // console.log(err.message);
    }else if (typeof err.response === 'undefined') {
      // alert('A network error occurred. '
      //     + 'This could be a CORS issue or a dropped internet connection. '
      //     + 'It is not possible for us to know.')
    }
    return Promise.reject(err);
  }
);

export default customAxios;
