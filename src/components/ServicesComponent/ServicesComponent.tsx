import {FC, useState, useEffect, useRef} from "react";
import {useTranslation} from "react-i18next";
import css from './ServicesComponent.module.css';
import {IServiceGeneralInterface} from "../../interfaces/IServiceGeneralInterface";
import {MdOutlineCelebration, MdOutlineDirectionsCar} from 'react-icons/md';
import partyOne from "../../video/partyOne.mp4";
import partyTwo from "../../video/partyTwo.mp4";
import partyOnePoster from "../../img/party/partyOnePoster.jpg";
import partyTwoPoster from "../../img/party/partyTwoPoster.jpg";
import {ServiceModalParty} from "./ServiceModalParty/ServiceModalParty";
import {ServiceModalDrive} from "./ServiceModalDrive/ServiceModalDrive";

const ServicesComponent: FC = () => {
    const {t} = useTranslation();
    const [selectedService, setSelectedService] = useState<IServiceGeneralInterface | null>(null);
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    const services: IServiceGeneralInterface[] = [
        {
            id: 'events',
            icon: <MdOutlineCelebration/>,
            title: t('servicesPlus.events.title'),
            shortDesc: t('servicesPlus.events.shortDesc'),
            backDesc: t('servicesPlus.events.backDesc'),
            modalText: t('servicesPlus.events.modalText'),
            photos: [],
            videos: [partyOne, partyTwo],
            videoPosters: [partyOnePoster, partyTwoPoster],
        },
        {
            id: 'transfer',
            icon: <MdOutlineDirectionsCar/>,
            title: t('servicesPlus.transfer.title'),
            shortDesc: t('servicesPlus.transfer.shortDesc'),
            backDesc: t('servicesPlus.transfer.backDesc'),
            modalText: t('servicesPlus.transfer.modalText'),
            photos: [],
        },
    ];

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            {threshold: 0.12}
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div className={`${css.wrapper} ${visible ? css.wrapperVisible : ''}`} ref={sectionRef}>
                <div className={css.header}>
                    <span className={css.subtitle}>{t('servicesPlus.subtitle')}</span>
                    <h2 className={css.title}>{t('servicesPlus.title')}</h2>
                </div>

                <div className={css.cards}>
                    {services.map((service, idx) => (
                        <div
                            key={service.id}
                            className={`${css.cardWrap} ${css[`cardWrap${idx}`]}`}
                            onClick={() => setSelectedService(service)}
                        >
                            <div className={css.card}>
                                <div className={css.cardFront}>
                                    <span className={css.cardIcon}>{service.icon}</span>
                                    <h3 className={css.cardTitle}>{service.title}</h3>
                                    <p className={css.cardDesc}>{service.shortDesc}</p>
                                    <span className={css.cardHint}>{t('servicesPlus.moreHint')}</span>
                                </div>

                                <div className={css.cardBack}>
                                    <span className={css.cardBackIcon}>{service.icon}</span>
                                    <h3 className={css.cardBackTitle}>{service.title}</h3>
                                    <p className={css.cardBackDesc}>{service.backDesc}</p>
                                    <span className={css.cardBackBtn}>{t('servicesPlus.openBtn')}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedService?.id === 'events' && (
                <ServiceModalParty
                    open={true}
                    service={selectedService}
                    onClose={() => setSelectedService(null)}
                />
            )}

            {selectedService?.id === 'transfer' && (
                <ServiceModalDrive
                    open={true}
                    service={selectedService}
                    onClose={() => setSelectedService(null)}
                />
            )}
        </>
    );
};

export {ServicesComponent};
