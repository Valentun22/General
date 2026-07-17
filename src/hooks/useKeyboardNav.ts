import {useEffect} from "react";

export const useKeyboardNav = (isOpen: boolean, onPrev: () => void, onNext: () => void, onClose: () => void) => {
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') onPrev();
            else if (e.key === 'ArrowRight') onNext();
            else if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen, onPrev, onNext, onClose]);
};