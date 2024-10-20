import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Home  } from '../data/urls'
import { deleteProfile } from '../services/master'
import Backdrop from './Backdrop'
import GreenButton from './GreenButton'
import {signOut} from '../redux/auth/auth.reducer'
import Image from './Image'

export default function DeleteAccountModal({ showModal, closeModal }) {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleDelete = async() =>{
        const result = await deleteProfile()
        dispatch(signOut())
        navigate('/')
    }

    return (<>
        {showModal && ReactDOM.createPortal(
            <div className="h-[20rem] w-[95%] md:w-[30rem] fixed inset-x-[50%] translate-x-[-50%] top-[28%] bg-white rounded-md z-50">
                <div className="w-full h-full relative flex flex-col justify-center items-center px-5">
                    <Image src={'/icons/Cross.png'} onClick={closeModal} staticUrl={require("../assets/images/Login/Close.png")} alt="cancel" className="h-3 absolute right-4 top-4 cursor-pointer" />
                    <h1 className="text-2xl text-center text-black font-medium font-basic-sans-regular tracking-[2.6px] mt-4">Are you sure you want to delete your account?</h1>
                    <span className='text-gray-600 text-center text-size-6 font-thin px-12 py-1 mt-1 mb-6'>Your account and all of its data will be permanently deleted.</span>
                    <div className='flex items-center space-x-5'>
                        <GreenButton  additionalStyles={"font-black border-[1px]"} handleClick={closeModal}>No</GreenButton>
                        <GreenButton outline additionalStyles={"font-black border-[1px]"} handleClick={handleDelete}>Yes</GreenButton>
                    </div>
                </div>
            </div>,
            document.getElementById('portal')
        )}
        {showModal && <Backdrop
            handleClick={closeModal} 
            zIndex={"z-40"}
        />}
    </>)
}