import {FC, useState, useEffect, useRef, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import type {Swiper as SwiperType} from "swiper";
import css from './RoutesDropdown.module.css';
import columOne from '../../../src/img/navbar/columOne.jpg';
import columTwo from '../../../src/img/navbar/columTwo.jpg';
import columThree from '../../../src/img/navbar/columThree.jpg';
import columFour from '../../../src/img/navbar/columFour.jpg';
import columFive from '../../../src/img/navbar/columFive.jpg';
import columSix from '../../../src/img/navbar/columSix.jpg';
import columSeven from '../../../src/img/navbar/columSeven.jpg';
import columEight from '../../../src/img/navbar/columEight.jpg';
import React from "react";
import {useCloseOnScroll} from "../../hooks/useCloseOnScroll";
import {useClickOutside} from "../../hooks/useClickOutside";
import {usePressState} from "../../hooks/usePressState";
import {RouteCard} from "./RouteCard/RouteCard";

const routesStatic = [
    {path: '/parashka', img: columOne},
    {path: '/kamyanka', img: columTwo},
    {path: '/zakhar-berkut', img: columThree},
    {path: '/zhuravlyne', img: columFour},
    {path: '/opir', img: columFive},
    {path: '/tustan', img: columSix},
    {path: '/lopata', img: columSeven},
    {path: '/pavliv-potik', img: columEight},
];

interface IProps {
    open: boolean;
    onMouseLeave: () => void;
    onMouseEnter?: () => void;
    onClose: () => void;
    triggerRef?: React.RefObject<HTMLElement | null>;
}

const RoutesDropdown: FC<IProps> = ({open, onMouseLeave, onMouseEnter, onClose, triggerRef}) => {
    const {t} = useTranslation();
    const [prevEl, setPrevEl] = useState<HTMLDivElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLDivElement | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navPrevPress = usePressState();
    const navNextPress = usePressState();

    const routes = useMemo(() => {
        const routesI18n = t('routes', {returnObjects: true}) as Array<{ label: string; distance: string }>;
        return routesI18n.map((r, i) => ({...r, ...routesStatic[i]}));
    }, [t]);

    const getSlidesPerView = () => {
        const w = window.innerWidth;
        if (w < 700) return 2;
        if (w < 900) return 3;
        if (w < 1250) return 4;
        return 5;
    };

    const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView);

    useEffect(() => {
        const onResize = () => setSlidesPerView(getSlidesPerView());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const handleSwiperUpdate = (swiper: SwiperType) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    useClickOutside([menuRef, triggerRef ?? {current: null}], onClose, open);
    useCloseOnScroll(open, onClose);

    return (
        <div>
            <div className={`${css.overlay} ${open ? css.visible : ''}`} onClick={onClose}/>
            <div
                ref={menuRef}
                className={`${css.dropdownMenu} ${open ? css.dropdownMenuVisible : ''}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div className={css.swiperWrapper}>
                    <div
                        ref={setPrevEl}
                        className={`${css.navPrev} ${isBeginning ? css.navHidden : ''} ${navPrevPress.isPressed ? css.navPressed : ''}`}
                        {...navPrevPress.pressHandlers}
                    >
                        ‹
                    </div>

                    <Swiper
                        modules={[Navigation]}
                        navigation={{prevEl, nextEl}}
                        slidesPerView={slidesPerView}
                        spaceBetween={15}
                        watchOverflow={true}
                        onSwiper={handleSwiperUpdate}
                        onSlideChange={handleSwiperUpdate}
                        className={css.swiper}
                    >
                        {routes.map((route, i) => (
                            <SwiperSlide key={i}>
                                <RouteCard
                                    path={route.path}
                                    img={route.img}
                                    label={route.label}
                                    distance={route.distance}
                                    distanceLabel={t('locationRoutesDropdown.distanceLabel')}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div
                        ref={setNextEl}
                        className={`${css.navNext} ${isEnd ? css.navHidden : ''} ${navNextPress.isPressed ? css.navPressed : ''}`}
                        {...navNextPress.pressHandlers}
                    >
                        ›
                    </div>
                </div>
            </div>
        </div>
    );
};

const MemoizedRoutesDropdown = React.memo(RoutesDropdown);
export {MemoizedRoutesDropdown as RoutesDropdown};