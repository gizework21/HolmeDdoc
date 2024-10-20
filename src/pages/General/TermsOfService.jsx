import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HolmeddocLoader from "../../components/HolmeddocLoader.jsx";
import { Home } from "../../data/urls.js";
import NewFooter from "../../parts/NewFooter";
import { getGeneralSettings } from "../../services/master.js";

const TermsOfService = () => {
  /**
   * getting terms of service from redux
   */
  const data = useSelector(
    (state) => state.generalSettings.data.termsOfService
  );

  /**
   * getting loading status from redux
   */
  const status = useSelector((state) => state.generalSettings.status);
  // console.log("🚀 ~ file: TermsOfService.jsx:17 ~ TermsOfService ~ status", status)

  return (
    <>
      {status == 'loading' ? <div className="w-full h-full flex items-center justify-center"><HolmeddocLoader /></div> :
      <div className="mt-10 px-2">
        <div
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>}
    </>
  );
};

export default TermsOfService;
