import React from "react";
import { BsFillShieldFill } from "react-icons/bs";
import { HiShieldCheck } from "react-icons/hi";
import review1 from "../assets/images/review1.jpeg";
import review2 from "../assets/images/review2.jpeg";
import review3 from "../assets/images/review3.jpeg";
import reveiw1Small from "../assets/images/reveiw1Small.jpeg";
import reveiw2Small from "../assets/images/reveiw2Small.jpeg";
import reveiw3Small from "../assets/images/reveiw3Small.jpeg";
import BlueButton from "../components/BlueButton";

const CustomReview = (props) => {
  return (
    <div className="h-full flex flex-col items-center justify-between pt-8 md:pt-0">
      <img
        src={props.image}
        alt=""
        className="w-auto h-auto  hidden md:block"
      />
      <img src={props.icon} alt="" className="w-32 h-32 block md:hidden" />
      <div className="md:pt-6 flex flex-col items-center justify-between md:px-8">
        <h3 className="text-center text-2xl lg:text-2xl my-5 font-sharp-sans-bold">
          {props.title}
        </h3>
        <div className="text-center ">
          <BlueButton name={props.buttonName} />
        </div>
      </div>
    </div>
  );
};

function ReadReview() {
  return (
    <div className="px-6 md:px-10 lg:px-16 xl:px-20 pt-20 pb-20  bg-[#F7F8F9] ">
      <h1 className="text-center text-3xl md:text-5xl font-sharp-sans-bold py-5 pb-4 md:pb-16">
        Zocdoc is healthcare, but easy
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-2">
        <CustomReview
          title="Browse providers who take your insurance"
          buttonName="See specialties"
          image={review1}
          icon={reveiw1Small}
        />
        <CustomReview
          title="Read reviews from users &nbsp; &nbsp;&nbsp;"
          buttonName="See providers"
          image={review2}
          icon={reveiw2Small}
        />
        <CustomReview
          title="Book an appointment today, online"
          buttonName="See availiability"
          image={review3}
          icon={reveiw3Small}
        />
      </div>
    </div>
  );
}

export default ReadReview;
