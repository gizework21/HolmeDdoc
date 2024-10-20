import React from 'react'
import Banner from './Banner'
import AboutHolmeddoc from './AboutHolmeddoc'
import OurMission from './OurMission'
import OurPartners from './OurPartners'
import Team from './Team'
import OurApproach from './OurApproach'

const AboutUs = () => {
  return (
    <div className="w-full flex justify-center max-w-[100vw] overflow-hidden">
      <div className='max-w-[1600px]'>
          <Banner />
          <AboutHolmeddoc />
          <OurApproach />
          <Team />
          <OurMission />
          <OurPartners />
      </div>
    </div>
  )
}

export default AboutUs