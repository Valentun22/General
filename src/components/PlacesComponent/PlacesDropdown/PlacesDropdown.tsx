import React, {FC, useState, useRef, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import type {Swiper as SwiperType} from "swiper";
import css from './PlacesDropdown.module.css';
import {PlaceModal} from '../PlaceModal/PlaceModal';

import hataHome from '../../../img/place/hata_svyata/hataHome.jpg';
import hataPhotoOne from '../../../img/place/hata_svyata/hataPhotoOne.jpg';
import hataPhotoTwo from '../../../img/place/hata_svyata/hataPhotoTwo.jpg';
import hataPhotoThree from '../../../img/place/hata_svyata/hataPhotoThree.jpg';
import hataPhotoFour from '../../../img/place/hata_svyata/hataPhotoFour.jpg';
import vivcharykHome from '../../../img/place/vivcharyk/vivcharykHome.jpg';
import vivcharykPhotoOne from '../../../img/place/vivcharyk/vivcharykPhotoOne.jpg';
import vivcharykPhotoTwo from '../../../img/place/vivcharyk/vivcharykPhotoTwo.jpg';
import vivcharykPhotoThree from '../../../img/place/vivcharyk/vivcharykPhotoThree.jpg';
import vivcharykPhotoFour from '../../../img/place/vivcharyk/vivcharykPhotoFour.jpg';
import zolotaHome from '../../../img/place/zolota_forel/zolotaHome.jpg';
import zolotaPhotoOne from '../../../img/place/zolota_forel/zolotaPhotoOne.jpg';
import zolotaPhotoTwo from '../../../img/place/zolota_forel/zolotaPhotoTwo.jpg';
import zolotaPhotoThree from '../../../img/place/zolota_forel/zolotaPhotoThree.jpg';
import zolotaPhotoFour from '../../../img/place/zolota_forel/zolotaPhotoFour.jpg';
import ollioHome from '../../../img/place/ollio/ollioHome.jpg';
import ollioPhotoOne from '../../../img/place/ollio/ollioPhotoOne.jpg';
import ollioPhotoTwo from '../../../img/place/ollio/ollioPhotoTwo.jpg';
import ollioPhotoThree from '../../../img/place/ollio/ollioPhotoThree.jpg';
import ollioPhotoFour from '../../../img/place/ollio/ollioPhotoFour.jpg';
import gamHome from '../../../img/place/gam/gamHome.jpg';
import gamPhotoOne from '../../../img/place/gam/gamPhotoOne.jpg';
import gamPhotoTwo from '../../../img/place/gam/gamPhotoTwo.jpg';
import gamPhotoThree from '../../../img/place/gam/gamPhotoThree.jpg';
import gamPhotoFour from '../../../img/place/gam/gamPhotoFour.jpg';
import cacaoHome from '../../../img/place/cacao/cacaoHome.jpg';
import cacaoPhotoOne from '../../../img/place/cacao/cacaoPhotoOne.jpg';
import cacaoPhotoTwo from '../../../img/place/cacao/cacaoPhotoTwo.jpg';
import cacaoPhotoThree from '../../../img/place/cacao/cacaoPhotoThree.jpg';
import cacaoPhotoFour from '../../../img/place/cacao/cacaoPhotoFour.jpg';
import dominoHome from '../../../img/place/domino/dominoHome.jpg';
import dominoPhotoOne from '../../../img/place/domino/dominoPhotoOne.jpg';
import dominoPhotoTwo from '../../../img/place/domino/dominoPhotoTwo.jpg';
import dominoPhotoThree from '../../../img/place/domino/dominoPhotoThree.jpg';
import dominoPhotoFour from '../../../img/place/domino/dominoPhotoFour.jpg';
import pinsaMiaHome from '../../../img/place/pinsaMia/pinsaMiaHome.jpg';
import pinsaMiaPhotoOne from '../../../img/place/pinsaMia/pinsaMiaPhotoOne.jpg';
import pinsaMiaPhotoTwo from '../../../img/place/pinsaMia/pinsaMiaPhotoTwo.jpg';
import pinsaMiaPhotoThree from '../../../img/place/pinsaMia/pinsaMiaPhotoThree.jpg';
import pinsaMiaPhotoFour from '../../../img/place/pinsaMia/pinsaMiaPhotoFour.jpg';
import {useClickOutside} from "../../../hooks/useClickOutside";
import {useCloseOnScroll} from "../../../hooks/useCloseOnScroll";

const placesStatic = [
    {
        mainImg: hataHome,
        gallery: [hataPhotoOne, hataPhotoTwo, hataPhotoThree, hataPhotoFour],
        phone: '+380970108800',
        mapUrl: 'https://www.google.com/maps?q=Ресторація+Хата+Свята+Сколе',
        menuUrl: 'https://menu.hatasviata.rest/',
        websiteUrl: 'https://www.hatasviata.rest/',
        instagramUrl: 'https://www.instagram.com/hatasviata_rest/'
    },
    {
        mainImg: vivcharykHome,
        gallery: [vivcharykPhotoOne, vivcharykPhotoTwo, vivcharykPhotoThree, vivcharykPhotoFour],
        phone: '+380503151898',
        mapUrl: 'https://www.google.com/maps?q=готель+ресторан+Вівчарик+Сколе',
        menuUrl: 'https://www.vivcharyk.com/restoran/menu/',
        websiteUrl: 'https://www.vivcharyk.com/',
        instagramUrl: 'https://www.instagram.com/vivcharyk_hotel/'
    },
    {
        mainImg: gamHome,
        gallery: [gamPhotoOne, gamPhotoTwo, gamPhotoThree, gamPhotoFour],
        phone: '+380736480013',
        mapUrl: 'https://www.google.com/maps?q=Skole+G.A.M.+Сколе',
        instagramUrl: 'https://www.instagram.com/g.a.m_skole/'
    },
    {
        mainImg: zolotaHome,
        gallery: [zolotaPhotoOne, zolotaPhotoTwo, zolotaPhotoThree, zolotaPhotoFour],
        phone: '+380678896999',
        mapUrl: 'https://www.google.com/maps?q=Золота+Форель+Коростів',
        menuUrl: 'https://mbnk.biz/5FCNuvh5Ru/FNOY4?utm_source=ig',
        websiteUrl: 'https://zolotaforel.ua/uk',
        instagramUrl: 'https://www.instagram.com/zolota_forel/'
    },
    {
        mainImg: ollioHome,
        gallery: [ollioPhotoOne, ollioPhotoTwo, ollioPhotoThree, ollioPhotoFour],
        phone: '+380683111561',
        mapUrl: 'google.com/maps?q=вулиця+Степана+Охримовича,+22',
        menuUrl: 'https://pizzeria-ollio.choiceqr.com/section:novinki/shchos-noven',
        websiteUrl: 'https://pizzeria-ollio.choiceqr.com/',
        instagramUrl: 'https://www.instagram.com/pizzeria.ollio/'
    },
    {
        mainImg: cacaoHome,
        gallery: [cacaoPhotoOne, cacaoPhotoTwo, cacaoPhotoThree, cacaoPhotoFour],
        phone: '+380675990440',
        mapUrl: 'https://www.google.com/maps?q=CACAO+Сколе',
        instagramUrl: 'https://www.instagram.com/cacao_skole/'
    },
    {
        mainImg: pinsaMiaHome,
        gallery: [pinsaMiaPhotoOne, pinsaMiaPhotoTwo, pinsaMiaPhotoThree, pinsaMiaPhotoFour],
        phone: '+380756187267',
        mapUrl: 'https://www.google.com/maps?q=Майдан+Незалежності+1в,+Сколе',
        instagramUrl: 'https://www.instagram.com/pinsa.mia_/'
    },
    {
        mainImg: dominoHome,
        gallery: [dominoPhotoOne, dominoPhotoTwo, dominoPhotoThree, dominoPhotoFour],
        phone: '+380993492800',
        mapUrl: 'https://www.google.com/maps?q=Кафе+Доміно+Сколе',
        menuUrl: 'https://xn-4t8h.menu.skyservice.online/?tpayid=79e2b659-a8cb-4d51-a2ad-d6c8d225494b&category=14',
        instagramUrl: 'https://www.instagram.com/domino.cafe.skole/?hl=uk'
    },
];

interface IProps {
    open: boolean;
    onMouseLeave: () => void;
    onMouseEnter?: () => void;
    onClose: () => void;
    triggerRef?: React.RefObject<HTMLElement | null>;
}

const PlacesDropdown: FC<IProps> = ({open, onMouseLeave, onMouseEnter, onClose, triggerRef}) => {
    const {t} = useTranslation();
    const [prevEl, setPrevEl] = useState<HTMLDivElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLDivElement | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const places = useMemo(() => {
        const placesI18n = t('places', {returnObjects: true}) as Array<{
            name: string;
            category: string;
            description: string[];
            address: string
        }>;
        return placesI18n.map((p, i) => ({...p, ...placesStatic[i]}));
    }, [t]);

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
                    <div ref={setPrevEl} className={`${css.navPrev} ${isBeginning ? css.navHidden : ''}`}>‹</div>
                    <Swiper
                        modules={[Navigation]}
                        navigation={{prevEl, nextEl}}
                        spaceBetween={15}
                        breakpoints={{
                            100: {slidesPerView: 2, spaceBetween: 10},
                            600: {slidesPerView: 3, spaceBetween: 15},
                            900: {slidesPerView: 4, spaceBetween: 15},
                            1250: {slidesPerView: 5, spaceBetween: 15},
                        }}
                        watchOverflow={true}
                        onSwiper={handleSwiperUpdate}
                        onSlideChange={handleSwiperUpdate}
                        className={css.swiper}
                    >
                        {places.map((place, i) => (
                            <SwiperSlide key={i}>
                                <div className={css.card} onClick={() => setSelectedIndex(i)}>
                                    <div className={css.cardImg}>
                                        {place.mainImg && <img src={place.mainImg} alt={place.name}/>}
                                        <span className={css.cardCategory}>{place.category}</span>
                                    </div>
                                    <span className={css.cardLabel}>{place.name}</span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div ref={setNextEl} className={`${css.navNext} ${isEnd ? css.navHidden : ''}`}>›</div>
                </div>
            </div>

            {selectedIndex !== null && (
                <PlaceModal
                    open={true}
                    places={places}
                    currentIndex={selectedIndex}
                    onIndexChange={setSelectedIndex}
                    onClose={() => setSelectedIndex(null)}
                />
            )}
        </div>
    );
};

const MemoizedPlacesDropdown = React.memo(PlacesDropdown);
export {MemoizedPlacesDropdown as PlacesDropdown};