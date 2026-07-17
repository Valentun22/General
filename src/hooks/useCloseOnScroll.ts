import {useEffect, useRef} from "react";

export function useCloseOnScroll(isOpen: boolean, onClose: () => void, threshold: number = 15) {
    const startScrollY = useRef(0);

    useEffect(() => {
        if (!isOpen) return;

        startScrollY.current = window.scrollY;

        const raf = requestAnimationFrame(() => {
            startScrollY.current = window.scrollY;
        });

        const handleScroll = () => {
            if (Math.abs(window.scrollY - startScrollY.current) > threshold) {
                onClose();
            }
        };

        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isOpen, onClose, threshold]);
}