import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import css from './Location.module.css'
import {ScrollTopButton} from "../ButtonsComponents/ScrollTopButtonComponent/ScrollTopButton";
import {NavbarComponent} from "../NavBarComponent/NavbarComponent";
import parashkaOne from '../../img/locations/parashka/parashkaOne.jpg';
import parashkaTwo from '../../img/locations/parashka/parashkaTwo.jpg';
import parashkaThree from '../../img/locations/parashka/parashkaThree.jpg';
import parashkaFour from '../../img/locations/parashka/parashkaFour.jpg';
import photo1 from '../../img/locations/parashka/photo/photoOne.jpg';
import photo2 from '../../img/locations/parashka/photo/photoTwo.jpg';
import photo3 from '../../img/locations/parashka/photo/photoThree.jpg';
import photo4 from '../../img/locations/parashka/photo/photoFour.jpg';
import photo5 from '../../img/locations/parashka/photo/photoFive.jpg';
import photo6 from '../../img/locations/parashka/photo/photoSix.jpg';
import {usePageAnimation} from "../../hooks/usePageAnimation";
import {FooterLocationComponent} from "../FooterComponent/FooterLocationComponent/FooterLocationComponent";
import {ScrollBottomButton} from "../ButtonsComponents/ScrollBottomButtonComponent/ScrollBottomButton";
import {ILocationPhotos} from "../../interfaces/ILocationPhotos";
import {PhotoGallery} from "./PhotoGallery/PhotoGallery";

const photo = [[photo1, photo2, photo3], [photo4, photo5, photo6]];

const ParashkaComponent: FC<ILocationPhotos> = ({backPhotoLocation, backPhotoPanorama}) => {
    usePageAnimation(css.visible);
    const {t} = useTranslation();

    return (
        <div style={{
            '--hero-bg': `url("${backPhotoLocation}")`,
            '--panoram-bg': `url("${backPhotoPanorama}")`,
        } as React.CSSProperties}>
            <div className={css.articleOneBox}>
                <NavbarComponent title={t('parashka.navTitle')}/>
                <ScrollBottomButton/>
            </div>

            <div className={css.articleTwoBox}>
                <div className={css.articleTwoBoxText}>
                    <h4 className={`${css.animFadeUp} ${css.visible}`}>
                        {t('parashka.subtitle')}
                    </h4>
                    <h2 className={css.animFadeUp} data-anim="" data-delay="100">
                        {t('parashka.title')}
                    </h2>
                    <h3 className={css.animFadeUp} data-anim="" data-delay="200">
                        {t('parashka.desc1')}
                    </h3>
                </div>
            </div>

            <div className={css.articleThreeBox}>
                <img src={parashkaOne} alt="Parashka 1" className={css.animSlideLeft} data-anim=""/>
                <img src={parashkaTwo} alt="Parashka 2" className={css.animSlideRight} data-anim=""/>
            </div>

            <div className={css.articleTwoBox}>
                <div className={css.articleTwoBoxText}>
                    <h3 className={css.animFadeUp} data-anim="">
                        {t('parashka.desc2')}
                    </h3>
                </div>

                <div className={css.articleFourBox}>
                    <h2 className={css.animFadeUp} data-anim="" data-delay="100">{t('common.location')}</h2>
                    <div className={css.articleFourBoxCont}>
                        <div className={`${css.mapBox} ${css.animSlideLeft}`} data-anim="" data-delay="150">
                            <iframe
                                title="Карта розташування Парашка"
                                src="https://maps.google.com/maps?q=49.0699123,23.4155077&z=13&output=embed"
                                style={{border: 0}}
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <div className={css.articleFourBoxText}>
                            <h3 className={css.animSlideRight} data-anim="" data-delay="200">
                                {t('parashka.locationDesc')}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className={css.articleTwoBox}>
                    <div className={css.articleTwoBoxText}>
                        <h2 className={css.animFadeUp} data-anim="" data-delay="100">
                            {t('parashka.atmosphereTitle')}
                        </h2>
                        <h3 className={css.animFadeUp} data-anim="" data-delay="200">
                            {t('parashka.atmosphereDesc')}
                        </h3>
                    </div>
                </div>

                <div className={css.articleThreeBox}>
                    <img src={parashkaThree} alt="Parashka 3" className={css.animSlideLeft} data-anim=""/>
                    <img src={parashkaFour} alt="Parashka 4" className={css.animSlideRight} data-anim=""/>
                </div>

                <div className={css.articleFiveBox}>
                    <div className={css.articleTwoBoxText}>
                        <h2 className={css.animFadeUp} data-anim="">{t('parashka.legendsTitle')}</h2>
                        <h3 className={css.animFadeUp} data-anim="" data-delay="150"
                            style={{whiteSpace: 'pre-line'}}>
                            {t('parashka.legendsDesc')}
                        </h3>
                    </div>
                </div>

                <PhotoGallery photos={photo}/>

                <div className={css.articleSixBox}>
                    <div className={css.articleTwoBoxText}>
                        <h2 className={css.animFadeUp} data-anim="">{t('parashka.routeTitle')}</h2>
                        <h3 className={css.animFadeUp} data-anim="" data-delay="150">
                            {t('parashka.routeDesc')}
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

export {ParashkaComponent};
