import React from 'react'
import DoctorCarouselCard from './DoctorCarouselCard'
import Carousel, { CarouselItem } from './CustomCarousel/Carousel'
import { useSelector } from 'react-redux'
// const responsive = {
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 1,
//       slidesToSlide: 1 // optional, default to 1.
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 1,
//       slidesToSlide: 1 // optional, default to 1.
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//       slidesToSlide: 1 // optional, default to 1.
//     }
// };

const DoctorCarousel = () => {
    const featuredDoctors = useSelector(state => state.master.featuredDoctors ?? [])
    // const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    //     const { carouselState: { currentSlide } } = rest;
    //     return (
    //       <div className="absolute top-[96%] left-1/2 md:left-[40%] transform -translate-x-1/2 -translate-y-1/2"> 
    //         <div className="space-x-5 flex items-center">
    //             <button className={`${currentSlide === 0 ? 'disable bg-green border-green scale-[1.2]' : 'border-[1px] border-grey '} h-3 w-3 md:h-[12px] md:w-[12px] rounded-full`} onClick={() => goToSlide(0)} />
    //             <button className={`${currentSlide === 1 ? 'disable bg-green border-green scale-[1.2]' : 'border-[1px] border-grey '} h-3 w-3 md:h-[12px] md:w-[12px] rounded-full`} onClick={() => goToSlide(1)} />
    //             <button className={`${currentSlide === 2 ? 'disable bg-green border-green scale-[1.2]' : 'border-[1px] border-grey '} h-3 w-3 md:h-[12px] md:w-[12px] rounded-full`} onClick={() => goToSlide(2)} />
    //         </div>
    //       </div>
    //     );
    // };

    return (
      <div className='w-[80vw] sm:w-[80vw] md:w-[28rem] lg:w-[32rem] xl:w-[36rem] h-full md:ml-8 md:pt-8'> 
      <Carousel>
        {featuredDoctors.map(el => <CarouselItem width={"100%"} key={el.id}><DoctorCarouselCard {...el} /></CarouselItem>)}
        {/* <CarouselItem width={"100%"}><DoctorCarouselCard /></CarouselItem>
        <CarouselItem width={"100%"}><DoctorCarouselCard /></CarouselItem>
        <CarouselItem width={"100%"}><DoctorCarouselCard /></CarouselItem> */}
      </Carousel>
    </div>
  )
}

export default DoctorCarousel

// import React from 'react'
// import DoctorCarouselCard from './DoctorCarouselCard'
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

// const responsive = {
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 1,
//       slidesToSlide: 1 // optional, default to 1.
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 1,
//       slidesToSlide: 1 // optional, default to 1.
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//       slidesToSlide: 1 // optional, default to 1.
//     }
// };

// const DoctorCarousel = () => {

//     const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
//         const { carouselState: { currentSlide } } = rest;
//         return (
//           <div className="absolute top-[96%] left-1/2 md:left-[40%] transform -translate-x-1/2 -translate-y-1/2"> 
//             <div className="space-x-5 flex items-center">
//                 <button className={`${currentSlide === 0 ? 'disable bg-green border-green scale-[1.2]' : 'border-[1px] border-grey '} h-3 w-3 md:h-[12px] md:w-[12px] rounded-full`} onClick={() => goToSlide(0)} />
//                 <button className={`${currentSlide === 1 ? 'disable bg-green border-green scale-[1.2]' : 'border-[1px] border-grey '} h-3 w-3 md:h-[12px] md:w-[12px] rounded-full`} onClick={() => goToSlide(1)} />
//                 <button className={`${currentSlide === 2 ? 'disable bg-green border-green scale-[1.2]' : 'border-[1px] border-grey '} h-3 w-3 md:h-[12px] md:w-[12px] rounded-full`} onClick={() => goToSlide(2)} />
//             </div>
//           </div>
//         );
//     };

//     return (
//         <Carousel
//             showDots={false}
//             arrows={false}
//             responsive={responsive}
//             customButtonGroup={<ButtonGroup />}
//             className="h-[30rem] md:h-[18rem]"
//             itemClass='md:p-8'
//             >
//             <DoctorCarouselCard />
//             <DoctorCarouselCard />
//             <DoctorCarouselCard />
//         </Carousel>
//   )
// }

// export default DoctorCarousel
