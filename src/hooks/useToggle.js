import { useState } from "react";

export default function useToggle(defaultValue = true){
    const [state, setState] = useState(defaultValue)

    const toggle = (value) => {
        if(typeof value == "boolean") { 
            setState(value)
            return  
        }
        setState(s => !s)
    } 

    return [state, toggle]
}