import { createSlice } from "@reduxjs/toolkit";

export const generalSettingsSlice = createSlice({
  name: "generalSettings",

  initialState: {
    status: "notLoaded",
    data: {
      aboutUs: "",
      privacyPolicy: "",
      termsOfService: "",
      facebook: "",
      twitter: "",
      instagram: "",
      userAgreement: "",
      insurance : [],
    },
  },
  reducers: {
    setAboutUs: (state, action) => {
      state.data.aboutUs = action.payload;
    },

    setTermsOfUse: (state, action) => {
      state.data.termsOfService = action.payload;
    },

    setPrivacyPolicy: (state, action) => {
      state.data.privacyPolicy = action.payload;
    },

    setFacebook: (state, action) => {
      state.data.facebook = action.payload;
    },

    setTwitter: (state, action) => {
      state.data.twitter = action.payload;
    },

    setInstagram: (state, action) => {
      state.data.instagram = action.payload;
    },

    setStatus: (state, action) => {
      state.status = action.payload;
    },

    setInsurance : (state, action) =>{
      state.insurance = action.payload
    },
    setUserAgreement: (state, action) => {
      state.data.userAgreement = action.payload
    }
  },
});

export const {
  setAboutUs,
  setTermsOfUse,
  setPrivacyPolicy,
  setFacebook,
  setTwitter,
  setInstagram,
  setStatus,
  setInsurance,
  setUserAgreement
} = generalSettingsSlice.actions;

export default generalSettingsSlice.reducer;
