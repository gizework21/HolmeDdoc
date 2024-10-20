import React, { useEffect, useState } from 'react'

export default function DoctorImage({ src, alt, className }){
  const [imgSrc, setImgSrc] = useState()  

  useEffect(() => {
    setImgSrc(src)
  }, [src])

  const handleError = (error) => {
    const defaultImage = require('../assets/images/profile/DoctorDefault.png')
    setImgSrc(defaultImage)
  }

  return (
    <img
        src={imgSrc}
        className={className}
        onError={handleError}
        alt={alt}
    />
  )
}
