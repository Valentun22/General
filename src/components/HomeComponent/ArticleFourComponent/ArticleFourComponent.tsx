import {FC, useEffect, useRef} from "react";
import {useTranslation} from "react-i18next";
import css from './ArticleFourComponent.module.css'
import insta from "../../../img/insta.png"
import logoWhite from "../../../img/logoWhite.png";
import {FooterHomeComponent} from "../../FooterComponent/FooterHomeComponent/FooterHomeComponent";

const ArticleFourComponent: FC = () => {
    const {t} = useTranslation();

    const heroRef = useRef<HTMLDivElement>(null);
    const infoOneRef = useRef<HTMLDivElement>(null);
    const infoTwoRef = useRef<HTMLDivElement>(null);
    const logoMobRef = useRef<HTMLDivElement>(null);
    const infoThreeRef = useRef<HTMLDivElement>(null);
    const mapMobileRef = useRef<HTMLDivElement>(null);
    const logoMobTwoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const targets = [
            {ref: heroRef,       cls: css.visibleFadeDown},
            {ref: infoOneRef,    cls: css.visibleFadeLeft},
            {ref: infoTwoRef,    cls: css.visibleFadeLeft},
            {ref: logoMobRef,    cls: css.visibleFadeDown},
            {ref: infoThreeRef,  cls: css.visibleFadeRight},
            {ref: mapMobileRef,  cls: css.visibleFadeDown},
            {ref: logoMobTwoRef, cls: css.visibleFadeDown},
        ];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const match = targets.find(t => t.ref.current === entry.target);
                        if (match) {
                            entry.target.classList.add(match.cls);
                            observer.unobserve(entry.target);
                        }
                    }
                });
            },
            {threshold: 0.15}
        );

        targets.forEach(({ref}) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className={css.allBox}>
            <div className={css.boxOne}>
                <div ref={heroRef} className={`${css.boxOneContOne} ${css.animateFadeDown}`}>
                    <h3>{t('articleFour.bookTitle')}</h3>
                    <h2>{t('articleFour.bookDesc')}</h2>
                </div>
            </div>

            <div className={css.boxTwo}>
                <div className={css.boxTwoContOne}>

                    <div ref={infoOneRef} className={`${css.boxTwoContOneInfoOne} ${css.animateFadeLeft}`}>
                        <h2>{t('articleFour.stayTitle')}</h2>
                        <h3>{t('articleFour.stayDesc')}</h3>
                    </div>

                    <div className={css.boxTwoContOneRow}>
                        <div ref={infoTwoRef} className={`${css.boxTwoContOneInfoTwo} ${css.animateFadeDown}`}>
                            <h3>{t('articleFour.contacts')}</h3>
                            <div>
                                <a href="tel:+380500569522" className={css.phoneLink}>+380 50 056 95 22</a>
                                <h4>{t('articleFour.location')}</h4>
                            </div>
                            <div className={css.boxTwoContOneInfoTwoLogo}>
                                <img src={logoWhite} alt="logoWhite"/>
                            </div>
                        </div>

                        <div ref={logoMobRef} className={`${css.mobBoxTwoContOneInfoTwoLogo} ${css.animateFadeDown}`}>
                            <img src={logoWhite} alt="logoWhite"/>
                        </div>

                        <div ref={infoThreeRef} className={`${css.boxTwoContOneInfoThree} ${css.animateFadeRight}`}>
                            <div className={css.boxTwoContOneInfoThreeInst}>
                                <h3>{t('articleFour.stayWith')}</h3>
                                <a href="https://www.instagram.com/_generals_dacha_/" className={css.instaLink}
                                   target="_blank" rel="noopener noreferrer">
                                    <img src={insta} alt="insta" className={css.footerImage}/>
                                    <h3>_generals_dacha_</h3>
                                </a>
                            </div>
                            <div className={css.mapBox}>
                                <iframe
                                    title="Карта розташування Генералівська дача"
                                    src="https://maps.google.com/maps?q=49.046940377952275,23.513986549994847&z=15&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{border: 0}}
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>

                    <div ref={logoMobTwoRef}
                         className={`${css.mobTwoBoxTwoContOneInfoTwoLogo} ${css.animateFadeDown}`}>
                        <img src={logoWhite} alt="logoWhite"/>
                    </div>

                    <div ref={mapMobileRef} className={`${css.mapBoxMobile} ${css.animateFadeDown}`}>
                        <iframe
                            title="Карта розташування Генералівська дача (мобільна версія)"
                            src="https://maps.google.com/maps?q=49.046940377952275,23.513986549994847&z=15&output=embed"
                            width="100%"
                            height="100%"
                            style={{border: 0}}
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>

            <FooterHomeComponent/>
        </div>
    );
};

export {ArticleFourComponent};
