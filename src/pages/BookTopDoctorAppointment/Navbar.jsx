import React, { useState } from 'react'
import Logo from "../../assets/images/home/Logo.png";
import CityModal from '../../components/CityModal';
import MobileMenu from '../../components/MobileMenu';
import { useNavigate } from 'react-router-dom'
import { MakeAppointment, AboutUs, Home } from "../../data/urls"
import NavbarAuthOption from '../../components/NavbarAuthOption';
import Image from '../../components/Image';

const Navbar = () => {
    const [ showModal, setShowModal ] = useState(false)
    let [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    function closeModal() {
        setIsOpen(false);
    }
    
    function openModal() {
        setIsOpen(true);
    }
    return (
        <>
        <div
            className={`px-6 md:px-2 lg:px-2 xl:px-4 text-slate-700  bg-white z-20 
     h-[20vh] short:h-[7rem] drop-shadow-lg flex justify-between items-center`}
        >
            <div className='h-full py-1'>
                <Image
                    src={'/icons/Logo.png'}
                    staticUrl={Logo}
                    alt="logo"
                    className="h-full cursor-pointer"
                    onClick={() => navigate(Home)}
                />
            </div>
            <div className="md:flex flex-row justify-between items-center  hidden mx-10  text-gray-900 ">
                <div className="flex items-center justify-between ">
                    <div onClick={() => navigate(MakeAppointment)} className="font-basic-sans-regular font-semibold text-xs lg:text-navbarLg   tracking-[.15rem] cursor-pointer ">
                        MAKE AN APPOINTMENT
                    </div>
                    <div className="xl:mx-6 mx-2 text-gray-400">|</div>
                    <div
                        onClick={() => setShowModal(true)}
                        className="font-basic-sans-regular font-semibold text-xs lg:text-navbarLg tracking-[.15rem]  cursor-pointer"
                    >
                        BROWSE
                    </div>
                    <div className="xl:mx-6 mx-2 text-gray-400">|</div>
                    <div
                        className="font-basic-sans-regular font-semibold text-xs lg:text-navbarLg tracking-[.15rem]  cursor-pointer"
                        onClick={() => navigate(AboutUs)}
                    >
                        ABOUT US
                    </div>
                    <div className="xl:mx-6 mx-2 text-gray-400">|</div>
                    <NavbarAuthOption />
                </div>
            </div>
            <MobileMenu 
                isOpen={isOpen}
                closeModal={closeModal}
                openModal={openModal}
                logoHidden
            />
        </div>
        <CityModal 
            isModalVissible={showModal}
            closeModal={() => setShowModal(false)}
        />
        </>
    )
}

export default Navbar