import React from 'react'
import Process from '../assets/images/home/OurProcess.png'
import Find from '../assets/images/home/SearchPlus.svg'
import Book from '../assets/images/home/BookNew.svg'
import Office from '../assets/images/home/OfficeNew.svg'
import Container from '../components/Container'
import LandingPageTitle from './LandingPageTitle'
import Image from '../components/Image'
const processes = [
    {
        id: 1,
        title: 'Find Holistic Practitioners',
        description: 'Search based on speciality and select the doctor you wish to continue with.',
        btnText: 'See Providers',
        img: Find,
        base : '/home/Find.png'
    },
    {
        id: 2,
        title: 'Book appointment',
        description: 'Select the date and time based on availability and book the appointment.',
        btnText: 'See Availability',
        img: Book,
        base : '/home/Book.png'

    },
    {
        id: 3,
        title: 'Office / Telehealth',
        description: 'Join either online/ Visit the clinic as per the appointment with essential medical data.',
        btnText: 'Consult',
        img: Office,
        base : '/home/Office.png'
    },
]

const OurProcess = () => {
    return (
        <Container bgColor={"white"}>
            <LandingPageTitle>Our Process</LandingPageTitle>
            <div className='grid md:grid-cols-8 items-center justify-items-center md:justify-items-start md:gap-x-5 xl:gap-x-1  text-black pt-5 md:py-10'>
                <Image src={'/home/OurProcess.png'} staticUrl={Process} alt="Pratice" className="h-full hidden md:block md:col-span-3 md:w-[90%] lg:w-[80%] BtnLgXl:w-[98%] xl:w-[90%] object-contain" />
                <div className="w-full md:space-y-6 lg:space-y-12 md:col-span-5 mb-5">
                    <div className='pb-4'>
                        <h1 className='text-size-11 font-medium text-gray-800 md:text-size-12 xl:text-[2.4rem] xl:leading-[3rem] pb-3 text-center md:text-left font-basic-sans-regular'>Instant appointment with Holistic Practitioners</h1>
                        <p className='text-size-6 md:text-size-7 text-paragraphColor text-center md:text-left'>Get onboarded and allow us to connect you with a holistic practitioner near you!</p>
                    </div>
                    <div className='w-full grid grid-flow-row md:grid-flow-col md:grid-cols-3 gap-10 justify-center md:justify-between h-full mt-5 md:mt-0'>  
                        {
                            processes.map((el, idx) => 
                                {
                                    let style = 'h-[4rem] md:h-[3.5rem] lg:h-[4.6rem] '

                                    if(idx === 1){
                                        style += ' w-[3.8rem] md:w-[3.2rem] lg:w-[4.2rem]'
                                    }else{
                                        style += ' w-[4rem] md:w-[3.5rem] lg:w-[4.6rem]'
                                    }

                                    return (<div className='flex flex-col h-full w-full' key={el.id}>
                                        <div className={`flex flex-col items-center md:items-start justify-between space-y-[30px] w-[70vw] pb-5 md:pb-0 md:w-auto  md:space-y-[40px] lg:space-y-[52px] ${idx !== 2 && 'md:border-r border-b border-b-gray-300 md:border-b-0'} md:pr-3 h-full text-gray-900`}>
                                            <div className='md:self-start relative'>
                                                <h1 className='font-bold text-[45px] md:text-[35px] lg:text-[45px] px-2 tracking-[8px] font-basic-sans-regular'>0{el.id}</h1>
                                                <div className='h-5 md:h-4 lg:h-5 w-[70px] md:w-[60px] lg:w-[70px] bg-blueBg -mt-[36px] md:-mt-[28px] lg:-mt-[36px]'></div>
                                            </div>
                                            <div className={`md:self-start object-cover`}>
                                                <Image
                                                    src={el.base}
                                                    staticUrl={el.img}
                                                    className={style}
                                                    alt="speciality"
                                                />
                                            </div>
                                            <div className='xl:w-[16rem] h-full'>
                                                <h1 className='text-size-7 md:text-[1rem] lg:text-size-10 xl:text-small font-light font-basic-sans-regular'>{el.title}</h1>
                                            </div>
                                        </div>
                                    </div>)
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default OurProcess