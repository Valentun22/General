import {useRef, useState, useEffect} from "react";

const useAnimateOnScroll = (delay: number = 0) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setVisible(true), delay);
                    observer.disconnect();
                }
            },
            {threshold: 0.1, rootMargin: '0px 0px -20px 0px'}
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [delay]);

    return {ref, visible};
};

export {useAnimateOnScroll};