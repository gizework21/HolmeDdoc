import { useEffect, useRef, useState, useCallback }  from 'react'

export default function useEnableArrowKeys({ bifurcatedOptions, options, onSelect, searchTerm  }){
    const [cursor, setCursor] = useState(0)
    const selectRef = useRef(null)

    const selectedItemRef = selectRef?.current?.querySelector(".active-dropdown-item");
    if (selectedItemRef) {
        selectedItemRef?.scrollIntoView({
        top: 20,
        behavior: "smooth",
        block: "nearest"
      });
    }

    useEffect(() => {
        setCursor(0)
    },[searchTerm])

    const handleKeyDown = useCallback((e) => {
        const optionsLength = bifurcatedOptions ? ((options?.[0]?.options?.length ?? 0 ) + (options?.[1]?.options?.length ?? 0)) : options?.length 
        if(optionsLength === 0){
            return
        }
        if(e.key === "ArrowUp" && cursor > 0){
            selectRef.current.scrollTop -= 26
            setCursor(c => c-1)
        }else if(e.key === "ArrowDown" && cursor < optionsLength-1){
            selectRef.current.scrollTop += 26
            setCursor(c => c+1)
        }else if(e.key === "Enter"){
            if(!bifurcatedOptions){
                onSelect(options[cursor])
            }else{
                // cursor <= options[0].options.length (when search from api)
                if(cursor < options[0].options.length){
                    onSelect(options[0].options[cursor])
                }else{
                    const selectedIndex = cursor - options[0].options.length
                    console.log(options[1].options[selectedIndex], selectedIndex)
                    onSelect(options[1].options[selectedIndex])
                }
            }
        }
    }, [options, cursor])

    return {
        handleKeyDown,
        scrollContainerRef: selectRef,
        cursor
    }
}