import {RefObject, useEffect, useState} from "react";

interface IOptions {
    /** максимальний час очікування (мс), щоб прелоадер не завис назавжди */
    timeout?: number;
}

/**
 * Слідкує за всіма <img> в переданому контейнері і повертає true,
 * коли всі вони завантажились (або видали помилку), чи спрацював timeout.
 * Якщо фото вже в кеші браузера — resolve відбувається практично миттєво.
 */
const useImagesLoaded = (
    containerRef: RefObject<HTMLElement | null>,
    deps: unknown[] = [],
    options: IOptions = {}
): boolean => {
    const {timeout = 6000} = options;
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false);
        let cancelled = false;

        const container = containerRef.current;
        if (!container) {
            setLoaded(true);
            return;
        }

        const imgs = Array.from(container.querySelectorAll("img"));
        if (imgs.length === 0) {
            setLoaded(true);
            return;
        }

        let remaining = imgs.length;

        const finish = () => {
            if (!cancelled) setLoaded(true);
        };

        const onOneDone = () => {
            remaining -= 1;
            if (remaining <= 0) finish();
        };

        imgs.forEach((img) => {
            if (img.complete) {
                onOneDone();
                return;
            }
            img.addEventListener("load", onOneDone, {once: true});
            img.addEventListener("error", onOneDone, {once: true});
        });

        const timer = window.setTimeout(finish, timeout);

        return () => {
            cancelled = true;
            window.clearTimeout(timer);
            imgs.forEach((img) => {
                img.removeEventListener("load", onOneDone);
                img.removeEventListener("error", onOneDone);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return loaded;
};

export {useImagesLoaded};
