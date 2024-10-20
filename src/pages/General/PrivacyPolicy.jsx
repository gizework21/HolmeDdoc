import React from "react";
import { useSelector } from "react-redux";
import HolmeddocLoader from "../../components/HolmeddocLoader.jsx";


const PrivacyPolicy = () => {

  const data = useSelector((state) => state.generalSettings.data.privacyPolicy);

  const status = useSelector(state=> state.generalSettings.status)

  return (
    <>
      {status == 'loading' ? <div className="w-full h-full flex items-center justify-center"><HolmeddocLoader /></div> : null}
      {status !== 'loading' && <div className="mt-10 px-2">
        <div
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>}
    </>
  );
};

export default PrivacyPolicy;