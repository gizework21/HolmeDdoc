import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import sidebar from "./sidebar";
import doctorReducer from "./doctor/doctor.reducer";
import browseModalReducer from "./browseModal/browseModal.reducer";
import masterReducer from "./master/master.reducer";
import generalSettingsReducer from "./generalSettings/generalSettings";
import bookingSuccessReducer from "./bookingSuccess";
import headerSearchReducer from "./headerSearch";
import auth from "./auth/auth.reducer";
import { combineReducers } from 'redux';
import thunk from 'redux-thunk'
import filtersReducer from "./filters/filters.reducer";
import specialityReducer from "./specialities/specialities"

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'master', 'generalSettings']
}

const rootReducer = combineReducers({
  sidebar,
  auth,
  doctor: doctorReducer,
  filters: filtersReducer,
  browseModal: browseModalReducer,
  bookingSuccess: bookingSuccessReducer,
  headerSearch: headerSearchReducer,
  generalSettings : generalSettingsReducer,
  speciality : specialityReducer,
  master: masterReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.REACT_APP_CUSTOM_NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;
