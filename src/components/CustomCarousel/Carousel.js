import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useSelector } from "react-redux";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className={`w-[${width}]`}>
      {children}
    </div>
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const featuredDoctors = useSelector(state => state.master.featuredDoctors)
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 6000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1)
  });

  return (
    <div
      {...handlers}
      className="overflow-hidden w-full h-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="transition-transform duration-[1s] flex w-full h-full"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {children}
      </div>
        <div className="space-x-5 flex items-center mt-5 md:-ml-20 justify-center h-full">
            {new Array(featuredDoctors.length).fill(0).map((el, idx) => 
                <button key={idx} className={`${activeIndex === idx ? 'disable bg-green border-green h-4 w-4 md:h-[15px] md:w-[15px]' : 'border-grey  h-3 w-3 md:h-[12px] md:w-[12px]'} border-[1px] rounded-full`} onClick={() => updateIndex(idx)} />
            )}
            {/* <button className={`${activeIndex === 1 ? 'disable bg-green border-green h-4 w-4 md:h-[15px] md:w-[15px]' : 'border-grey  h-3 w-3 md:h-[12px] md:w-[12px]'} border-[1px] rounded-full`} onClick={() => updateIndex(1)} />
            <button className={`${activeIndex === 2 ? 'disable bg-green border-green h-4 w-4 md:h-[15px] md:w-[15px]' : 'border-grey  h-3 w-3 md:h-[12px] md:w-[12px]'} border-[1px] rounded-full`} onClick={() => updateIndex(2)} /> */}
        </div>
    </div>
  );
};

export default Carousel;
