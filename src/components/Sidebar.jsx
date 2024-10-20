import React, { useState } from 'react'
import Logo from "../assets/images/profile/Logo.png";
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../redux/sidebar'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChangePassword, Home, Login, MyAppointment, MyProfile } from '../data/urls';
import DeleteAccountModal from './DeleteAccountModal';
import { signOut } from '../redux/auth/auth.reducer';
import LogoutModal from "./LogoutModal";
import Image from './Image';

const menuItems = [
    {
        id : 1,
        title: 'My Profile',
        url: MyProfile,
        type: 'url'
    },
    {
        id: 2,
        title: 'My Appointments',
        url: MyAppointment,
        type: 'url'
    },
    {
        id: 3,
        title: 'Change Password',
        url: ChangePassword,
        type: 'url'
    },
    {
        id: 4,
        title: 'Delete Account',
        type: 'button'
    },
    {
        id: 5,
        title: 'Sign out',
        type: 'button'
    },
]

const Sidebar = () => {
    const showSidebar = useSelector(state => state.sidebar.showSidebar)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentPath = useLocation().pathname
    const [showModal, setShowModal] = useState(false)
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const handleMenuItemClicked = (item) => {
        if(item.type === "button"){
            if(item.id === 4){
                setShowModal(true)
            }else{
                setShowLogoutModal(true)
            }
        }else{
            navigate(item.url)
            dispatch(toggleSidebar())
        }
    }

    const logout = () => {
        setShowLogoutModal(false)
        dispatch(signOut())
        navigate(Login)
    }

    return (
        <>
            {/* {showSidebar &&  <Backdrop handleClick={() => dispatch(toggleSidebar())} zIndex={"z-10"}/> } */}
            <div className={`bg-green text-white fixed transition ease-in-out delay-50 ${
                showSidebar
                ? "translate-x-[0%] z-30 md:z-20 md:basis-[12rem]"
                : "-translate-x-[102%] z-50 basis-0"
            } lg:w-0 lg:translate-x-[0%] lg:z-20 lg:static md:basis-[15rem] h-screen hidden md:block`}
            >
                <div className='h-full w-full flex flex-col items-center justify-between py-[2rem]'>
                    <div className='h-[7rem]'>
                        <Image
                            src={'/home/Logo.png'}
                            staticUrl={Logo}
                            alt=""
                            className="bg-transparent cursor-pointer h-[100%]"
                            onClick={() => navigate(Home)}
                        />
                    </div>
                    <ul className='flex flex-col space-y-1 text-[1rem] w-full'>
                        {
                            menuItems.map(item => 
                                <li key={item.id} onClick={() => handleMenuItemClicked(item)} className={`px-[3rem] py-[0.5rem] ${currentPath.startsWith(item.url) && 'bg-white text-green'} hover:bg-white hover:text-green cursor-pointer`}>
                                    {item.title}
                                </li>      
                            )
                        }
                    </ul>
                </div>
            </div>
            <DeleteAccountModal 
                showModal={showModal}
                closeModal={() => setShowModal(false)}
            />
            <LogoutModal showPortal={showLogoutModal} logout={logout} closePortal={() => setShowLogoutModal(false)}/>
        </>
    )
}

export default Sidebar
