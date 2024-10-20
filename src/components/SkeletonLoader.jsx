import React from 'react'

const SkeletonLoader = ({ height, width, rounded, className }) => {
  // console.log(`border-2 ${height} ${width} ${rounded} ${className}`)
  return (
    <div className={`border-2 ${height} ${width} ${rounded} ${className}`}>
      <div className={`animate-pulse bg-gray-300 w-full h-full ${rounded}`}>
      </div>
    </div>
  )
}

export default SkeletonLoader