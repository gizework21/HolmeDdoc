import { useRef, useEffect } from 'react'

export default function usePreviousValue(value, defaultValue){
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current ?? defaultValue;
}