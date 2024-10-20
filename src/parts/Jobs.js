import React from "react";
import job from "../assets/images/job.jpeg";
import Image from "../components/Image";
import YellowButton from "../components/YellowButton";

function Jobs() {
  return (
    <div className="px-6 md:px-10 lg:px-16 xl:px-20 mt-5 mb-5 lg:py-10  md:py-16 py-10 grid md:grid-cols-2 grid-cols-1 gap-4 justify-center max-w-full md:max-w-full">
      <div>
        <Image src={'/job.jpeg'} staticUrl={job} alt="" className="w-full h-full object-cover" />
      </div>
      <div className=" md:pl-8 lg:pl-5 xl:pl-16 flex flex-col md:justify-start md:items-start justify-center items-center">
        <p className="lg:text-[21px] md:text-lg text-sm font-sharp-sans-bold mb-3 md:mb-3.5 lg:mb-6">
          Holmeddoc jobs
        </p>

        <h2 className="text-xl lg:text-4xl font-sharp-sans-bold mb-3 md:mb-3.5 lg:mb-6 pl-6  sm:pl-0">
          Join us, and help transform healthcare for everyone.
        </h2>
        {/* <button>View job openings</button> */}
        <YellowButton name="View job openings" />
      </div>
    </div>
  );
}

export default Jobs;
