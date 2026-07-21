import React, {useEffect, useState} from 'react';
import css from './BookingModalComponent.module.css';
import {BookingModal} from "../BookingModal/BookingModal";
import {useTranslation} from "react-i18next";

const BookingModalComponent: React.FC = () => {
    const [bookingAttention, setBookingAttention] = useState(false);
    const [bookingOpen, setBookingOpen] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        const timer = setTimeout(() => setBookingAttention(true), 900);
        return () => clearTimeout(timer);
    }, []);

    const press = () => setIsPressed(true);
    const release = () => setIsPressed(false);

    return (
        <div>
            <button
                className={`${css.bookingBtn} ${css.bookingBtnAnimate} ${bookingAttention ? css.bookingBtnAttention : ''} ${isPressed ? css.bookingBtnPressed : ''}`}
                onClick={() => setBookingOpen(true)}
                onTouchStart={press}
                onTouchEnd={release}
                onTouchCancel={release}
                onMouseDown={press}
                onMouseUp={release}
                onMouseLeave={release}
            >
                {t('nav.bookNow')}
            </button>

            <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)}/>
        </div>
    );
};

export {BookingModalComponent};