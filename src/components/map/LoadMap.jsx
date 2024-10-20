import React, { useRef, useEffect, useState } from 'react'
import customAxios from '../../utils/CustomAxios';

const key = process.env.REACT_APP_MAP_API_KEY

const LoadMap = ({ address }) => {
  const ref = useRef();

  const [isErrored, setIsErrored] = useState(false)
  
  useEffect(() => {
    (async () => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`)
        const result = await response.json()
        if(result.status === 'OK'){
            const coordinates = result.results[0].geometry.location
            const map = new window.google.maps.Map(ref.current, {
                center: new window.google.maps.LatLng(coordinates.lat,coordinates.lng),
                zoom: 100,
                mapTypeControl: false,
                streetViewControl: false
              });
            new window.google.maps.Marker({
                position: new window.google.maps.LatLng(coordinates.lat,coordinates.lng),
                map: map,
                title: address
            });
        }else{
            setIsErrored(true)
        }
    })()
  }, [])

  if(isErrored){
    return <div className='w-full text-center'>
        <h1>Location doesnt exists</h1>
    </div>
  }

  return <div ref={ref} id="map" style={{ height: "100%", width: "100%"}}/>;
  
}

export default LoadMap