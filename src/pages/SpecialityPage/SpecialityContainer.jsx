import React from "react";
import useImageCache from "../../hooks/useImageCache";
import ComplexSvgContainer from "../../components/ComplexSvgContainer";
import Image from "../../components/Image";

const SpecialityContainer = ({ title, description, img_url, id, seo_url }) => {
  let titleHeight = "h-[4.5rem] ";
  let height = "h-full lg:h-[32rem]";

  // if ([6, 7, 8, 27, 28, 29, 30].includes(key) && isMdScreen) {
  //   titleHeight += " md:h-[13rem]";
  //   height = "md:h-[28rem]";
  // }

  // if ([6, 7, 8].includes(key) && isLgScreen) {
  //   titleHeight += " lg:h-[13rem]";
  //   height = "lg:h-[28rem]";
  // }

  // if ([8, 9, 10, 11].includes(key)) {
  titleHeight += " xl:h-[11rem]";
  // height += " xl:h-[28rem]";
  // }


  const imgUrl = useImageCache(img_url);
  return (
    <div className="align-center w-full">
      <ComplexSvgContainer
        name={title}
        id={id}
        details={description}
        width={"md:max-w-[22.8rem]"}
        height={height}
        titleHeight={titleHeight}
        seo_url={seo_url}
        shadowOnHover
        customPadding={"md:pl-5 md:pr-2"}
      >
        <div className="h-[6rem] w-[6.2rem] sm:w-auto md:h-[5rem]  lg:min-h-[9.5rem] md:self-start">
          <Image
            fullSrcUrl={imgUrl}
            className="h-full object-contain"
            alt="speciality"
            staticUrl={require('../../assets/images/specialities/Default.png')}

          />
        </div>
      </ComplexSvgContainer>
    </div>
  )
}


export default SpecialityContainer;
