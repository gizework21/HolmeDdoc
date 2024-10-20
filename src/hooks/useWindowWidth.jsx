import { useEffect, useState } from "react"

export default function useWindowWidth(){
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    useEffect(() => {
      window.addEventListener('resize', handleResize)
  
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [windowWidth])
    const isSmallScreen = windowWidth < 768
    const isMdScreen = windowWidth >= 768 && windowWidth < 1024
    const isLgScreen = windowWidth >= 1024 && windowWidth < 1280 
    const isLargeScreen = windowWidth >= 1280
    return {windowWidth, isSmallScreen, isLargeScreen, isMdScreen, isLgScreen}
}