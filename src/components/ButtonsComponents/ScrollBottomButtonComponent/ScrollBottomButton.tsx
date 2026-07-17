import React, { FC, useRef } from "react";
import css from './ScrollBottomButton.module.css';

const ScrollBottomButton: FC = () => {
    const btnRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        let el: HTMLElement | null = btnRef.current;
        while (el && el.parentElement) {
            el = el.parentElement;
            const style = window.getComputedStyle(el);
            if (style.height && parseInt(style.height) >= window.innerHeight * 0.9) {
                const bottom = el.getBoundingClientRect().bottom + window.scrollY;
                window.scrollTo({ top: bottom, behavior: 'smooth' });
                return;
            }
        }
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <div
            ref={btnRef}
            className={css.arrow}
            onClick={handleClick}
        />
    );
};

export {ScrollBottomButton};