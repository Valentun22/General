import { useState, useCallback, useRef, useEffect } from 'react';

export function usePressFlash(duration = 200) {
    const [isPressed, setIsPressed] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const flash = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsPressed(true);
        timeoutRef.current = setTimeout(() => {
            setIsPressed(false);
        }, duration);
    }, [duration]);

    return { isPressed, flash };
}