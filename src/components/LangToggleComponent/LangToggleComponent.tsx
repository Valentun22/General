import {FC} from "react";
import {useTranslation} from "react-i18next";
import css from './LangToggleComponent.module.css';

const LangToggleComponent: FC = () => {
    const {i18n} = useTranslation();
    const lang = i18n.language as 'uk' | 'en';

    const toggleLang = () => {
        const newLang = lang === 'uk' ? 'en' : 'uk';
        i18n.changeLanguage(newLang);
        localStorage.setItem('lang', newLang);
    };

    return (
        <button className={css.langToggle} onClick={toggleLang}>
            <span className={lang === 'uk' ? css.langActive : css.langInactive}>Укр</span>
            <span className={css.langDivider}>|</span>
            <span className={lang === 'en' ? css.langActive : css.langInactive}>En</span>
        </button>
    );
};

export {LangToggleComponent};
