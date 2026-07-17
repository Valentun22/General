import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import css from './Location.module.css'
import {ScrollTopButton} from "../ButtonsComponents/ScrollTopButtonComponent/ScrollTopButton";
import {NavbarComponent} from "../NavBarComponent/NavbarComponent";
import pavlivOne from "../../img/locations/pavliv_potik/pavlivOne.jpg";
import pavlivTwo from "../../img/locations/pavliv_potik/pavlivTwo.jpg";
import photo1 from "../../img/locations/pavliv_potik/photo/photoOne.jpg";
import photo2 from "../../img/locations/pavliv_potik/photo/photoTwo.jpg";
import photo3 from "../../img/locations/pavliv_potik/photo/photoThree.jpg";
import photo4 from "../../img/locations/pavliv_potik/photo/photoFour.jpg";
import photo5 from "../../img/locations/pavliv_potik/photo/photoFive.jpg";
import photo6 from "../../img/locations/pavliv_potik/photo/photoSix.jpg";
import {usePageAnimation} from "../../hooks/usePageAnimation";
import {FooterLocationComponent} from "../FooterComponent/FooterLocationComponent/FooterLocationComponent";
import {ScrollBottomButton} from "../ButtonsComponents/ScrollBottomButtonComponent/ScrollBottomButton";
import {ILocationPhotos} from "../../interfaces/ILocationPhotos";
import {PhotoGallery} from "./PhotoGallery/PhotoGallery";

const photo = [[photo1, photo2, photo3], [photo4, photo5, photo6]];

const PavlivPotikComponent: FC<ILocationPhotos> = ({backPhotoLocation, backPhotoPanorama}) => {
    usePageAnimation(css.visible);
    const {t} = useTranslation();

    return (
        <div style={{
            '--hero-bg': `url("${backPhotoLocation}")`,
            '--panoram-bg': `url("${backPhotoPanorama}")`,
        } as React.CSSProperties}>
            <div className={css.articleOneBox}>
                <NavbarComponent title={t('pavlivPotik.navTitle')}/>
                <ScrollBottomButton/>
            </div>

            <div className={css.articleTwoBox}>
                <div className={css.articleTwoBoxText}>
                    <h4 className={`${css.animFadeUp} ${css.visible}`}>
                        {t('pavlivPotik.subtitle')}
                    </h4>
                    <h2 className={css.animFadeUp} data-anim="" data-delay="100">
                        {t('pavlivPotik.title')}
                    </h2>
                    <h3 className={css.animFadeUp} data-anim="" data-delay="200">
                        {t('pavlivPotik.desc1')}
                    </h3>
                </div>
            </div>

            <div className={css.articleThreeBox}>
                <img src={pavlivOne} alt="Pavliv 1" className={css.animSlideLeft} data-anim=""/>
                <img src={pavlivTwo} alt="Pavliv 2" className={css.animSlideRight} data-anim=""/>
            </div>

            <div className={css.articleTwoBox}>
                <div className={css.articleTwoBoxText}>
                    <h3 className={css.animFadeUp} data-anim="">
                        {t('pavlivPotik.desc2')}
                    </h3>
                    <h3 className={css.animFadeUp} data-anim="" data-delay="100">
                        {t('pavlivPotik.desc3')}
                    </h3>
                </div>

                <div className={css.articleFourBox}>
                    <h2 className={css.animFadeUp} data-anim="" data-delay="100">{t('common.location')}</h2>
                    <div className={css.articleFourBoxCont}>
                        <div className={`${css.mapBox} ${css.animSlideLeft}`} data-anim="" data-delay="150">
                            <iframe
                                title="Карта розташування Павлів Потік"
                                src="https://maps.google.com/maps?q=49.02940234502449, 23.510678100471903&z=16&output=embed"
                                style={{border: 0}}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <div className={css.articleFourBoxText}>
                            <h3 className={css.animSlideRight} data-anim="" data-delay="200">
                                {t('pavlivPotik.locationDesc')}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className={css.articleFiveBox}>
                    <div className={css.articleTwoBoxText}>
                        <h2 className={css.animFadeUp} data-anim="">{t('pavlivPotik.legendsTitle')}</h2>
                        <h3 className={css.animFadeUp} data-anim="" data-delay="150"
                            style={{whiteSpace: 'pre-line'}}>
                            {t('pavlivPotik.legendsDesc')}
                        </h3>
                    </div>
                </div>

                <PhotoGallery photos={photo}/>

                <div className={css.articleSixBox}>
                    <div className={css.articleTwoBoxText}>
                        <h2 className={css.animFadeUp} data-anim="">{t('pavlivPotik.routeTitle')}</h2>
                        <h3 className={css.animFadeUp} data-anim="" data-delay="150">
                            {t('pavlivPotik.routeDesc')}
                        </h3>
                    </div>
                </div>
            </div>

            <ScrollTopButton/>
            <div className={css.footerMin}>
                <FooterLocationComponent/>
            </div>
        </div>
    );
};

export {PavlivPotikComponent};
