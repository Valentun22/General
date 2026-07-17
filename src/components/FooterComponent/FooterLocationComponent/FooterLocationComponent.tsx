import React, {FC, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import css from "./FooterLocationComponent.module.css";
import {FaqModalComponent} from "../../FaqModalComponent/FaqModalComponent";
import logoWhiteMin from "../../../img/logoWhiteMin.png"
import {NavLink} from "react-router-dom";
import {RulesModalComponent} from "../../RulesModalComponent/RulesModalComponent";

const FooterLocationComponent: FC = () => {
    const {t} = useTranslation();
    const [faqOpen, setFaqOpen] = useState(false);
    const [rulesOpen, setRulesOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const oneBtnRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const targets = [
            { ref: oneBtnRef, cls: css.visibleFadeLeft  },
            { ref: imgRef,    cls: css.visibleFadeUp    },
            { ref: rightRef,  cls: css.visibleFadeRight },
        ];

        const showInstant = () => {
            targets.forEach(({ ref, cls }) => {
                if (!ref.current) return;
                ref.current.style.transition = 'none';
                ref.current.classList.add(cls);
            });
        };

        const showAnimated = () => {
            targets.forEach(({ ref, cls }) => {
                if (ref.current) ref.current.classList.add(cls);
            });
        };

        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                showInstant();
                return;
            }
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        showAnimated();
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0, rootMargin: "0px 0px 150px 0px" }
        );

        if (containerRef.current) observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);


    return (
        <div ref={containerRef} className={css.boxThree}>
            <div className={css.boxThreeCont}>
                <div ref={oneBtnRef} className={`${css.boxThreeContText} ${css.flex}`}>
                    <button className={css.navLinkBtn} onClick={() => setFaqOpen(true)}>
                        {t('nav.questions')}
                    </button>
                    <button className={css.navLinkBtn} onClick={() => setRulesOpen(true)}>
                        {t('nav.rules')}
                    </button>
                </div>
                <div ref={imgRef} className={css.boxThreeContImg}>
                    <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>
                        <img className={css.imgLogo} src={logoWhiteMin} alt="logo"/>
                    </NavLink>
                </div>
                <div ref={rightRef} className={css.boxThreeContH}>
                    <h3 className={css.copyrightText}>{t('footer.copyright')}</h3>
                </div>
            </div>

            {faqOpen && <FaqModalComponent open={true} onClose={() => setFaqOpen(false)}/>}
            {rulesOpen && <RulesModalComponent open={true} onClose={() => setRulesOpen(false)}/>}
        </div>
    );
};

export {FooterLocationComponent};