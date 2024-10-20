import React, { useState, useRef, useCallback } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { listOfCards } from "../data/cardDetails";
import Card from "./Card";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function MultiCarousel(props) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1600 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };
  const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest;
    // onMove means if dragging or swiping in progress.
    return <button className="border-red-700" onClick={() => onClick()} />;
  };
  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className="carousel-button-group">
        {" "}
        {/* // remember to give it position:absolute */}
        <button
          className={
            currentSlide === 0
              ? "p-2 m-2 border-2 border-gray-400 rounded-full cursor-pointer text-gray-400"
              : "p-2 m-2 border-2 border-primary rounded-full cursor-pointer text-primary"
          }
          // className="p-2 m-2 border-2 border-primary rounded-full cursor-pointer  "
          onClick={() => previous()}
        >
          <IoIosArrowBack />
        </button>
        <button
          // className="p-2 m-2 border-2 border-primary rounded-full cursor-pointer"
          className={
            currentSlide === listOfCards.length - 2
              ? "p-2 m-2 border-2 border-gray-400 rounded-full cursor-pointer text-gray-400"
              : "p-2 m-2 border-2 border-primary rounded-full cursor-pointer text-primary"
          }
          onClick={() => next()}
        >
          <IoIosArrowForward />
        </button>
        {/* <button onClick={() => goToSlide(currentSlide + 1)}>
          {" "}
          Go to any slide{" "}
        </button> */}
      </div>
    );
  };
  <Carousel />;

  return (
    <Carousel
      responsive={responsive}
      removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
      customRightArrow={<CustomRightArrow />}
      renderButtonGroupOutside={true}
      customButtonGroup={<ButtonGroup />}
    >
      {listOfCards.map((cardDetails, index) => (
        <div className="m-1 pt-16 flex flex-row" key={index}>
          <Card
            name={cardDetails.name}
            type={cardDetails.type}
            tag={cardDetails.tag}
            location={cardDetails.location}
            rating={cardDetails.rating}
            review={cardDetails.review}
            desc={cardDetails.desc}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default MultiCarousel;
