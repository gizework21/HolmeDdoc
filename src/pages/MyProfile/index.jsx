import React from 'react'
import Sidebar from '../../components/Sidebar'
import { Route, Routes} from "react-router-dom";
// import EditProfile from './EditProfile';
// import ProfileDetails from './ProfileDetails';
import { useDispatch, useSelector } from "react-redux"
import { toggleMobileMenu } from '../../redux/sidebar';
import { HiMenu } from "react-icons/hi";
import MobileMenu from '../../components/MobileMenu'

const EditProfile = React.lazy(() => import('./EditProfile'))
const ProfileDetails = React.lazy(() => import('./ProfileDetails'))

const MyProfile = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.auth.currentUser)
  
  return (
    <>
    <MobileMenu hideHam={true} logoHidden={true}/>
    <div className='md:h-screen flex  max-w-[100vw]'>
        <Sidebar />
        <div className='w-full lg:flex-1 md:h-[100vh] relative overflow-y-scroll tall:overflow-y-hidden'>
            <div className='lg:hidden absolute top-5 right-5' onClick={() => dispatch(toggleMobileMenu())}>
                <img
                src={require("../../assets/images/icons/Hamburger.png")}
                className="h-5"
                alt="ham"
              />
            </div>
            <Routes>
                <Route path='/' element={<ProfileDetails />} />
                <Route path='/edit' element={<EditProfile />}/>
            </Routes>
        </div>
    </div>
    </>
  )
}

export default MyProfile