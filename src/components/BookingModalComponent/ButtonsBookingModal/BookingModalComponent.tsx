import React, {useEffect, useState} from 'react';
import css from './BookingModalComponent.module.css';
import {BookingModal} from "../BookingModal/BookingModal";
import {useTranslation} from "react-i18next";

const BookingModalComponent: React.FC = () => {
    const [bookingAttention, setBookingAttention] = useState(false);
    const [bookingOpen, setBookingOpen] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        const timer = setTimeout(() => setBookingAttention(true), 900);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <button
                className={`${css.bookingBtn} ${css.bookingBtnAnimate} ${bookingAttention ? css.bookingBtnAttention : ''}`}
                onClick={() => setBookingOpen(true)}
            >
                {t('nav.bookNow')}
            </button>

            <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)}/>
        </div>
    );
};

export {BookingModalComponent};