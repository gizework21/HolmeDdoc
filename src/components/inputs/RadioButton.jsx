import { useRef, useEffect } from 'react'
import Label from './Label'
import ErrorMessage from '../ErrorMessage'
import useWindowWidth from '../../hooks/useWindowWidth'

export default function RadioButton({ value, selectOption, options, label, disabled, ...otherProps }) {
    const bgRef = useRef()

    const { isSmallScreen } = useWindowWidth()
    let LEFT_POSITION =  'translate-x-[2%]'
    let RIGHT_POSITION = 'translate-x-[98%]'


    let outerStyle = ' py-[0.8rem] md:py-[0.6rem] text-size-4'
    let innerStyle = 'h-[38px] md:h-[1.85rem]'

    if(otherProps.size === "large"){
        outerStyle = 'py-[1.1rem] text-size-6'
        innerStyle = 'h-[2.8rem]'
        LEFT_POSITION = isSmallScreen ? 'translate-x-[3.5%]' : 'translate-x-[2%]'
        RIGHT_POSITION = isSmallScreen ? 'translate-x-[96.5%]' : 'translate-x-[98%]'
    }


    useEffect(() => {
        if (value.id === 1) {
            bgRef.current.classList.remove(RIGHT_POSITION)
            bgRef.current.classList.add(LEFT_POSITION)
        } else if (value.id === 2) {
            bgRef.current.classList.remove(LEFT_POSITION)
            bgRef.current.classList.add(RIGHT_POSITION)
        }
    }, [value])

    const handleOptionSelected = (option) => {
        if(disabled) return
        if(value.id === option.id) return
        const classList = bgRef.current?.classList
        if (classList.contains(LEFT_POSITION)) {
            bgRef.current.classList.remove(LEFT_POSITION)
            bgRef.current.classList.add(RIGHT_POSITION)
        } else {
            bgRef.current.classList.remove(RIGHT_POSITION)
            bgRef.current.classList.add(LEFT_POSITION)
        }
        selectOption(option)
    }

    let borderColor = "";

    if (otherProps.errorMessage) {
      borderColor = "border-red-500";
    } else {
      borderColor = "border-green";
    }

    let width = 'lg:w-[95%]'
    if(otherProps.fullWidth){
        width = 'w-[100%]'
    }

    return (
        <div className={`flex h-[fit-content] flex-col w-full ${width}`}>
            {label && <Label label={label} fontColor={otherProps.labelFont}/>}
            <div className={`relative border-green border-[1px] w-full flex items-center ${outerStyle} cursor-pointer rounded-[0.2rem]`}>
                {
                    options.map((option, idx) =>
                        <div key={option.id} onClick={() => handleOptionSelected(option)} className={`${(value.id === option.id) && 'text-white rounded-md'} z-10  flex items-center justify-center text-center w-full capitalize h-5.5`}>
                            {option.title}
                        </div>
                    )
                }
                <div ref={bgRef} className={`absolute ${innerStyle} w-[50%] -z-1 bg-green transition-transform duration-400 ${LEFT_POSITION} rounded-[0.2rem]`}>
                </div>
            </div>
            <ErrorMessage errorMessage={otherProps.errorMessage} />
        </div>
    )
}