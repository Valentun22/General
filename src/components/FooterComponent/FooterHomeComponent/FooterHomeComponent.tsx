import {FC, useState, useRef, useEffect} from "react";
import css from "./FooterHomeComponent.module.css";
import {FaqModalComponent} from "../../FaqModalComponent/FaqModalComponent";
import {RulesModalComponent} from "../../RulesModalComponent/RulesModalComponent";
import {useTranslation} from "react-i18next";

const FooterHomeComponent: FC = () => {
    const [faqOpen, setFaqOpen] = useState(false);
    const [rulesOpen, setRulesOpen] = useState(false);

    const oneBtnRef = useRef<HTMLButtonElement>(null);
    const twoBtnRef = useRef<HTMLButtonElement>(null);
    const copyrightRef = useRef<HTMLHeadingElement>(null);

    const {t} = useTranslation();

    useEffect(() => {
        const targets = [
            {ref: oneBtnRef, cls: css.visibleFadeLeft},
            {ref: twoBtnRef, cls: css.visibleFadeRight},
            {ref: copyrightRef, cls: css.visibleFadeUp},
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
            {threshold: 0.3}
        );

        targets.forEach(({ref}) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className={css.boxThree}>
            <div className={css.boxThreeCont}>
                <div className={`${css.boxThreeContText} ${css.flex}`}>
                    <button
                        ref={oneBtnRef}
                        className={`${css.navLinkBtn} ${css.animateFadeLeft}`}
                        onClick={() => setRulesOpen(true)}
                    >
                        {t('nav.rules')}
                    </button>
                    <button
                        ref={twoBtnRef}
                        className={`${css.navLinkBtn} ${css.animateFadeRight}`}
                        onClick={() => setFaqOpen(true)}
                    >
                        {t('nav.questions')}
                    </button>
                </div>
                <h3 ref={copyrightRef} className={css.animateFadeUp}>© generals_dacha 2026</h3>
            </div>

            {faqOpen && <FaqModalComponent open={true} onClose={() => setFaqOpen(false)}/>}
            {rulesOpen && <RulesModalComponent open={true} onClose={() => setRulesOpen(false)}/>}
        </div>
    );
};

export {FooterHomeComponent};