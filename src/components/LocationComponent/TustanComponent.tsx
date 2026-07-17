import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import css from './Location.module.css'
import {ScrollTopButton} from "../ButtonsComponents/ScrollTopButtonComponent/ScrollTopButton";
import {NavbarComponent} from "../NavBarComponent/NavbarComponent";
import photo1 from "../../img/locations/tustan/photo/photoOne.jpg";
import photo2 from "../../img/locations/tustan/photo/photoTwo.jpg";
import photo3 from "../../img/locations/tustan/photo/photoThree.jpg";
import photo4 from "../../img/locations/tustan/photo/photoFour.jpg";
import photo5 from "../../img/locations/tustan/photo/photoFive.jpg";
import photo6 from "../../img/locations/tustan/photo/photoSix.jpg";
import tustanOne from "../../img/locations/tustan/tustanOne.jpg";
import tustanTwo from "../../img/locations/tustan/tustanTwo.jpg";
import tustanThree from "../../img/locations/tustan/tustanThree.jpg";
import tustanFour from "../../img/locations/tustan/tustanFour.jpg";
import {usePageAnimation} from "../../hooks/usePageAnimation";
import {FooterLocationComponent} from "../FooterComponent/FooterLocationComponent/FooterLocationComponent";
import {ScrollBottomButton} from "../ButtonsComponents/ScrollBottomButtonComponent/ScrollBottomButton";
import {ILocationPhotos} from "../../interfaces/ILocationPhotos";
import {PhotoGallery} from "./PhotoGallery/PhotoGallery";

const photo = [[photo1, photo2, photo3], [photo4, photo5, photo6]];

const TustanComponent: FC<ILocationPhotos> = ({backPhotoLocation, backPhotoPanorama}) => {
    usePageAnimation(css.visible);
    const {t} = useTranslation();

    return (
        <div style={{
            '--hero-bg': `url("${backPhotoLocation}")`,
            '--panoram-bg': `url("${backPhotoPanorama}")`,
        } as React.CSSProperties}>
            <div className={css.articleOneBox}>
                <NavbarComponent title={t('tustan.navTitle')}/>
                <ScrollBottomButton/>
            </div>

            <div className={css.articleTwoBox}>
                <div className={css.articleTwoBoxText}>
                    <h4 className={`${css.animFadeUp} ${css.visible}`}>
                        {t('tustan.subtitle')}
                    </h4>
                    <h2 className={css.animFadeUp} data-anim="" data-delay="100">
                        {t('tustan.title')}
                    </h2>
                    <h3 className={css.animFadeUp} data-anim="" data-delay="200">
                        {t('tustan.desc1')}
                    </h3>
                </div>
            </div>

            <div className={css.articleThreeBox}>
                <img src={tustanOne} alt="Tustan 1" className={css.animSlideLeft} data-anim=""/>
                <img src={tustanTwo} alt="Tustan 2" className={css.animSlideRight} data-anim=""/>
            </div>

            <div className={css.articleTwoBox}>
                <div className={css.articleTwoBoxText}>
                    <h3 className={css.animFadeUp} data-anim="">
                        {t('tustan.desc2')}
                    </h3>
                </div>

                <div className={css.articleFourBox}>
                    <h2 className={css.animFadeUp} data-anim="" data-delay="100">{t('common.location')}</h2>
                    <div className={css.articleFourBoxCont}>
                        <div className={`${css.mapBox} ${css.animSlideLeft}`} data-anim="" data-delay="150">
                            <iframe
                                src="https://maps.google.com/maps?q=49.0789,23.3756&z=14&output=embed"
                                style={{border: 0}}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <div className={css.articleFourBoxText}>
                            <h3 className={css.animSlideRight} data-anim="" data-delay="200">
                                {t('tustan.locationDesc')}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className={css.articleFiveBox}>
                    <div className={css.articleTwoBoxText}>
                        <h2 className={css.animFadeUp} data-anim="">{t('tustan.legendsTitle')}</h2>
                        <h3 className={css.animFadeUp} data-anim="" data-delay="150"
                            style={{whiteSpace: 'pre-line'}}>
                            {t('tustan.legendsDesc')}
                        </h3>
                    </div>
                </div>

                <div className={css.articleThreeBox}>
                    <img src={tustanThree} alt="Tustan 3" className={css.animSlideLeft} data-anim=""/>
                    <img src={tustanFour} alt="Tustan 4" className={css.animSlideRight} data-anim=""/>
                </div>

                <div className={css.articleSixBox}>
                    <div className={css.articleTwoBoxText}>
                        <h2 className={css.animFadeUp} data-anim="">{t('tustan.seeTitle')}</h2>
                        <h3 className={css.animFadeUp} data-anim="" data-delay="150"
                            style={{whiteSpace: 'pre-line'}}>
                            {t('tustan.seeDesc')}
                        </h3>
                    </div>
                </div>

                <PhotoGallery photos={photo}/>

                <div className={css.articleSixBox}>
                    <div className={css.articleTwoBoxText}>
                        <h2 className={css.animFadeUp} data-anim="">{t('tustan.routeTitle')}</h2>
                        <h3 className={css.animFadeUp} data-anim="" data-delay="150"
                            style={{whiteSpace: 'pre-line'}}>
                            {t('tustan.routeDesc')}
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

export {TustanComponent};
