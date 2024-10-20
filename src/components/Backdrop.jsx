import React from 'react'
import ReactDOM from 'react-dom'

const Backdrop = ({ handleClick, zIndex }) => {
  return ReactDOM.createPortal(
          <div
            onClick={handleClick}
            className={`${zIndex ? zIndex : "z-20"} h-full w-full fixed inset-0 bg-gray-600 bg-opacity-50`}
          ></div>,
          document.getElementById("backdrop")
    )
}

export default Backdrop