import { Component, useState, useRef, useCallback } from "react";
import { Carousel } from "react-responsive-carousel";
import { listOfCards } from "../data/cardDetails";
import Card from "./Card";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const ExternalControlledCarousel = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(props.autoPlay || false);
  const state = useRef();
  const next = useCallback(() => {
    setCurrentSlide((prevCurrentSlide) => {
      return prevCurrentSlide + 1;
    });
  });
  const prev = useCallback(() => {
    setCurrentSlide((prevCurrentSlide) => {
      return prevCurrentSlide - 1;
    });
  });
  const changeAutoPlay = useCallback(() => {
    setAutoPlay((prevAutoPlay) => {
      return !prevAutoPlay;
    });
  });
  const updateCurrentSlide = useCallback((index) => {
    // console.log("index", index);
    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
  });
  const customThumbs = (children) => {
    children.map((item) => {
      return <>a</>;
    });
  };
  const handlePrev = (onClickHandler, hasPrev, label) => hasPrev && <></>;
  const handleNext = (onClickHandler, hasNext, label) => hasNext && <></>;
  return (
    <div>
      <Carousel
        autoPlay={autoPlay}
        selectedItem={currentSlide}
        onChange={updateCurrentSlide}
        renderThumbs={customThumbs}
        renderArrowPrev={handlePrev}
        renderArrowNext={handleNext}
        centerMode
        centerSlidePercentage={50}
      >
        {listOfCards.map((cardDetails) => (
          <div className="m-1 pt-16 flex flex-row">
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
      <div className="">
        <button
          onClick={prev}
          className="p-2 m-2 border-2 border-primary rounded-full"
        >
          <IoIosArrowBack />
        </button>
        <button
          onClick={next}
          className="p-2 m-2 border-2 border-primary rounded-full"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default ExternalControlledCarousel;
