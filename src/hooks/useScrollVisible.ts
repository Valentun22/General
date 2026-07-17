import { useState, useEffect } from "react";

export const useScrollVisible = () => {
    const [visible, setVisible] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 300);
            setHasScrolled(true);
        };

        window.addEventListener('scroll', onScroll);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setVisible(window.scrollY > 300);
                setHasScrolled(true);
            });
        });

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return { visible, hasScrolled };
};