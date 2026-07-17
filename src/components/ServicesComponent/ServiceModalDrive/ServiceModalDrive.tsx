import React, {FC} from "react";
import css from './ServiceModalDrive.module.css';
import {useScrollLock} from "../../../hooks/useScrollLock";
import {IServiceGeneralInterface} from "../../../interfaces/IServiceGeneralInterface";
import {ButtonCloseComponent} from "../../ButtonsComponents/CloseButtonComponent/ButtonCloseComponent";
import {useTranslation} from "react-i18next";

interface IProps {
    service: IServiceGeneralInterface;
    onClose: () => void;
    open: boolean;
}

const ServiceModalDrive: FC<IProps> = ({open, service, onClose}) => {
    useScrollLock(open);
    const {t} = useTranslation();

    return (
        <div className={css.overlay} onClick={onClose}>
            <div className={css.modal} onClick={e => e.stopPropagation()}>
                <ButtonCloseComponent onClose={onClose}/>

                <div className={css.modalHeader}>
                    <span className={css.modalSubtitle}>General's Dacha</span>
                    <h2 className={css.modalTitle}>{service.title}</h2>
                </div>

                <div className={css.modalBodyDrive}>
                    <div className={css.modalText}>
                        {service.modalText.split('\n\n').map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                        <a
                            href="https://ig.me/m/_generals_dacha_"
                            target="_blank"
                            rel="noreferrer"
                            className={css.modalBtn}
                        >
                            {t('servicesTextBut.textOne')}
                        </a>
                    </div>

                    <div className={css.modalMapWrap}>
                        <iframe
                            title="Маршрут від вокзалу"
                            src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d49766.766856596908!2d23.483935992503945!3d49.03828894171067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m3!3m2!1d49.034379099999995!2d23.5049319!4m3!3m2!1d49.047404099999994!2d23.5138583!5e0!3m2!1suk!2sua!4v1779870780149!5m2!1suk!2sua"
                            className={css.modalMap}
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        <div className={css.mapBadge}>
                            <span className={css.mapBadgeIcon}>🚗</span>
                            <span>{t('servicesTextBut.textTwo')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {ServiceModalDrive};