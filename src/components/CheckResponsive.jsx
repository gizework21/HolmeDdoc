

import { XMarkIcon, CameraIcon } from '@heroicons/react/20/solid'
import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

const  InsuranceConstant = [
    {
        id : 1,
        title: "I'll choose an insurance later"
    },
    {
        id: 2,
        title: "I'm paying for myself"
    }
]

const InitialState = {id :null, title: ''}

const SelectInsurance = ({ plans, carriers, isSmallScreen }) => {
    const [focus, setFocus] = useState(false)
    const [carrier, setCarrier] = useState(InitialState)
    const [plan, setPlan] = useState(InitialState)
    const [step, setStep] = useState(0)
    const [insuranceValue, setInsuranceValue] = useState('')
    const [isInsuranceSelected, setIsInsuranceSelected] = useState(true)
    const [selectedInsurance, setSelectedInsurance] = useState(InsuranceConstant[0].title)
    const searchEl = useRef()
    const searchInputEl = useRef()
    const [showBtn, setShowBtn] = useState(false)
    const [fullScreen, setFullScreen] = useState(false)

    // console.log(isInsuranceSelected, showBtn)


    const filteredCarriers = insuranceValue ? [carriers.reduce((acc, item) => {
        acc.title = 'Matches'
        const filtered = item.options.filter(option => option.title.toLowerCase().includes(insuranceValue.toLowerCase()))
        acc.options = [...acc.options, ...filtered]
        return acc
    }, { title: '', options: [] })] : carriers

    const filteredPlans = insuranceValue ? [plans.reduce((acc, item) => {
        acc.title = 'Matches'
        const filtered = item.options.filter(option => option.title.toLowerCase().includes(insuranceValue.toLowerCase()))
        acc.options = [...acc.options, ...filtered]
        return acc
    }, { title: '', options: [] })] : plans

    const hideSearchOptions = (e) => {
        if (!searchEl.current.contains(e.target)) {
            setFocus(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', hideSearchOptions, true)

        return () => {
            window.removeEventListener('click', hideSearchOptions, true)
        }
    }, [])

    useEffect(() => {

        const keyDown = (e) => {
            // console.log(e)

            if (e.keyCode === 8) return //Backspace
            //set showBtn to false
            setShowBtn(false)
            // console.log(e)
            //test
            // setIsInsuranceSelected(false)
            // setPlan('')
            // if(step === 0) return
            // setStep(0)
            // setCarrier('')
            // console.log(plan, carrier)
            if(plan.id && carrier.id){
                setPlan(InitialState)
                setCarrier(InitialState)
                setStep(0)
                setIsInsuranceSelected(false)
            }else if(carrier.id){
                setPlan(InitialState)
                // setStep(1)
                setIsInsuranceSelected(false)
            }else{
                setPlan(InitialState)
                // setCarrier(InitialState)
                setIsInsuranceSelected(false)
            }
            
            // setPlan('')
            // setCarrier('')
            // setStep(0)
            // setIsInsuranceSelected(false)
        }
        //for hiding button while user is typing searchTerm
        searchInputEl.current.addEventListener('keydown', keyDown)

        return () => {
            searchInputEl.current.removeEventListener('keydown', keyDown)
        }
    }, [])

    useEffect(() => {
        if (!insuranceValue) {
            //set showBtn to true
            setShowBtn(true)
            return 
        }
        if(showBtn && insuranceValue){
            setShowBtn(false)
        }
    }, [insuranceValue])

    const handleCarrierSelected = (seletedCarrier) => {
        setInsuranceValue('')
        setCarrier(seletedCarrier)
        setStep(1)
    }

    const handlePlanSelected = (selectedPlan) => {
        setPlan(selectedPlan)
        setFocus(false)
        setInsuranceValue(`${carrier.title}-${selectedPlan.title}`)
        setSelectedInsurance(`${carrier.title}-${selectedPlan.title}`)
        setIsInsuranceSelected(true)
        setFullScreen(false)
    }

    const handleChangeInsuranceClick = () => {
        setPlan(InitialState)
        setCarrier(InitialState)
        setStep(0)
        setInsuranceValue('')
        setIsInsuranceSelected(false)
    }

    const handleNoInsuranceSelected = (item) => {
        setSelectedInsurance(item)
        handleSelectPreviousInsurance(item)
    }

    const handleSelectPreviousInsurance = (prevInsurance) => {
        //when insurance was selected before but input was clicked again and then same 
        //insurance selected again which was selected previously
        setInsuranceValue(prevInsurance)
        setIsInsuranceSelected(true)
        setFocus(false)
        setFullScreen(false)
    }

    const handleFocus = () => {
        setInsuranceValue('')
        if (focus) return
        setFocus(true)
        //768 is md
        if (isSmallScreen) {
            setFullScreen(true)
        }
    }

    useEffect(() => {
        if (!isSmallScreen) {
            setFullScreen(false)
        }else{
            setIsInsuranceSelected(false) //test on small if removed message vissible
        }
    }, [isSmallScreen])

    const removeShowFullScreen = () => {
        setFullScreen(false)
        setFocus(false)
    }

    return (
        <>
            {fullScreen && isSmallScreen && ReactDOM.createPortal(<div ref={searchEl} className="w-full h-full fixed top-0 bg-white px-3 overflow-y-auto overflow-x-hidden" onFocus={(e) => setFocus(true)}>
                <button onClick={removeShowFullScreen} className='w-full flex items-center justify-end p-2'><XMarkIcon className='h-5 w-5 text-primary' /></button>
                <div>
                    <button className='text-primary w-full py-4 flex flex-col items-center border-2 border-primary'>
                        <h1 className='text-xl font-semibold'>Scan your insurance card</h1>
                        <h5 className='text-sm mt-1'>Automatically Detect your plan name</h5>
                        <div className='bg-yellow-300 p-5 rounded-full mt-5'>
                            <CameraIcon className='h-8 w-8' />
                        </div>
                    </button>
                    <div className='flex items-center py-5'>
                        <div className='h-[1px] w-full bg-gray-200'></div>
                        <span className='text-gray-600 text-lg mx-1'>or</span>
                        <div className='h-[1px] w-full bg-gray-200'></div>
                    </div>
                    <h1 className='text-primary text-center pb-5'>Choose manually</h1>
                </div>
                <div className="relative">
                    <input ref={searchInputEl} value={insuranceValue} onFocus={() => setInsuranceValue('')} onChange={e => setInsuranceValue(e.target.value)} type="text" className="bg-white border border-gray-300 text-gray-900 sm:text-sm  block w-full pl-5 p-[16px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Insurance carrier and plan" />
                </div>
                {focus &&
                    <div className="absolute mt-1 px-6 w-full  rounded-md bg-white py-1 text-base sm:text-sm">
                        {!isInsuranceSelected && showBtn && <div className='flex items-center justify-center py-2'>
                            <button className={`${step === 0 ? 'border border-primary bg-primary text-white' : 'bg-transparent border border-primary text-primary'} py-2 px-4 w-full`} onClick={() => setStep(0)}>1. Choose carrier</button>
                            <button className={`${step === 1 ? 'border border-primary bg-primary text-white' : 'bg-transparent border border-primary text-primary'} py-2 px-4 w-full`} disabled={!carrier.id} onClick={() => setStep(1)}>2. Choose plan</button>
                        </div>}
                        {!!carrier.id && !isInsuranceSelected && <h1 className='text-2xl pb-2 text-primary'>{carrier.title}</h1>}
                        {isInsuranceSelected && <h1 className='py-2 text-primary hover:bg-pink-50 cursor-pointer' onClick={() => handleSelectPreviousInsurance(selectedInsurance)}>{selectedInsurance}</h1>}
                        {isInsuranceSelected && <button className='text-blue-500 py-2 border-t-2 w-full flex hover:underline' onClick={handleChangeInsuranceClick}>choose a differnet insurance</button>}
                        {!isInsuranceSelected && <div className='overflow-auto'>
                            {step === 0 && showBtn && !isInsuranceSelected && <h1 className='mb-2 text-primary hover:bg-pink-50 cursor-pointer' onClick={() => handleNoInsuranceSelected("I'm paying for myself")}>{"I'm paying for myself"}</h1>}
                            {step === 0 && showBtn && !isInsuranceSelected && <h1 className='mb-2 text-primary hover:bg-pink-50 cursor-pointer' onClick={() => handleNoInsuranceSelected("I'll choose my insurance later")}>{"I'll choose my insurance later"}</h1>}
                            {
                                step === 0 && filteredCarriers.map(item =>
                                    <div key={item.id} className="mb-2">
                                        <h1 className='text-gray-500' >{item.title}</h1>
                                        <div>
                                            {item.options.map(option => <h6 className={`relative cursor-default mt-1 select-none ${carrier.title === option.title ? 'bg-pink-50 font-medium text-red-500' : 'text-primary'
                                                } hover:bg-pink-50`} onClick={() => handleCarrierSelected(option)} key={option.id}>{option.title}</h6>)}
                                        </div>
                                    </div>
                                )
                            }
                            {
                                step === 1 && filteredPlans.map(item =>
                                    <div key={item.id} className="mb-2">
                                        <h1 className='text-gray-500 text-size-6'>{item.title}</h1>
                                        <div>
                                            {item.options.map(option => <h6 className={`relative cursor-default mt-1 select-none ${plan.title === option.title ? 'bg-pink-50 font-medium text-red-500' : 'text-primary'
                                                } hover:bg-pink-50`} onClick={() => handlePlanSelected(option)} key={option.id}>{option.title}</h6>)}
                                        </div>
                                    </div>
                                )
                            }
                        </div>}
                    </div>
                }
            </div>, document.getElementById('portal'))}
            {!fullScreen && <div ref={searchEl} className="w-full md:w-[32.5%] relative" onFocus={(e) => setFocus(true)}>
                <div className="border-b md:border-t py-2 relative w-full cursor-default overflow-hidden  bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className='h-5 w-5 text-primary' xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14"><g fill="currentColor" fill-rule="nonzero"><path stroke="currentColor" d="M19.087 1c.228 0 .413.185.413.413v11.565a.413.413 0 0 1-.413.413H.913a.413.413 0 0 1-.413-.413V1.413C.5 1.185.685 1 .913 1h18.174zm-.413.826H1.326v10.74h17.348V1.825z"></path><path stroke="currentColor" stroke-width=".5" d="M10.781 5.13h5.154c.203 0 .368-.184.368-.413 0-.228-.165-.413-.368-.413H10.78c-.203 0-.368.185-.368.413 0 .229.165.413.368.413zM10.781 7.609h5.154c.203 0 .368-.185.368-.413 0-.228-.165-.413-.368-.413H10.78c-.203 0-.368.185-.368.413 0 .228.165.413.368.413zM10.781 10.087h5.154c.203 0 .368-.185.368-.413 0-.228-.165-.413-.368-.413H10.78c-.203 0-.368.185-.368.413 0 .228.165.413.368.413z"></path><path d="M6.808 6.458h1.19a.34.34 0 0 1 .34.339v.844a.34.34 0 0 1-.34.34h-1.19v1.23a.34.34 0 0 1-.34.339h-1.01a.34.34 0 0 1-.338-.34V7.98H3.927a.34.34 0 0 1-.34-.339v-.844a.34.34 0 0 1 .34-.34H5.12V5.14a.34.34 0 0 1 .339-.339h1.01a.34.34 0 0 1 .339.34v1.318z"></path></g></svg>
                    </div>
                    <input ref={searchInputEl} value={insuranceValue} onFocus={handleFocus} onChange={e => setInsuranceValue(e.target.value)} type="text" className="w-full border-none outline-none py-2 pr-3 pl-10 text-sm leading-5 focus:ring-0 text-primary" placeholder="Insurance carrier and plan" />
                </div>
                {focus &&
                    <div className="absolute top-12 -left-10 mt-1 px-6 min-w-[30rem] rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {!isInsuranceSelected && showBtn && <div className='flex items-center justify-center py-2'>
                            <button className={`${step === 0 ? 'border border-primary bg-primary text-white' : 'bg-transparent border border-primary text-primary'} py-2 px-4 w-full`} onClick={() => setStep(0)}>1. Choose carrier</button>
                            <button className={`${step === 1 ? 'border border-primary bg-primary text-white' : 'bg-transparent border border-primary text-primary'} py-2 px-4 w-full`} disabled={!carrier.id} onClick={() => setStep(1)}>2. Choose plan</button>
                        </div>}
                        {!!carrier.id && !isInsuranceSelected && <h1 className='text-2xl pb-2 text-primary'>{carrier.title}</h1>}
                        {isInsuranceSelected && <h1 className='py-2 text-primary hover:bg-pink-50 cursor-pointer' onClick={() => handleSelectPreviousInsurance(selectedInsurance)}>{selectedInsurance}</h1>}
                        {isInsuranceSelected && <button className='text-blue-500 py-2 border-t-2 w-full flex hover:underline' onClick={handleChangeInsuranceClick}>choose a differnet insurance</button>}
                        {!isInsuranceSelected && <div className='overflow-auto max-h-60 '>
                            {step === 0 && showBtn && !isInsuranceSelected && <h1 className='mb-2 text-primary hover:bg-pink-50 cursor-pointer' onClick={() => handleNoInsuranceSelected("I'm paying for myself")}>{"I'm paying for myself"}</h1>}
                            {step === 0 && showBtn && !isInsuranceSelected && <h1 className='mb-2 text-primary hover:bg-pink-50 cursor-pointer' onClick={() => handleNoInsuranceSelected("I'll choose my insurance later")}>{"I'll choose my insurance later"}</h1>}
                            {
                                step === 0 && filteredCarriers.map(item =>
                                    <div key={item.id} className="mb-2">
                                        <h1 className='text-gray-500' >{item.title}</h1>
                                        <div>
                                            {item.options.map(option => <h6 className={`relative cursor-default mt-1 select-none ${carrier.title === option.title ? 'bg-pink-50 font-medium text-red-500' : 'text-primary'
                                                } hover:bg-pink-50`} onClick={() => handleCarrierSelected(option)} key={option.id}>{option.title}</h6>)}
                                        </div>
                                    </div>
                                )
                            }
                            {
                                step === 1 && filteredPlans.map(item =>
                                    <div key={item.id} className="mb-2">
                                        <h1 className='text-gray-500 text-size-6'>{item.title}</h1>
                                        <div>
                                            {item.options.map(option => <h6 className={`relative cursor-default mt-1 select-none ${plan.title === option.title ? 'bg-pink-50 font-medium text-red-500' : 'text-primary'
                                                } hover:bg-pink-50`} onClick={() => handlePlanSelected(option)} key={option.id}>{option.title}</h6>)}
                                        </div>
                                    </div>
                                )
                            }
                        </div>}
                    </div>
                }
            </div>}
        </>

    )
}

export default SelectInsurance




// import React, { useState, useRef, useEffect } from 'react'

// const SelectInsurance = ({ plans, carriers }) => {
//     const [focus, setFocus] = useState(false)
//     const [carrier, setCarrier] = useState('')
//     const [plan, setPlan] = useState('')
//     const [step, setStep] = useState(0)
//     const [insuranceValue, setInsuranceValue] = useState('')
//     const [isInsuranceSelected, setIsInsuranceSelected] = useState(true)
//     const [selectedInsurance, setSelectedInsurance] = useState("I'll choose an insurance later")
//     const searchEl = useRef()
//     const searchInputEl = useRef()
//     const [showBtn, setShowBtn] = useState(false)

//     const filteredCarriers = insuranceValue ? [carriers.reduce((acc, item) => {
//         acc.title = 'Matches'
//         const filtered = item.options.filter(option => option.title.startsWith(insuranceValue))
//         acc.options = [...acc.options, ...filtered]
//         return acc
//     },{title: '', options: []})] : carriers

//     const filteredPlans = insuranceValue ? [plans.reduce((acc, item) => {
//         acc.title = 'Matches'
//         const filtered = item.options.filter(option => option.title.startsWith(insuranceValue))
//         acc.options = [...acc.options, ...filtered]
//         return acc
//     },{title: '', options: []})] : plans

//     const hideSearchOptions = (e) => {
//         if(!searchEl.current.contains(e.target)){
//             setFocus(false)
//         }
//     }
        
//     useEffect(() => {
//         window.addEventListener('click', hideSearchOptions, true)

//         return () => {
//             window.removeEventListener('click', hideSearchOptions, true)
//         }
//     }, [])

//     useEffect(() => {

//         const keyDown = (e) => {
//             if(e.keyCode === 8) return //Backspace
//             //set showBtn to false
//             setShowBtn(false)
//             // setIsInsuranceSelected(false)
//         }

//         //for hiding button while user is typing searchTerm
//         searchInputEl.current.addEventListener('keydown', keyDown)

//         return () => {
//             searchInputEl.current.removeEventListener('keydown', keyDown)
//         }
//     }, [])

//     useEffect(() => {
//         if(!insuranceValue){
//             //set showBtn to true
//             setShowBtn(true)
//         }
//     }, [insuranceValue])

//     const handleCarrierSelected = (seletedCarrier) => {
//         setInsuranceValue('')
//         setCarrier(seletedCarrier)
//         setStep(1)
//     }

//     const handlePlanSelected = (selectedPlan) => {
//         setPlan(selectedPlan)
//         setFocus(false)
//         setInsuranceValue(`${carrier}-${selectedPlan}`)
//         setSelectedInsurance(`${carrier}-${selectedPlan}`)
//         setIsInsuranceSelected(true)
//     }

//     const handleChangeInsuranceClick = () => {
//         setPlan('')
//         setCarrier('')
//         setStep(0)
//         setInsuranceValue('')
//         setIsInsuranceSelected(false)
//     }

//     const handleSelectPreviousInsurance = (prevInsurance) => {
//         //when insurance was selected before but input was clicked again and then same 
//         //insurance selected again which was selected previously
//         setInsuranceValue(prevInsurance)
//         setIsInsuranceSelected(true)
//         setFocus(false)
//     }


//     return (
//         <div ref={searchEl} className="w-full md:w-[32.5%]" onFocus={(e) => setFocus(true)}>
//             <div className="relative">
//                 <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
//                     <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
//                 </div>
//                 <input ref={searchInputEl} value={insuranceValue} onFocus={() => setInsuranceValue('')} onChange={e => setInsuranceValue(e.target.value)} type="text" className="bg-white border border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-[16px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Insurance carrier and plan" />
//             </div>
//             {focus && 
//                 <div className="absolute mt-1 px-6 min-w-[30rem] rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                     { !isInsuranceSelected && showBtn && <div className='flex items-center justify-center py-2'>
//                         <button className={`${step === 0 ? 'border border-primary bg-primary text-white' : 'bg-transparent border border-primary text-primary'} py-2 px-4 w-full`} onClick={() => setStep(0)}>1. Choose carrier</button>
//                         <button className={`${step === 1 ? 'border border-primary bg-primary text-white' : 'bg-transparent border border-primary text-primary'} py-2 px-4 w-full`} disabled={!carrier} onClick={() => setStep(1)}>2. Choose plan</button>
//                     </div>}
//                     {carrier && !isInsuranceSelected && <h1 className='text-2xl pb-2 text-primary'>{carrier}</h1>}
//                     {isInsuranceSelected && <h1 className='py-2 text-primary' onClick={() => handleSelectPreviousInsurance(selectedInsurance)}>{selectedInsurance}</h1>}
//                     {isInsuranceSelected && <button className='text-blue-500 py-2 border-t-2 w-full flex hover:underline' onClick={handleChangeInsuranceClick}>choose a differnet insurance</button>}
//                     { !isInsuranceSelected && <div className='overflow-auto max-h-60 '>
//                         {
//                             step === 0 && filteredCarriers.map(item => 
//                                 <div key={item.id} className="mb-2">
//                                     <h1 className='text-gray-500' >{item.title}</h1>
//                                     <div>
//                                         {item.options.map(option => <h6 className={`relative cursor-default mt-1 select-none ${carrier === option.title ? 'bg-pink-50 font-medium text-red-500' : 'text-primary'
//                                         } hover:bg-pink-50`} onClick={() => handleCarrierSelected(option.title)} key={option.id}>{option.title}</h6>)} 
//                                     </div>   
//                                 </div>
//                             )
//                         }
//                         {
//                             step === 1 && filteredPlans.map(item => 
//                                 <div key={item.id} className="mb-2">
//                                     <h1 className='text-gray-500 text-size-6'>{item.title}</h1>
//                                     <div>
//                                         {item.options.map(option => <h6 className={`relative cursor-default mt-1 select-none ${plan === option.title ? 'bg-pink-50 font-medium text-red-500' : 'text-primary'
//                                         } hover:bg-pink-50`} onClick={() => handlePlanSelected(option.title)} key={option.id}>{option.title}</h6>)} 
//                                     </div>   
//                                 </div>
//                             )
//                         }
//                     </div>}
//                 </div>
//             }
//         </div>
//     )
// }

// export default SelectInsurance











































// import React, { useState, useRef, useEffect } from 'react'
// import {  MagnifyingGlassIcon } from '@heroicons/react/20/solid'

// const CheckResponsive = ({ items, isSmallScreen }) => {
//     const [focus, setFocus] = useState(false)
//     const [selectedItem, setSelectedItem] = useState({ id: null, title: '' })
//     const [fullScreen, setFullScreen] = useState(false)
//     const searchEl = useRef()

//     const filteredItems = selectedItem.title ? [items.reduce((acc, item) => {
//         acc.title = 'Matches'
//         const filtered = item.options.filter(option => option.title.startsWith(selectedItem.title))
//         acc.options = [...acc.options, ...filtered]
//         return acc
//     },{title: '', options: []})] : items


//     const handleItemSelected = (item) => {
//         setSelectedItem(item)
//         setFocus(false)
//         setFullScreen(false)
//     }

//     const handleSearchTermChange = (e) => {
//         setSelectedItem(s => { return {id: null, title: e.target.value}})
//     }


//     const hideSearchOptions = (e) => {
//         if(!searchEl.current.contains(e.target)){
//             setFocus(false)
//         }
//     }
        
//     useEffect(() => {
//         window.addEventListener('click', hideSearchOptions, true)
//         return () => {
//             window.removeEventListener('click', hideSearchOptions, true)
//         }
//     }, [])

//     const handleFocus = () => {
//         setFocus(true) 
//         //768 is md
//         if(isSmallScreen) {
//             setFullScreen(true)
//         }
//     }

//     return (
//         <div ref={searchEl} className={`${fullScreen && 'fixed top-0 z-10 h-full'} w-full md:w-[32.5%]`} onFocus={handleFocus}>
//             <div className={`${fullScreen && 'flex'} border py-2 relative w-full cursor-default overflow-hidden  bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm`}>
//                 <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
//                     <MagnifyingGlassIcon
//                         className="h-5 w-5 text-gray-400"
//                         aria-hidden="true"
//                     />
//                 </div>
//                 <input value={selectedItem.title} onChange={handleSearchTermChange} type="text" className="w-full border-none outline-none py-2 pr-3 pl-10 text-sm leading-5 text-gray-900 focus:ring-0 text-primary" placeholder="Insurance carrier and plan" />
//                 <button onClick={() => {setFullScreen(false) 
//                     setFocus(false)}} className={`${fullScreen && focus ? 'visible' : 'hidden'}`}>Cancel</button>
//             </div>
//             {focus && 
//                 <div className={`absolute z-10 mt-1 px-6 h-full w-full md:max-h-60 md:w-[30rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
//                     <div>
//                         {
//                             filteredItems.map(item => 
//                                 <div key={item.id} className="mb-2">
//                                     <h1 className='text-gray-500' >{item.title}</h1>
//                                     <div>
//                                         {item.options.map(option => <h6 className={`relative cursor-default mt-1 select-none ${selectedItem.id === option.id ? 'bg-pink-50 font-medium text-red-500' : 'text-primary'
//                                         } hover:bg-pink-50`} onClick={() => handleItemSelected(option)} key={option.id}>{option.title}</h6>)} 
//                                     </div>   
//                                 </div>
//                             )
//                         }
//                     </div>
//                 </div>
//             }
//         </div>
//     )
// }

// export default CheckResponsive