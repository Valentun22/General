import React, {FC, useRef, useState, useCallback} from "react";
import css from './NavbarComponent.module.css';
import logo from '../../img/logoWhite.png';
import {NavLink} from "react-router-dom";
import {RoutesDropdown} from "../RoutesLocationComponent/RoutesDropdown";
import {PlacesDropdown} from "../PlacesComponent/PlacesDropdown/PlacesDropdown";
import {HeaderComponent} from "../HeaderComponent/HeaderComponent";
import {MdOutlineHome, MdOutlineMap, MdOutlineCoffee} from "react-icons/md";
import {BookingModalComponent} from "../BookingModalComponent/ButtonsBookingModal/BookingModalComponent";
import {BookingModal} from "../BookingModalComponent/BookingModal/BookingModal";
import {useTranslation} from "react-i18next";
import {useHoverDropdown} from "../../hooks/useHoverDropdown";

interface IProps {
    title: string;
}

const NavbarComponent: FC<IProps> = ({title}) => {
    const {t} = useTranslation();
    const routes = useHoverDropdown();
    const places = useHoverDropdown();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileBookingOpen, setMobileBookingOpen] = useState(false);

    const navbarRef = useRef<HTMLDivElement>(null);

    const closeAllDropdowns = useCallback(() => {
        routes.close();
        places.close();
    }, [routes, places]);

    const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
    const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

    const handleRoutesEnter = useCallback(() => {
        routes.cancelClose();
    }, [routes]);

    const handlePlacesEnter = useCallback(() => {
        places.cancelClose();
    }, [places]);

    const handleRoutesClick = useCallback(() => {
        routes.toggle(() => places.close());
    }, [routes, places]);

    const handlePlacesClick = useCallback(() => {
        places.toggle(() => routes.close());
    }, [routes, places]);

    const drawerContent = (
        <>
            <NavLink to="/" className={css.mobileMenuItem} onClick={closeMobileMenu}>
                <MdOutlineHome size={20}/> {t('nav.home')}
            </NavLink>
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
            <button className={css.mobileBookingBtn} onClick={() => {
                closeAllDropdowns();
                setMobileBookingOpen(true);
                closeMobileMenu();
            }}>
                {t('nav.bookNow')}
            </button>
        </>
    );

    return (
        <div ref={navbarRef}>
            <div className={css.headerWrapper}>
                <HeaderComponent
                    onBurgerClick={toggleMobileMenu}
                    burgerOpen={mobileMenuOpen}
                    onBurgerClose={closeMobileMenu}
                    drawerContent={drawerContent}
                />
            </div>
            <div className={css.navbarAnimate}>
                <div className={css.boxTwoAll}>
                    <div className={css.boxTwo}>
                        <div className={css.boxTwoContOne}>
                            <NavLink to="/" className={`${css.navLink} ${css.navItem1}`}>{t('nav.home')}</NavLink>
                            <div
                                ref={routes.triggerRef}
                                className={`${css.dropdown} ${css.navItem2}`}
                                onMouseEnter={handleRoutesEnter}
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
                                onMouseEnter={handlePlacesEnter}
                                onMouseLeave={places.scheduleClose}
                                onClick={handlePlacesClick}
                            >
                                <h4 className={css.dropdownTrigger}>
                                    {t('nav.places')}
                                    <span
                                        className={`${css.dropdownArrow} ${places.open ? css.dropdownArrowOpen : ''}`}>›</span>
                                </h4>
                            </div>
                        </div>

                        <div className={css.boxTwoContThree}>
                            <BookingModalComponent/>
                        </div>
                    </div>

                    <div className={css.boxTwoContTwo}>
                        <img src={logo} alt="Logo" className={css.logoAnimate}/>
                        <h1 dangerouslySetInnerHTML={{__html: title.replace(/\n/g, '<br/>')}}/>
                    </div>
                </div>
            </div>

            <RoutesDropdown
                open={routes.open}
                onMouseEnter={handleRoutesEnter}
                onMouseLeave={routes.scheduleClose}
                onClose={closeAllDropdowns}
                triggerRef={routes.triggerRef}
            />

            <PlacesDropdown
                open={places.open}
                onMouseEnter={handlePlacesEnter}
                onMouseLeave={places.scheduleClose}
                onClose={closeAllDropdowns}
                triggerRef={places.triggerRef}
            />
            <BookingModal open={mobileBookingOpen} onClose={() => setMobileBookingOpen(false)}/>
        </div>
    );
};

export {NavbarComponent};