import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom'
import GreenButton from './GreenButton'
import Image from './Image'

export default function LogoutModal({ showPortal, closePortal, logout }) {
    return (<>
        {showPortal && ReactDOM.createPortal(
            <div className="h-[16rem] w-[94vw] sm:w-[32rem] fixed inset-x-[50%] translate-x-[-50%] top-[30%] bg-white rounded-md z-50">
                <div className="w-full h-full relative flex flex-col items-center justify-center">
                    <Image onClick={closePortal} src={'/login/Close.png'} staticUrl={require("../assets/images/Login/Close.png")} alt="cancel" className="h-4 absolute right-6 top-6 cursor-pointer" />
                    {/* <img src={require("../assets/images/icons/UnAuthenticated.png")} alt="success" className="h-32 mt-8" /> */}
                    <h1 className="text-size-11 sm:text-size-12 text-green font-medium font-basic-sans-regular tracking-[3px] mt-4">Logout</h1>
                    <span className='text-gray-700 text-size-6 sm:text-size-6 mt-1 mb-6'>Are you sure you want to logout?</span>
                    <div className='flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4'>
                        {/* <button onClick={closePortal} className={`border-green border w-[10rem] h-[2.8rem]  text-green py-1 rounded-full font-basic-sans-regular text-size-3 z-10  font-medium tracking-[0.5px]`}>
                            NO
                        </button>
                        <button onClick={logout} className={`bg-green w-[10rem] h-[2.8rem] text-white  py-1 rounded-full font-basic-sans-regular text-size-3 z-10 btn-wordspace  font-medium tracking-[0.5px]`}>
                            YES
                        </button> */}
                        <GreenButton outline additionalStyles={"font-black border-[1px]"} handleClick={closePortal}>NO</GreenButton>
                        <GreenButton  additionalStyles={"font-black border-[1px]"} handleClick={logout}>YES</GreenButton>
                    </div>
                </div>
            </div>,
            document.getElementById('portal')
        )}
        {showPortal && ReactDOM.createPortal(
            <div onClick={closePortal} className="h-full w-full fixed inset-0 bg-gray-600 bg-opacity-50 z-40">
            </div>,
            document.getElementById('backdrop')
        )}
    </>)
}