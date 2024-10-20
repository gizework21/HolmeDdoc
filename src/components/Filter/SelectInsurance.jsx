import { XMarkIcon, CameraIcon } from '@heroicons/react/20/solid'
import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import FilterInput from './FilterInput'
import FilterDropdownItem from '../FilterDropdownItem'

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
        }
    }, [isSmallScreen])

    const removeShowFullScreen = () => {
        setFullScreen(false)
        setFocus(false)
    }


    const searchTermChange = (e) => {
        setInsuranceValue(e.target.value)
        setShowBtn(false)
        if(plan.id && carrier.id){
            setPlan(InitialState)
            setCarrier(InitialState)
            setStep(0)
            setIsInsuranceSelected(false)
        }else if(carrier.id){
            setPlan(InitialState)
            setIsInsuranceSelected(false)
        }else{
            setPlan(InitialState)
            setIsInsuranceSelected(false)
        }
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
                    <input ref={searchInputEl} value={insuranceValue} onFocus={() => setInsuranceValue('')} onChange={searchTermChange} type="text" className="bg-white border border-gray-300 text-gray-900 sm:text-sm  block w-full pl-5 p-[16px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Insurance carrier and plan" />
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
                                            {item.options.map(option => 
                                                <FilterDropdownItem 
                                                    selectedId={carrier.id} 
                                                    key={option.id} 
                                                    option={option} 
                                                    handleItemSelected={handleCarrierSelected} 
                                                />
                                            )}
                                        </div>
                                    </div>
                                )
                            }
                            {
                                step === 1 && filteredPlans.map(item =>
                                    <div key={item.id} className="mb-2">
                                        <h1 className='text-gray-500 text-size-6'>{item.title}</h1>
                                        <div>
                                            {item.options.map(option => 
                                                <FilterDropdownItem 
                                                    selectedId={plan.id} 
                                                    key={option.id} 
                                                    option={option} 
                                                    handleItemSelected={handlePlanSelected} 
                                                />
                                            )}
                                        </div>
                                    </div>
                                )
                            }
                        </div>}
                    </div>
                }
            </div>, document.getElementById('portal'))}
            {!fullScreen && <div ref={searchEl} className="w-full relative" onFocus={(e) => setFocus(true)}>
                <FilterInput 
                    toggleFocus={() => {}}
                    title={"Select Insurance"}
                    handleFocus={handleFocus}
                    handleSearchTermChange={searchTermChange}
                    placeholder={"Insurance carrier and plan"}
                    value={insuranceValue}
                    refEl={searchInputEl}
                />
                {focus &&
                    <div className="absolute z-50 mt-1 px-6 min-w-[30rem] rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {!isInsuranceSelected && showBtn && <div className='flex items-center justify-center py-2'>
                            <button className={`${step === 0 ? 'border border-primary bg-primary text-white' : 'bg-transparent border border-primary text-primary'} py-3 px-4 w-full border-r-none`} onClick={() => setStep(0)}>1. Choose carrier</button>
                            <button className={`${step === 1 ? 'border border-primary bg-primary text-white' : 'bg-transparent border border-primary text-primary'} py-3 px-4 w-full relative border-l-none`} disabled={!carrier.id} onClick={() => setStep(1)}><span className={step === 0 ? 'clip_blue' : 'clip_white'}></span>2. Choose plan</button>
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
                                            {item.options.map(option => <FilterDropdownItem 
                                                    selectedId={carrier.id} 
                                                    key={option.id} 
                                                    option={option} 
                                                    handleItemSelected={handleCarrierSelected} 
                                                />
                                            )}
                                        </div>
                                    </div>
                                )
                            }
                            {
                                step === 1 && filteredPlans.map(item =>
                                    <div key={item.id} className="mb-2">
                                        <h1 className='text-gray-500 text-size-6'>{item.title}</h1>
                                        <div>
                                            {item.options.map(option => 
                                                <FilterDropdownItem 
                                                    selectedId={plan.id} 
                                                    key={option.id} 
                                                    option={option} 
                                                    handleItemSelected={handlePlanSelected} 
                                                />
                                            )}
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