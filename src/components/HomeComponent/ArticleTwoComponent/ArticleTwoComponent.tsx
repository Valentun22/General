import {FC, useState, useRef, useEffect} from "react";
import React from "react";
import {useTranslation} from "react-i18next";
import css from './ArticleTwoComponent.module.css';
import {Swiper, SwiperSlide} from 'swiper/react';
import type {Swiper as SwiperType} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Navigation, Pagination, Autoplay} from 'swiper/modules';
import {GiMountains, GiHotSurface, GiCampfire} from 'react-icons/gi';
import {MdOutlineWifi, MdOutlineLocalParking} from 'react-icons/md';
import {TbBolt, TbFence} from 'react-icons/tb';

import swiperOne from '../../../img/artTwoSwiper/swiperOne.jpg';
import swiperTwo from '../../../img/artTwoSwiper/swiperTwo.jpg';
import swiperThree from '../../../img/artTwoSwiper/swiperThree.jpg';
import swiperFour from '../../../img/artTwoSwiper/swiperFour.jpg';
import swiperFive from '../../../img/artTwoSwiper/swiperFive.jpg';
import swiperSix from '../../../img/artTwoSwiper/swiperSix.jpg';
import swiperSeven from '../../../img/artTwoSwiper/swiperSeven.jpg';
import swiperEighth from '../../../img/artTwoSwiper/swiperEighth.jpg';
import swiperNinth from '../../../img/artTwoSwiper/swiperNinth.jpg';
import swiperTenth from '../../../img/artTwoSwiper/swiperTenth.jpg';
import swiperEleventh from '../../../img/artTwoSwiper/swiperEleventh.jpg';
import artTwoBoxFive1 from "../../../img/artTwoBoxFive/artTwoBoxFive2.jpg";
import artTwoBoxFive2 from "../../../img/artTwoBoxFive/artTwoBoxFive1.jpg";
import {ScrollTopButton} from "../../ButtonsComponents/ScrollTopButtonComponent/ScrollTopButton";
import columOne from '../../../img/artTwoSwiper/paradise/columOne.jpg';
import columTwo from '../../../img/artTwoSwiper/paradise/columTwo.jpg';
import columThree from '../../../img/artTwoSwiper/paradise/columThree.jpg';
import columFour from '../../../img/artTwoSwiper/paradise/columFour.jpg';

import {HouseModal} from './CardModal/HouseModal/HouseModal';
import {KitchenModal} from './CardModal/KitchenModal/KitchenModal';
import {BathroomModal} from './CardModal/BathroomModal/BathroomModal';
import {TerritoryModal} from './CardModal/TerritoryModal/TerritoryModal';
import {ServicesComponent} from "../../ServicesComponent/ServicesComponent";
import {ServicesModal} from "./ServicesModal/ServicesModal";
import {usePressState} from "../../../hooks/usePressState";
import {CardTile} from "./CardTile/CardTile";

type SelectedCard = 'house' | 'kitchen' | 'bathroom' | 'territory' | null;

const ArticleTwoComponent: FC = () => {
    const {t} = useTranslation();
    const [modalOpen, setModalOpen] = useState(false);
    const [visibleCards, setVisibleCards] = useState<boolean[]>(() => Array(4).fill(false));
    const [selectedCard, setSelectedCard] = useState<SelectedCard>(null);

    const imgRef1 = useRef<HTMLImageElement | null>(null);
    const imgRef2 = useRef<HTMLImageElement | null>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const modalBtnPress = usePressState();
    const swiperInstanceRef = useRef<SwiperType | null>(null);

    const cards: { img: string; titleKey: string; id: SelectedCard }[] = [
        {img: columOne, titleKey: 'articleTwo.cards.house', id: 'house'},
        {img: columTwo, titleKey: 'articleTwo.cards.kitchen', id: 'kitchen'},
        {img: columThree, titleKey: 'articleTwo.cards.bathroom', id: 'bathroom'},
        {img: columFour, titleKey: 'articleTwo.cards.territory', id: 'territory'},
    ];

    const services = [
        {
            icon: <GiMountains/>,
            titleKey: 'articleTwo.services.mountains.title',
            descKey: 'articleTwo.services.mountains.desc'
        },
        {icon: <GiHotSurface/>, titleKey: 'articleTwo.services.tub.title', descKey: 'articleTwo.services.tub.desc'},
        {icon: <TbFence/>, titleKey: 'articleTwo.services.private.title', descKey: 'articleTwo.services.private.desc'},
        {
            icon: <MdOutlineLocalParking/>,
            titleKey: 'articleTwo.services.parking.title',
            descKey: 'articleTwo.services.parking.desc'
        },
        {icon: <TbBolt/>, titleKey: 'articleTwo.services.power.title', descKey: 'articleTwo.services.power.desc'},
        {icon: <GiCampfire/>, titleKey: 'articleTwo.services.fire.title', descKey: 'articleTwo.services.fire.desc'},
        {icon: <MdOutlineWifi/>, titleKey: 'articleTwo.services.wifi.title', descKey: 'articleTwo.services.wifi.desc'},
    ];

    useEffect(() => {
        const imgObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(css.imgVisible);
                        imgObserver.unobserve(entry.target);
                    }
                });
            },
            {threshold: 0.2}
        );
        if (imgRef1.current) imgObserver.observe(imgRef1.current);
        if (imgRef2.current) imgObserver.observe(imgRef2.current);

        const cardObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement);
                        if (idx !== -1) {
                            setVisibleCards(prev => {
                                const next = [...prev];
                                next[idx] = true;
                                return next;
                            });
                        }
                        cardObserver.unobserve(entry.target);
                    }
                });
            },
            {threshold: 0.15}
        );
        cardRefs.current.forEach((el) => {
            if (el) cardObserver.observe(el);
        });

        return () => {
            imgObserver.disconnect();
            cardObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        const swiper = swiperInstanceRef.current;
        if (!swiper || !swiper.el) return;

        const prevBtn = swiper.el.querySelector('.swiper-button-prev');
        const nextBtn = swiper.el.querySelector('.swiper-button-next');
        const pressedClass = css.swiperNavPressed;

        const buttons = [prevBtn, nextBtn].filter(Boolean) as HTMLElement[];
        const handlers: { el: HTMLElement; down: () => void; up: () => void }[] = [];

        buttons.forEach((btn) => {
            const down = () => btn.classList.add(pressedClass);
            const up = () => btn.classList.remove(pressedClass);

            btn.addEventListener('pointerdown', down);
            btn.addEventListener('pointerup', up);
            btn.addEventListener('pointercancel', up);
            btn.addEventListener('pointerleave', up);

            handlers.push({el: btn, down, up});
        });

        return () => {
            handlers.forEach(({el, down, up}) => {
                el.removeEventListener('pointerdown', down);
                el.removeEventListener('pointerup', up);
                el.removeEventListener('pointercancel', up);
                el.removeEventListener('pointerleave', up);
            });
        };
    }, []);

    const closeCard = () => setSelectedCard(null);

    return (
        <div>
            <div className={`${css.boxOne} ${css.flex}`}>
                <div className={css.boxOneText}>
                    <h3>{t('articleTwo.heroTitle')}</h3>
                    <h2>{t('articleTwo.heroSubtitle')}</h2>
                </div>
            </div>

            <ScrollTopButton/>

            <div className={css.boxTwo}>
                <div className={css.boxTwoContOne}>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        navigation
                        pagination={{clickable: true}}
                        slidesPerView={3}
                        spaceBetween={0}
                        loop={true}
                        centeredSlides={true}
                        autoplay={{delay: 2000, disableOnInteraction: false}}
                        onSwiper={(swiper: SwiperType) => {
                            swiperInstanceRef.current = swiper;
                        }}
                    >
                        <SwiperSlide><img src={swiperOne} alt="photo1"/></SwiperSlide>
                        <SwiperSlide><img src={swiperTwo} alt="photo2"/></SwiperSlide>
                        <SwiperSlide><img src={swiperThree} alt="photo3"/></SwiperSlide>
                        <SwiperSlide><img src={swiperFour} alt="photo4"/></SwiperSlide>
                        <SwiperSlide><img src={swiperFive} alt="photo5"/></SwiperSlide>
                        <SwiperSlide><img src={swiperSix} alt="photo6"/></SwiperSlide>
                        <SwiperSlide><img src={swiperSeven} alt="photo7"/></SwiperSlide>
                        <SwiperSlide><img src={swiperEighth} alt="photo8"/></SwiperSlide>
                        <SwiperSlide><img src={swiperNinth} alt="photo9"/></SwiperSlide>
                        <SwiperSlide><img src={swiperTenth} alt="photo10"/></SwiperSlide>
                        <SwiperSlide><img src={swiperEleventh} alt="photo11"/></SwiperSlide>
                    </Swiper>
                </div>
            </div>

            <div className={`${css.boxThree} ${css.flex}`}>
                <div className={css.boxThreeContOne}>
                    <h3>{t('articleTwo.paradiseTitle')}</h3>
                    <h2>{t('articleTwo.paradiseSubtitle')}</h2>
                </div>
            </div>

            <div className={css.boxFour}>
                {cards.map((card, i) => (
                    <CardTile
                        key={i}
                        img={card.img}
                        title={t(card.titleKey)}
                        btnLabel={t('articleTwo.cardMoreBtn')}
                        delay={i * 0.15}
                        isVisible={visibleCards[i]}
                        onClick={() => setSelectedCard(card.id)}
                        innerRef={el => {
                            cardRefs.current[i] = el;
                        }}
                    />
                ))}
            </div>

            <div className={css.boxFive}>
                <div className={css.boxFiveContOne}>
                    <div className={css.boxFiveContOneText}>
                        <h3>{t('articleTwo.servicesTitle')}</h3>
                        <h2>{t('articleTwo.servicesSubtitle')}</h2>
                    </div>
                    <div className={css.serviceGrid}>
                        {services.map((s, i) => (
                            <div className={css.serviceItem} key={i}>
                                <div className={css.serviceIcon}>{s.icon}</div>
                                <div>
                                    <h4>{t(s.titleKey)}</h4>
                                    <p>{t(s.descKey)}</p>
                                </div>
                            </div>
                        ))}
                        <div className={css.serviceItem}>
                            <button className={`${css.moreBtn} ${modalBtnPress.isPressed ? css.modalBtnPressed : ''}`}
                                    {...modalBtnPress.pressHandlers}
                                    onClick={() => setModalOpen(true)}>
                                {t('articleTwo.moreBtn')}
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`${css.boxFiveContTwo} ${css.flex}`}>
                    <img ref={imgRef1} src={artTwoBoxFive1} alt="artTwoBoxFive1"
                         className={`${css.boxFiveImg} ${css.imgFromLeft}`}/>
                    <img ref={imgRef2} src={artTwoBoxFive2} alt="artTwoBoxFive2"
                         className={`${css.boxFiveImg} ${css.imgFromRight}`}/>
                </div>
            </div>

            <ServicesComponent/>

            {modalOpen && <ServicesModal open={true} onClose={() => setModalOpen(false)}/>}
            {selectedCard === 'house' && <HouseModal open={true} onClose={closeCard}/>}
            {selectedCard === 'kitchen' && <KitchenModal open={true} onClose={closeCard}/>}
            {selectedCard === 'bathroom' && <BathroomModal open={true} onClose={closeCard}/>}
            {selectedCard === 'territory' && <TerritoryModal open={true} onClose={closeCard}/>}
        </div>
    );
};

export {ArticleTwoComponent};