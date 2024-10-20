import React from 'react'
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toggleSearchDrawer } from '../redux/sidebar';
import Filter from './Filter'
import Image from './Image';

const MobileSearchDrawer = ({ handleChange }) => {
    const isOpen = useSelector(state => state.sidebar.showSearchDrawer)
    const dispatch = useDispatch()
    return (
        <>
            {
                isOpen && ReactDOM.createPortal(
                    <div
                        className={`block md:hidden fixed min-h-[100vh] w-[100vw]  inset-0 z-40 bg-white ease-in-out transition-all duration-300`}
                    >
                        <div className="relative h-full overflow-y-scroll scrollbar-hide">
                            <button
                                onClick={() => dispatch(toggleSearchDrawer())}
                                className="absolute right-5 top-5 bg-gray-100 h-11 w-11 flex items-center justify-center rounded-full"
                            >
                                <Image
                                    src={'/icons/Cross.png'}
                                    staticUrl={require("../assets/images/icons/Cross.png")}
                                    className="h-4"
                                    alt="cross"
                                />
                            </button>
                            <div className="absolute top-20 pb-10 w-full">
                                <Filter drawer/>
                            </div>
                        </div>
                    </div>,
                    document.getElementById('portal')
                )
            }
        </>
    )
}

export default MobileSearchDrawer