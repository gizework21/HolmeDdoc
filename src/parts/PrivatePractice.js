import React from "react";

import YellowHoverBlueButton from "../components/YellowHoverBlueButton";
import privatePractice from "../assets/images/privatePractice.jpeg";
import Image from "../components/Image";

function PrivatePractice() {
  return (
    <div className="px-6 md:px-10 lg:px-16 xl:px-20  mb-10 py-10  grid md:grid-cols-2 grid-cols-1 bg-[#f7f8f9]">
      <div className="md:py-10">
        <Image src={'/privatePractice.png'} staticUrl={privatePractice} alt="private practice" />
      </div>
      <div className="xs:pl-5 sm:pl-12 xl:pl-16 mt-9  flex flex-col justify-center">
        <p className="md:text-xs lg:text-[21px] text-base font-sharp-sans-bold mb-3  md:mb-3.5 lg:mb-6">
          Zocdoc for private practices
        </p>
        <h2 className="md:text-2xl text-2xl  font-sharp-sans-bold mb-7 md:mb-3.5 lg:mb-6">
          Are you a provider interested in reaching new patients?
        </h2>
        <ul className="list-disc mb-9 md:mb-3.5 lg:mb-10 pl-5 sm:pl-0 ">
          <li className=" md:text-xs lg:text-lg text-base">
            Reach patients in your area looking for a new provider
          </li>
          <li className="md:text-xs lg:text-lg text-base">
            Fill last-minute openings in your schedule
          </li>
          <li className="md:text-xs lg:text-lg text-base">
            Strengthen your online reputation with verified reviews
          </li>
        </ul>
        {/* <Button variant="warning">List your practice on Zocdoc</Button> */}
        <YellowHoverBlueButton name="List your practice on Zocdoc" />
      </div>
    </div>
  );
}

export default PrivatePractice;
