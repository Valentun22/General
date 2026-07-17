import {FC, useState, useCallback} from "react";
import React from "react";
import css from './PhotoGalleryComponent.module.css';
import {motion} from 'motion/react';
import photo1 from '../../img/photo_gallery/photo_1-5/photo1.jpg';
import photo2 from '../../img/photo_gallery/photo_1-5/photo2.jpg';
import photo3 from '../../img/photo_gallery/photo_1-5/photo3.jpg';
import photo4 from '../../img/photo_gallery/photo_1-5/photo4.jpg';
import photo5 from '../../img/photo_gallery/photo_1-5/photo5.jpg';
import photo6 from '../../img/photo_gallery/photo_6-11/photo6.jpg';
import photo7 from '../../img/photo_gallery/photo_6-11/photo7.jpg';
import photo8 from '../../img/photo_gallery/photo_6-11/photo8.jpg';
import photo9 from '../../img/photo_gallery/photo_6-11/photo9.jpg';
import photo10 from '../../img/photo_gallery/photo_6-11/photo10.jpg';
import photo11 from '../../img/photo_gallery/photo_6-11/photo11.jpg';
import photo12 from '../../img/photo_gallery/photo_12-16/photo12.jpg';
import photo13 from '../../img/photo_gallery/photo_12-16/photo13.jpg';
import photo14 from '../../img/photo_gallery/photo_12-16/photo14.jpg';
import photo15 from '../../img/photo_gallery/photo_12-16/photo15.jpg';
import photo16 from '../../img/photo_gallery/photo_12-16/photo16.jpg';
import {useKeyboardNav} from "../../hooks/useKeyboardNav";
import {useSwipe} from "../../hooks/useSwipe";
import {ModalLightbox} from "../ModalLightBoxComponent/ModalLightBox";
import {useScrollLock} from "../../hooks/useScrollLock";

const rows = [
    [photo1, photo2, photo3, photo4, photo5],
    [photo6, photo7, photo8, photo9, photo10, photo11],
    [photo12, photo13, photo14, photo15, photo16],
];

const allPhotos = rows.flat();

const MobileCarousel: FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const total = allPhotos.length;

    const toPrev = useCallback(() => setActiveIndex(prev => (prev - 1 + total) % total), [total]);
    const toNext = useCallback(() => setActiveIndex(prev => (prev + 1) % total), [total]);

    const closeLightbox = useCallback(() => setLightboxIndex(null), []);

    useKeyboardNav(lightboxIndex !== null, () => {
    }, () => {
    }, closeLightbox);
    useScrollLock(lightboxIndex !== null);

    const carouselSwipe = useSwipe(toPrev, toNext);

    const getVisibleSlides = () => {
        const slides = [];
        for (let offset = -2; offset <= 2; offset++) {
            const index = (activeIndex + offset + total) % total;
            slides.push({index, offset});
        }
        return slides;
    };


    return (
        <div className={css.carouselWrap}>
            <div
                className={css.carouselStage}
                onPointerDown={carouselSwipe.onPointerDown}
                onPointerMove={carouselSwipe.onPointerMove}
                onPointerUp={carouselSwipe.onPointerUp}
                onClickCapture={carouselSwipe.onClickCapture}
                style={{touchAction: 'pan-y'}}
            >
                {getVisibleSlides().map(({index, offset}) => (
                    <motion.div
                        key={index}
                        className={css.carouselSlide}
                        animate={{
                            rotateY: offset * 55,
                            x: `${offset * 85}%`,
                            scale: offset === 0 ? 1 : 0.82,
                            opacity: Math.abs(offset) === 2 ? 0.4 : 1,
                            zIndex: 10 - Math.abs(offset),
                        }}
                        transition={{type: 'spring', bounce: 0.05, duration: 0.7}}
                        style={{perspective: 1000}}
                        onClick={() => offset === 0 ? setLightboxIndex(index) : (offset < 0 ? toPrev() : toNext())}
                    >
                        <img src={allPhotos[index]} alt="" draggable={false}/>
                    </motion.div>
                ))}
            </div>

            <div className={css.carouselControls}>
                <button className={css.carouselBtn} onClick={toPrev}>‹</button>
                <div className={css.carouselDots}>
                    {allPhotos.map((_, i) => (
                        <div
                            key={i}
                            className={`${css.dot} ${i === activeIndex ? css.dotActive : ''}`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
                <button className={css.carouselBtn} onClick={toNext}>›</button>
            </div>

            {lightboxIndex !== null && (
                <ModalLightbox
                    photos={allPhotos}
                    index={lightboxIndex}
                    onClose={closeLightbox}
                    onChangeIndex={setLightboxIndex}
                />
            )}
        </div>
    );
};


const galleryContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.07,
            delayChildren: 0.1,
        },
    },
};

const PhotoGalleryComponent: FC = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleClose = useCallback(() => setSelectedIndex(null), []);

    useKeyboardNav(selectedIndex !== null, () => {
    }, () => {
    }, handleClose);
    useScrollLock(selectedIndex !== null);

    return (
        <>
            <motion.div
                className={css.gallery}
                variants={galleryContainerVariants}
                initial="hidden"
                animate="visible"
            >
                {rows.map((row, ri) => {
                    const rowOffset = rows.slice(0, ri).reduce((acc, r) => acc + r.length, 0);
                    return (
                        <div key={ri} className={`${css.row} ${ri % 2 === 1 ? css.rowOffset : ''}`}>
                            {row.map((photo, i) => {
                                const flatIndex = rowOffset + i;
                                const isDimmed = hoveredIndex !== null && hoveredIndex !== flatIndex;
                                return (
                                    <motion.div
                                        key={i}
                                        className={css.imgWrapper}
                                        onClick={() => setSelectedIndex(flatIndex)}
                                        onMouseEnter={() => setHoveredIndex(flatIndex)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        <img src={photo} alt="" className={isDimmed ? css.imgDimmed : ''}/>
                                    </motion.div>
                                );
                            })}
                        </div>
                    );
                })}
            </motion.div>

            <div className={css.mobileGallery}>
                <MobileCarousel/>
            </div>

            {selectedIndex !== null && (
                <ModalLightbox
                    photos={allPhotos}
                    index={selectedIndex}
                    onClose={handleClose}
                    onChangeIndex={setSelectedIndex}
                />
            )}
        </>
    );
};

export {PhotoGalleryComponent};