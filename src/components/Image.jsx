import React, { useEffect, useState } from "react";

export const Url = process.env.REACT_APP_CUSTOM_NODE_ENV === 'production' ? "https://holmedddoc-static.s3.us-west-1.amazonaws.com" : "https://holmeddoc-static.s3.ap-south-1.amazonaws.com"

export default function Image({ src, fullSrcUrl, alt, className, staticUrl, onClick }) {
  const baseUrl =
  fullSrcUrl ? fullSrcUrl :`${Url}${src}`;

  const [imgSrc, setImgSrc] = useState();

  useEffect(() => {
    setImgSrc(baseUrl);
  }, [src, fullSrcUrl]);

  const handleError = (error) => {
    // const defaultImage = require(staticUrl);
    const defaultImage = staticUrl;
    setImgSrc(defaultImage);
  };

  return (
    <img src={imgSrc} onClick={onClick} className={className} onError={handleError} alt={alt} />
  );
}