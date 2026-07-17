import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import css from './Location.module.css'
import {ScrollTopButton} from "../ButtonsComponents/ScrollTopButtonComponent/ScrollTopButton";
import {NavbarComponent} from "../NavBarComponent/NavbarComponent";
import kamyankaOne from "../../img/locations/kamyanka/kamyankaOne.jpg";
import kamyankaTwo from "../../img/locations/kamyanka/kamyankaTwo.jpg";
import photo1 from "../../img/locations/kamyanka/photo/photoOne.jpg";
import photo2 from "../../img/locations/kamyanka/photo/photoTwo.jpg";
import photo3 from "../../img/locations/kamyanka/photo/photoThree.jpg";
import photo4 from "../../img/locations/kamyanka/photo/photoFour.jpg";
import photo5 from "../../img/locations/kamyanka/photo/photoFive.jpg";
import photo6 from "../../img/locations/kamyanka/photo/photoSix.jpg";
import {usePageAnimation} from "../../hooks/usePageAnimation";
import {FooterLocationComponent} from "../FooterComponent/FooterLocationComponent/FooterLocationComponent";
import {ScrollBottomButton} from "../ButtonsComponents/ScrollBottomButtonComponent/ScrollBottomButton";
import {ILocationPhotos} from "../../interfaces/ILocationPhotos";
import {PhotoGallery} from "./PhotoGallery/PhotoGallery";

const photo = [[photo1, photo2, photo3], [photo4, photo5, photo6]];

const KamyankaComponent: FC<ILocationPhotos> = ({backPhotoLocation, backPhotoPanorama}) => {
    usePageAnimation(css.visible);
    const {t} = useTranslation();

    return (
        <div style={{
            '--hero-bg': `url("${backPhotoLocation}")`,
            '--panoram-bg': `url("${backPhotoPanorama}")`,
        } as React.CSSProperties}>
            <div className={css.articleOneBox}>
                <NavbarComponent title={t('kamyanka.navTitle')}/>
                <ScrollBottomButton/>
            </div>

            <div className={css.articleTwoBox}>
                <div className={css.articleTwoBoxText}>
                    <h4 className={`${css.animFadeUp} ${css.visible}`}>
                        {t('kamyanka.subtitle')}
                    </h4>
                    <h2 className={css.animFadeUp} data-anim="" data-delay="100">
                        {t('kamyanka.title')}
                    </h2>
                    <h3 className={css.animFadeUp} data-anim="" data-delay="200">
                        {t('kamyanka.desc1')}
                    </h3>
                </div>
            </div>

            <div className={css.articleThreeBox}>
                <img src={kamyankaOne} alt="Kamyanka 1" className={css.animSlideLeft} data-anim=""/>
                <img src={kamyankaTwo} alt="Kamyanka 2" className={css.animSlideRight} data-anim=""/>
            </div>

            <div className={css.articleTwoBox}>
                <div className={css.articleTwoBoxText}>
                    <h3 className={css.animFadeUp} data-anim="">
                        {t('kamyanka.desc2')}
                    </h3>
                </div>

                <div className={css.articleFourBox}>
                    <h2 className={css.animFadeUp} data-anim="" data-delay="100">{t('common.location')}</h2>
                    <div className={css.articleFourBoxCont}>
                        <div className={`${css.mapBox} ${css.animSlideLeft}`} data-anim="" data-delay="150">
                            <iframe
                                title="Карта розташування Кам'янка"
                                src="https://maps.google.com/maps?q=49.0336,23.5642&z=13&output=embed"
                                style={{border: 0}}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <div className={css.articleFourBoxText}>
                            <h3 className={css.animSlideRight} data-anim="" data-delay="200">
                                {t('kamyanka.locationDesc')}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className={css.articleFiveBox}>
                    <div className={css.articleTwoBoxText}>
                        <h2 className={css.animFadeUp} data-anim="">{t('kamyanka.legendsTitle')}</h2>
                        <h3 className={css.animFadeUp} data-anim="" data-delay="150"
                            style={{whiteSpace: 'pre-line'}}>
                            {t('kamyanka.legendsDesc')}
                        </h3>
                    </div>
                </div>

                <PhotoGallery photos={photo}/>

                <div className={css.articleSixBox}>
                    <div className={css.articleTwoBoxText}>
                        <h2 className={css.animFadeUp} data-anim="">{t('kamyanka.routeTitle')}</h2>
                        <h3 className={css.animFadeUp} data-anim="" data-delay="150">
                            {t('kamyanka.routeDesc')}
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

export {KamyankaComponent};