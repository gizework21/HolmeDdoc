import React, { useCallback, useEffect, useState } from "react";
import SkeletonLoader from "./SkeletonLoader";

const ImageLazy = ({ src, ...props }) => {
  const [imgSrc, setSrc] = useState(src);
  const [imageLoaded, setImageLoaded] = useState(false)

  // console.log(imageLoaded, Date.now())

  const onLoad = useCallback(() => {
    setSrc(src);
    setImageLoaded(true)
  }, [src]);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.addEventListener("load", onLoad);
    return () => {
      img.removeEventListener("load", onLoad);
    };
  }, [src, onLoad]);

  return imageLoaded ? <img {...props} alt={imgSrc} src={imgSrc} /> : <SkeletonLoader 
    height={props.height}
    width={props.width}
    rounded={props.rounded}
    {...props}
  />;
};

export default ImageLazy