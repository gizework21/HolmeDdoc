import React from "react";
import { useSelector } from "react-redux";
import HolmeddocLoader from "../../components/HolmeddocLoader.jsx";

const UserAgreement = () => {
  /**
   * getting terms of service from redux
   */
  const data = useSelector(
    (state) => state.generalSettings.data.userAgreement
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

export default UserAgreement;
