import React from 'react';
import {createPortal} from 'react-dom';
import css from './BookingModal.module.css';
import {FaPhone, FaInstagram} from 'react-icons/fa';
import logoWhiteMin from '../../../img/logoWhiteMin.png';
import {useScrollLock} from "../../../hooks/useScrollLock";
import {useTranslation} from "react-i18next";

interface IProps {
    onClose: () => void;
    open: boolean;
}

const BookingModal: React.FC<IProps> = ({open, onClose}) => {
    useScrollLock(open);
    const {t} = useTranslation();

    if (!open) return null;

    return createPortal(
        <div
            className={css.overlay}
            onClick={onClose}
        >
            <div className={css.modal} onClick={e => e.stopPropagation()}>
                <button className={css.closeBtn} onClick={onClose}>✕</button>

                <div className={css.left}>
                    <div className={css.leftInner}>
                        <h2 className={css.leftTitle}>{t('bookNow.textOne')}</h2>
                        <p className={css.leftSubtitle}>{t('bookNow.textTwo')}</p>

                        <div className={css.contacts}>
                            <a href="tel:+380500569522" className={css.contactItem}>
                                <span className={css.contactIcon}><FaPhone/></span>
                                <span>+380 (50) 056 95 22</span>
                            </a>
                            <a href="https://ig.me/m/_generals_dacha_" target="_blank" rel="noreferrer"
                               className={css.contactItem}>
                                <span className={css.contactIcon}><FaInstagram/></span>
                                <span>Instagram</span>
                            </a>
                        </div>
                    </div>
                    <div className={css.logoModal}>
                        <img src={logoWhiteMin} alt={'logoWhite'} />
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export {BookingModal};