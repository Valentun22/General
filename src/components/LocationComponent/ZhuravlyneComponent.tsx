import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import css from './Location.module.css'
import {ScrollTopButton} from "../ButtonsComponents/ScrollTopButtonComponent/ScrollTopButton";
import {NavbarComponent} from "../NavBarComponent/NavbarComponent";
import zhuravlyneOne from "../../img/locations/zhuravlyne/zhuravlyneOne.jpg";
import zhuravlyneTwo from "../../img/locations/zhuravlyne/zhuravlyneTwo.jpg";
import photo1 from "../../img/locations/zhuravlyne/photo/photoOne.jpg";
import photo2 from "../../img/locations/zhuravlyne/photo/photoTwo.jpg";
import photo3 from "../../img/locations/zhuravlyne/photo/photoThree.jpg";
import photo4 from "../../img/locations/zhuravlyne/photo/photoFour.jpg";
import photo5 from "../../img/locations/zhuravlyne/photo/photoFive.jpg";
import photo6 from "../../img/locations/zhuravlyne/photo/photoSix.jpg";
import {usePageAnimation} from "../../hooks/usePageAnimation";
import {FooterLocationComponent} from "../FooterComponent/FooterLocationComponent/FooterLocationComponent";
import {ScrollBottomButton} from "../ButtonsComponents/ScrollBottomButtonComponent/ScrollBottomButton";
import {ILocationPhotos} from "../../interfaces/ILocationPhotos";
import {PhotoGallery} from "./PhotoGallery/PhotoGallery";

const photo = [[photo1, photo2, photo3], [photo4, photo5, photo6]];

const ZhuravlyneComponent: FC<ILocationPhotos> = ({backPhotoLocation, backPhotoPanorama}) => {
    usePageAnimation(css.visible);
    const {t} = useTranslation();

    return (
        <div style={{
            '--hero-bg': `url("${backPhotoLocation}")`,
            '--panoram-bg': `url("${backPhotoPanorama}")`,
        } as React.CSSProperties}>
            <div className={css.articleOneBox}>
                <NavbarComponent title={t('zhuravlyne.navTitle')}/>
                <ScrollBottomButton/>
            </div>

            <div className={css.articleTwoBox}>
                <div className={css.articleTwoBoxText}>
                    <h4 className={`${css.animFadeUp} ${css.visible}`}>
                        {t('zhuravlyne.subtitle')}
                    </h4>
                    <h2 className={css.animFadeUp} data-anim="" data-delay="100">
                        {t('zhuravlyne.title')}
                    </h2>
                    <h3 className={css.animFadeUp} data-anim="" data-delay="200">
                        {t('zhuravlyne.desc1')}
                    </h3>
                </div>
            </div>

            <div className={css.articleThreeBox}>
                <img src={zhuravlyneOne} alt="Zhuravlyne 1" className={css.animSlideLeft} data-anim=""/>
                <img src={zhuravlyneTwo} alt="Zhuravlyne 2" className={css.animSlideRight} data-anim=""/>
            </div>

            <div className={css.articleTwoBox}>
                <div className={css.articleTwoBoxText}>
                    <h3 className={css.animFadeUp} data-anim="">
                        {t('zhuravlyne.desc2')}
                    </h3>
                    <h3 className={css.animFadeUp} data-anim="" data-delay="100">
                        {t('zhuravlyne.desc3')}
                    </h3>
                </div>

                <div className={css.articleFourBox}>
                    <h2 className={css.animFadeUp} data-anim="" data-delay="100">{t('common.location')}</h2>
                    <div className={css.articleFourBoxCont}>
                        <div className={`${css.mapBox} ${css.animSlideLeft}`} data-anim="" data-delay="150">
                            <iframe
                                src="https://www.google.com/maps?q=49.03540444068732,23.57176379047621&z=13&output=embed"
                                style={{border: 0}}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <div className={css.articleFourBoxText}>
                            <h3 className={css.animSlideRight} data-anim="" data-delay="200">
                                {t('zhuravlyne.locationDesc')}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className={css.articleFiveBox}>
                    <div className={css.articleTwoBoxText}>
                        <h2 className={css.animFadeUp} data-anim="">{t('zhuravlyne.legendsTitle')}</h2>
                        <h3 className={css.animFadeUp} data-anim="" data-delay="150"
                            style={{whiteSpace: 'pre-line'}}>
                            {t('zhuravlyne.legendsDesc')}
                        </h3>
                    </div>
                </div>

                <PhotoGallery photos={photo} />

                <div className={css.articleSixBox}>
                    <div className={css.articleTwoBoxText}>
                        <h2 className={css.animFadeUp} data-anim="">{t('zhuravlyne.routeTitle')}</h2>
                        <h3 className={css.animFadeUp} data-anim="" data-delay="150">
                            {t('zhuravlyne.routeDesc')}
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

export {ZhuravlyneComponent};