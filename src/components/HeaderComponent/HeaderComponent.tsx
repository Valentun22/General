import css from "./HeaderComponent.module.css";
import {IconLocation, IconPhone} from "../../icons/icons";
import React, {FC} from "react";
import {LangToggleComponent} from "../LangToggleComponent/LangToggleComponent";
import {BurgerButton} from "../ButtonsComponents/BurgerButtonComponent/BurgerButton";
import {useTranslation} from "react-i18next";

interface IProps {
    onBurgerClick?: () => void;
    onBurgerClose?: () => void;
    burgerOpen?: boolean;
    drawerContent?: React.ReactNode;
}

const HeaderComponent: FC<IProps> = ({ onBurgerClick, onBurgerClose, burgerOpen, drawerContent }) => {
    const {t} = useTranslation();

    return (
        <div className={css.boxOne}>
            <div className={css.headerBurger}>
                <BurgerButton
                    isOpen={burgerOpen}
                    onClick={onBurgerClick}
                    onClose={onBurgerClose}
                    menuTop={50}
                    menuWidth={250}
                >
                    {drawerContent}
                </BurgerButton>
            </div>

            <div className={css.boxOneContOne}>
                <span className={css.contactIcon}><IconLocation/></span>
                <h3>{t('header.location')}</h3>
            </div>

            <div className={`${css.boxOneContTwo} ${css.flex}`}>
                <LangToggleComponent/>
                <span className={`${css.contactIcon} ${css.phoneHide}`}><IconPhone/></span>
                <a href="tel:+380500569522" className={`${css.phoneLink} ${css.phoneHide}`}>
                    +380 50 056 95 22
                </a>
            </div>
        </div>
    );
};

export {HeaderComponent};