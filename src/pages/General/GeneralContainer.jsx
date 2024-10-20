import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import Image from '../../components/Image.jsx'
import { Home } from '../../data/urls.js'
import NewFooter from '../../parts/NewFooter'
import { setFacebook, setInstagram, setPrivacyPolicy, setTermsOfUse, setTwitter } from '../../redux/generalSettings/generalSettings.js'
import { getGeneralSettings } from '../../services/master.js'

const GeneralContainer = () => {

  return (
    <>
        <Link to={Home}>
            <Image src={'/icons/Logo.png'} staticUrl={require('../../assets/images/home/Logo.png')} alt="logo" className="h-[8rem] mx-auto md:ml-4 mt-2"/>
        </Link>
        <div className='px-5 md:px-20 lg:px-44 mb-20'>
            <Outlet />
        </div>
        <NewFooter />
    </>
  )
}    

export default GeneralContainer