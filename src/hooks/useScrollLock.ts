import {useEffect} from "react";

export const useScrollLock = (locked: boolean) => {
    useEffect(() => {
        if (!locked) return;

        const scrollY = window.scrollY;
        const originalOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";
        document.body.style.overflowY = 'scroll';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${scrollY}px`;

        return () => {
            document.body.style.overflowY = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            window.scrollTo(0, scrollY);
            document.body.style.overflow = originalOverflow;
        };
    }, [locked]);
};
