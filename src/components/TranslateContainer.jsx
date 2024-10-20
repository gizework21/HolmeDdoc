import React from 'react'
import { useSelector } from 'react-redux'

const TranslateContainer = (WrappedComponent) => {
    return function Wrapper(){
        const isMobileMenuOpen = useSelector(state => state.sidebar.showMobileMenu)
        const isFilterDrawerOpen = useSelector(state => state.sidebar.showFilterDrawer)

        return (
            <div className={`${isMobileMenuOpen ? 'translate-x-[-100%] md:translate-x-0' : 'translate-x-0'} ${(isMobileMenuOpen || isFilterDrawerOpen) && 'h-[100vh] overflow-hidden'} ${isFilterDrawerOpen && 'opacity-0 transition-all'} duration-300`}>
                <WrappedComponent />
            </div>
        )
    }
}

export default TranslateContainer