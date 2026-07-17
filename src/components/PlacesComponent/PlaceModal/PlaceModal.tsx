import {FC, useCallback, useEffect, useState} from "react";
import React from "react";
import {useTranslation} from "react-i18next";
import {createPortal} from "react-dom";
import {motion, AnimatePresence} from "motion/react";
import css from './PlaceModal.module.css';
import {IPlaceInterface} from "../../../interfaces/IPlaceInterface";
import {IconInstagram, IconLocation, IconMenu, IconPhone, IconWeb} from "../../../icons/icons";
import {useScrollLock} from "../../../hooks/useScrollLock";
import {useKeyboardNav} from "../../../hooks/useKeyboardNav";
import {useSwipe} from "../../../hooks/useSwipe";
import {ButtonCloseComponent} from "../../ButtonsComponents/CloseButtonComponent/ButtonCloseComponent";
import {ModalLightbox} from "../../ModalLightBoxComponent/ModalLightBox";
import {LazyImage} from "../../LazyImageComponent/LazyImage";

const SWIPE_MAX_WIDTH = 500;

interface IProps {
    places: IPlaceInterface[];
    currentIndex: number;
    onIndexChange: (i: number) => void;
    onClose: () => void;
    open: boolean;
}

const PlaceModal: FC<IProps> = ({open, places, currentIndex, onIndexChange, onClose}) => {
    const {t} = useTranslation();
    const place = places[currentIndex];
    const [fullIndex, setFullIndex] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isSwipeAllowed, setIsSwipeAllowed] = useState(false);
    const total = places.length;
    const directionRef = React.useRef(1);

    useEffect(() => {
        setFullIndex(null);
    }, [currentIndex]);

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${SWIPE_MAX_WIDTH}px)`);
        const update = () => setIsSwipeAllowed(mql.matches);
        update();
        mql.addEventListener('change', update);
        return () => mql.removeEventListener('change', update);
    }, []);

    const prevPlace = useCallback(() => {
        if (isAnimating) return;
        directionRef.current = -1;
        setIsAnimating(true);
        onIndexChange(currentIndex > 0 ? currentIndex - 1 : total - 1);
    }, [currentIndex, total, onIndexChange, isAnimating]);

    const nextPlace = useCallback(() => {
        if (isAnimating) return;
        directionRef.current = 1;
        setIsAnimating(true);
        onIndexChange(currentIndex < total - 1 ? currentIndex + 1 : 0);
    }, [currentIndex, total, onIndexChange, isAnimating]);

    useKeyboardNav(fullIndex === null, prevPlace, nextPlace, onClose);

    const placeSwipe = useSwipe(prevPlace, nextPlace);

    const swipeProps = isSwipeAllowed ? {
        onPointerDown: placeSwipe.onPointerDown,
        onPointerMove: placeSwipe.onPointerMove,
        onPointerUp: placeSwipe.onPointerUp,
        onClickCapture: placeSwipe.onClickCapture,
    } : {};

    const contentVariants = {
        initial: (dir: number) => ({
            x: dir > 0 ? 28 : -28,
            opacity: 0,
            scale: 0.985,
            filter: 'blur(6px)',
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
                duration: 0.75,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            },
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -28 : 28,
            opacity: 0,
            scale: 0.985,
            filter: 'blur(6px)',
            transition: {
                duration: 0.12,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            },
        }),
    };

    useScrollLock(open);

    return createPortal(
        <div className={css.overlay} onClick={onClose}>

            <button
                className={css.placeNavPrev}
                disabled={isAnimating}
                onClick={e => {
                    e.stopPropagation();
                    (e.currentTarget as HTMLButtonElement).blur();
                    prevPlace();
                }}
            >
                ‹
            </button>

            <div
                className={css.modal}
                onClick={e => e.stopPropagation()}
                {...swipeProps}
            >
                <ButtonCloseComponent onClose={onClose}/>

                <AnimatePresence mode="popLayout" custom={directionRef.current} initial={false}>
                    <motion.div
                        key={currentIndex}
                        custom={directionRef.current}
                        variants={contentVariants}
                        initial="initial"
                        animate="center"
                        exit="exit"
                        transition={{
                            duration: 0.4,
                            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                        }}
                        onAnimationComplete={() => setIsAnimating(false)}
                        style={{willChange: 'transform, opacity, filter'}}
                    >
                        <div className={css.header}>
                            <div>
                                <span className={css.category}>{place.category}</span>
                                <h2 className={css.name}>{place.name}</h2>
                            </div>
                        </div>

                        <div className={css.top}>
                            {place.mainImg && (
                                <LazyImage
                                    src={place.mainImg}
                                    alt={place.name}
                                    wrapperClassName={css.mainImgWrap}
                                />
                            )}

                            <div className={css.info}>
                                {(Array.isArray(place.description) ? place.description : [place.description]).map((para, i) => (
                                    <p key={i} className={css.description}>{para}</p>
                                ))}

                                <div className={css.contacts}>
                                    <div className={css.contactItem}>
                                        <span className={css.contactIcon}><IconLocation/></span>
                                        <a>{place.address}</a>
                                    </div>
                                    {place.phone && (
                                        <div className={css.contactItem}>
                                            <span className={css.contactIcon}><IconPhone/></span>
                                            <a href={`tel:${place.phone}`} className={css.contactLink}>
                                                {place.phone}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={css.links}>
                            <a href={place.mapUrl} target="_blank" rel="noreferrer" className={css.linkBtn}>
                                <IconLocation/> Google Maps
                            </a>
                            {place.menuUrl && (
                                <a href={place.menuUrl} target="_blank" rel="noreferrer" className={css.linkBtn}>
                                    <IconMenu/> {t('placeModal.menu')}
                                </a>
                            )}
                            {place.websiteUrl && (
                                <a href={place.websiteUrl} target="_blank" rel="noreferrer" className={css.linkBtn}>
                                    <IconWeb/> {t('placeModal.site')}
                                </a>
                            )}
                            {place.instagramUrl && (
                                <a href={place.instagramUrl} target="_blank" rel="noreferrer"
                                   className={`${css.linkBtn} ${css.linkBtnInstagram}`}>
                                    <IconInstagram/> Instagram
                                </a>
                            )}
                        </div>

                        {place.gallery.length > 0 && (
                            <div className={css.gallery}>
                                <h3 className={css.galleryTitle}>{t('modals.photo')}</h3>
                                <div className={css.galleryGrid}>
                                    {place.gallery.map((photo, i) => (
                                        <LazyImage
                                            key={i}
                                            src={photo}
                                            alt={`${place.name} ${i + 1}`}
                                            wrapperClassName={css.galleryItem}
                                            onClick={() => setFullIndex(i)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <button
                className={css.placeNavNext}
                disabled={isAnimating}
                onClick={e => {
                    e.stopPropagation();
                    (e.currentTarget as HTMLButtonElement).blur();
                    nextPlace();
                }}
            >
                ›
            </button>

            <button
                className={css.mobileNavPrev}
                disabled={isAnimating}
                onClick={e => {
                    e.stopPropagation();
                    (e.currentTarget as HTMLButtonElement).blur();
                    prevPlace();
                }}
            >
                ‹
            </button>
            <button
                className={css.mobileNavNext}
                disabled={isAnimating}
                onClick={e => {
                    e.stopPropagation();
                    (e.currentTarget as HTMLButtonElement).blur();
                    nextPlace();
                }}
            >
                ›
            </button>

            {fullIndex !== null && (
                <ModalLightbox
                    photos={place.gallery}
                    index={fullIndex}
                    onClose={() => setFullIndex(null)}
                    onChangeIndex={setFullIndex}
                />
            )}
        </div>
        , document.body);
};

export {PlaceModal};