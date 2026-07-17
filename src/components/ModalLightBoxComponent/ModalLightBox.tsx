import React, {FC, useCallback, useRef} from "react";
import {createPortal} from "react-dom";
import {motion, AnimatePresence} from "motion/react";
import {useKeyboardNav} from "../../hooks/useKeyboardNav";
import {useSwipe} from "../../hooks/useSwipe";
import {ButtonCloseComponent} from "../ButtonsComponents/CloseButtonComponent/ButtonCloseComponent";
import css from './ModalLightBox.module.css';

interface IProps {
    photos: string[];
    index: number;
    onClose: () => void;
    onChangeIndex: (index: number) => void;
}

const slideVariants = {
    initial: (dir: number) => ({
        x: dir > 0 ? '60%' : '-60%',
        opacity: 0,
        scale: 0.92,
    }),
    animate: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (dir: number) => ({
        x: dir > 0 ? '-60%' : '60%',
        opacity: 0,
        scale: 0.92,
    }),
};

const ModalLightbox: FC<IProps> = ({photos, index, onClose, onChangeIndex}) => {
    const total = photos.length;
    const directionRef = useRef(1);

    const prev = useCallback(() => {
        directionRef.current = -1;
        onChangeIndex((index - 1 + total) % total);
    }, [index, total, onChangeIndex]);

    const next = useCallback(() => {
        directionRef.current = 1;
        onChangeIndex((index + 1) % total);
    }, [index, total, onChangeIndex]);

    useKeyboardNav(true, prev, next, onClose);

    const swipe = useSwipe(prev, next);

    return createPortal(
        <div
            className={css.fullOverlay}
            onClick={(e) => {
                e.stopPropagation();
                onClose();
            }}
        >
            <ButtonCloseComponent onClose={onClose}/>

            <button
                className={css.fullPrev}
                onClick={(e) => {
                    e.stopPropagation();
                    (e.currentTarget as HTMLButtonElement).blur();
                    prev();
                }}
            >
                ‹
            </button>

            <div
                className={css.imgWrapper}
                onPointerDown={swipe.onPointerDown}
                onPointerMove={swipe.onPointerMove}
                onPointerUp={swipe.onPointerUp}
                onClickCapture={swipe.onClickCapture}
                onClick={(e) => e.stopPropagation()}
                style={{touchAction: 'pinch-zoom', cursor: 'grab', overflow: 'hidden'}}
            >
                <AnimatePresence mode="popLayout" custom={directionRef.current}>
                    <motion.img
                        key={index}
                        src={photos[index]}
                        alt="full"
                        className={css.fullImg}
                        draggable={false}
                        custom={directionRef.current}
                        variants={slideVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{
                            x: {type: 'spring', stiffness: 320, damping: 34, mass: 0.9},
                            opacity: {duration: 0.22},
                            scale: {duration: 0.28},
                        }}
                    />
                </AnimatePresence>
            </div>

            <button
                className={css.fullNext}
                onClick={(e) => {
                    e.stopPropagation();
                    (e.currentTarget as HTMLButtonElement).blur();
                    next();
                }}
            >
                ›
            </button>

            <motion.div
                className={css.counter}
                key={index}
                initial={{opacity: 0, y: 6}}
                animate={{opacity: 0.7, y: 0}}
                transition={{duration: 0.3}}
            >
                {index + 1} / {total}
            </motion.div>
        </div>
        , document.body);
};

export {ModalLightbox};