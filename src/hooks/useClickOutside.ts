import {RefObject, useEffect} from "react";

export function useClickOutside(
    refs: Array<RefObject<HTMLElement | null>>,
    handler: () => void,
    isOpen: boolean = true
) {
    useEffect(() => {
        if (!isOpen) return;
        const handleOutside = (e: MouseEvent | TouchEvent) => {
            const target = e.target as Node;
            const inside = refs.some(r => r.current?.contains(target));
            if (!inside) handler();
        };
        document.addEventListener('mousedown', handleOutside);
        document.addEventListener('touchstart', handleOutside);
        return () => {
            document.removeEventListener('mousedown', handleOutside);
            document.removeEventListener('touchstart', handleOutside);
        };
    }, [refs, handler, isOpen]);
}