import React, {FC, useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import css from './ArticleOneComponent.module.css';
import logo from '../../../img/logoWhite.png';
import 'animate.css';
import {RoutesDropdown} from "../../RoutesLocationComponent/RoutesDropdown";
import {PlacesDropdown} from '../../PlacesComponent/PlacesDropdown/PlacesDropdown';
import {FaqModalComponent} from "../../FaqModalComponent/FaqModalComponent";
import {RulesModalComponent} from "../../RulesModalComponent/RulesModalComponent";
import {HeaderComponent} from "../../HeaderComponent/HeaderComponent";
import {MdHelpOutline, MdOutlineCoffee, MdOutlineMap, MdOutlineRule} from "react-icons/md";
import {ScrollBottomButton} from "../../ButtonsComponents/ScrollBottomButtonComponent/ScrollBottomButton";
import {BookingModalComponent} from "../../BookingModalComponent/ButtonsBookingModal/BookingModalComponent";
import {BookingModal} from "../../BookingModalComponent/BookingModal/BookingModal";
import {useHoverDropdown} from "../../../hooks/useHoverDropdown";
import { useCloseOnScroll } from "../../../hooks/useCloseOnScroll";


const ArticleOneComponent: FC = () => {
    const {t} = useTranslation();
    const [faqOpen, setFaqOpen] = useState(false);
    const [rulesOpen, setRulesOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileBookingOpen, setMobileBookingOpen] = useState(false);

    const routes = useHoverDropdown();
    const places = useHoverDropdown();

    const closeAllDropdowns = useCallback(() => {
        routes.close();
        places.close();
    }, [routes, places]);

    const handleRoutesClick = useCallback(() => {
        routes.toggle(() => {
            places.close();
            setMobileMenuOpen(false);
        });
    }, [routes, places]);

    const handlePlacesClick = useCallback(() => {
        places.toggle(() => {
            routes.close();
            setMobileMenuOpen(false);
        });
    }, [routes, places]);

    const closeMobileMenu = () => setMobileMenuOpen(false);
    const toggleMobileMenu = () => {
        closeAllDropdowns();
        setMobileMenuOpen(prev => !prev);
    };

    useCloseOnScroll(mobileMenuOpen, closeMobileMenu);

    const drawerContent = (
        <>
            <button className={css.mobileMenuItem} onClick={() => {
                setFaqOpen(true);
                closeMobileMenu();
            }}>
                <MdHelpOutline size={20}/> {t('nav.questions')}
            </button>
            <button className={css.mobileMenuItem} onClick={() => {
                closeAllDropdowns();
                routes.setOpen(true);
                closeMobileMenu();
            }}>
                <MdOutlineMap size={20}/> {t('nav.routes')}
            </button>
            <button className={css.mobileMenuItem} onClick={() => {
                closeAllDropdowns();
                places.setOpen(true);
                closeMobileMenu();
            }}>
                <MdOutlineCoffee size={20}/> {t('nav.places')}
            </button>
            <button className={css.mobileMenuItem} onClick={() => {
                setRulesOpen(true);
                closeMobileMenu();
            }}>
                <MdOutlineRule size={20}/> {t('nav.rules')}
            </button>
            <button className={css.mobileBookingBtn} onClick={() => {
                setMobileBookingOpen(true);
                closeMobileMenu();
            }}>
                {t('nav.bookNow')}
            </button>
        </>
    );

    return (
        <div className={css.articleOneBox}>
            <div className={css.articleOneBoxHeader}>
                <HeaderComponent
                    onBurgerClick={toggleMobileMenu}
                    burgerOpen={mobileMenuOpen}
                    onBurgerClose={closeMobileMenu}
                    drawerContent={drawerContent}
                />
            </div>

            <div className={css.boxTwoAll}>
                <div className={css.boxTwo}>
                    <div className={css.boxTwoContOne}>
                        <button className={`${css.navLinkBtn} ${css.navItem1}`} onClick={() => setFaqOpen(true)}>
                            {t('nav.questions')}
                        </button>

                        <div
                            ref={routes.triggerRef}
                            className={`${css.dropdown} ${css.navItem2}`}
                            onMouseEnter={routes.cancelClose}
                            onMouseLeave={routes.scheduleClose}
                            onClick={handleRoutesClick}
                        >
                            <h4 className={css.dropdownTrigger}>
                                {t('nav.routes')}
                                <span
                                    className={`${css.dropdownArrow} ${routes.open ? css.dropdownArrowOpen : ''}`}>›</span>
                            </h4>
                        </div>

                        <div
                            ref={places.triggerRef}
                            className={`${css.dropdown} ${css.navItem3}`}
                            onMouseEnter={places.cancelClose}
                            onMouseLeave={places.scheduleClose}
                            onClick={handlePlacesClick}
                        >
                            <h4 className={css.dropdownTrigger}>
                                {t('nav.places')}
                                <span
                                    className={`${css.dropdownArrow} ${places.open ? css.dropdownArrowOpen : ''}`}>›</span>
                            </h4>
                        </div>

                        <button className={`${css.navLinkBtn} ${css.navItem4}`} onClick={() => setRulesOpen(true)}>
                            {t('nav.rules')}
                        </button>
                    </div>

                    <div className={css.boxTwoContTwo}>
                        <img src={logo} alt="Logo" className={css.logoAnimate}/>
                    </div>

                    <div className={css.boxTwoContThree}>
                        <BookingModalComponent/>
                    </div>
                </div>
                <ScrollBottomButton/>
            </div>

            <RoutesDropdown
                open={routes.open}
                onMouseEnter={routes.cancelClose}
                onMouseLeave={routes.scheduleClose}
                onClose={closeAllDropdowns}
                triggerRef={routes.triggerRef}
            />

            <PlacesDropdown
                open={places.open}
                onMouseEnter={places.cancelClose}
                onMouseLeave={places.scheduleClose}
                onClose={closeAllDropdowns}
                triggerRef={places.triggerRef}
            />

            {faqOpen && <FaqModalComponent open={true} onClose={() => setFaqOpen(false)}/>}
            {rulesOpen && <RulesModalComponent open={true} onClose={() => setRulesOpen(false)}/>}
            <BookingModal open={mobileBookingOpen} onClose={() => setMobileBookingOpen(false)}/>
        </div>
    );
};

export {ArticleOneComponent};