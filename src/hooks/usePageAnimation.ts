import {useEffect, useRef} from "react";


const usePageAnimation = (cssVisible: string) => {
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        const delay = el.dataset.delay ?? '0';
                        setTimeout(() => {
                            el.classList.add(cssVisible);
                        }, Number(delay));
                        observerRef.current?.unobserve(el);
                    }
                });
            },
            {threshold: 0.12}
        );

        document.querySelectorAll('[data-anim]').forEach((el) => {
            observerRef.current?.observe(el);
        });

        return () => observerRef.current?.disconnect();
    }, [cssVisible]);
};

export {usePageAnimation};