import React from 'react'
import Container from '../components/Container'
import DoctorCarousel from '../components/DoctorCarousel' 
import Image from '../components/Image'
import LandingPageTitle from './LandingPageTitle'

const HolisticPractitioners = () => {
  return (
    <Container>
        <div className='w-full space-y-16 flex flex-col justify-center md:justify-start lg:justify-center md:flex-row items-center md:space-x-[5rem] lg:space-x-[8rem] xl:space-x-[4rem] md:space-y-0'>
            <div className='space-y-[1.9rem] lg:basis-[40%] xl:basis-[45%]'>
                <LandingPageTitle>
                    <div className='hidden md:block'>
                        Featured Holistic Practitioners
                    </div>
                    <div className="md:hidden">
                        Featured Holistic
                        <br className="md:hidden"/>
                        Practitioners
                    </div>
                </LandingPageTitle>
                <div className='max-w-full md:w-[28rem] lg:w-[32rem] xl:w-[40rem]'>
                    <DoctorCarousel />
                </div>
            </div>
            <div className='flex-1 md:hidden lg:block lg:self-center'>
                {/* h-full */}
                <Image src={'/home/Tree.png'} className='h-[12rem] md:h-[26rem] lg:h-[28rem] xl:h-[32rem] 2xl:h-[36rem] object-contain' staticUrl={require("../assets/images/home/Tree.png")} alt="prac" />
            </div>
        </div>
    </Container>
  )
}

export default HolisticPractitioners