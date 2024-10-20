import React from "react";
import NewNavBarHolmeddoc from "./NewNavBarHolmeddoc";
import NewHeader from "./NewHeader";
import NewCommonConcerns from "./NewCommonConcerns";
import NewAboutUs from "./NewAboutUs";
import NewDownloadApp from "./NewDownloadApp";
import NewFooter from "./NewFooter";
import NewTrustedByTop from "./NewTrustedByTop";

function HomePage() {
  return (
    <div>
      <NewNavBarHolmeddoc />
      <NewHeader />
      <NewCommonConcerns />
      <NewAboutUs />
      <NewDownloadApp />
      <NewTrustedByTop />
      <NewFooter />
    </div>
  );
}

export default HomePage;
