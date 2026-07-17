import {FC, useState} from "react";
import css from './ServiceModalParty.module.css';
import {useScrollLock} from "../../../hooks/useScrollLock";
import {IServiceGeneralInterface} from "../../../interfaces/IServiceGeneralInterface";
import {VideoPlayer} from "../../VideoPlayerComponent/VideoPlayerComponent";
import {useTranslation} from "react-i18next";

interface IProps {
    service: IServiceGeneralInterface;
    onClose: () => void;
    open: boolean;
}

const ServiceModalParty: FC<IProps> = ({open, service, onClose}) => {
    useScrollLock(open);
    const [activeVideo, setActiveVideo] = useState<number | null>(null);
    const {t} = useTranslation();

    return (
        <div className={css.overlay} onClick={onClose}>
            <div className={css.modal} onClick={e => e.stopPropagation()}>
                <button className={css.close} onClick={onClose}>✕</button>

                <div className={css.modalHeader}>
                    <span className={css.modalSubtitle}>General's Dacha</span>
                    <h2 className={css.modalTitle}>{service.title}</h2>
                </div>

                <div className={css.modalBody}>
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

                    {(service.photos.length > 0 || (service.videos ?? []).length > 0) && (
                        <div className={css.modalPhotos}>
                            {service.photos.map((photo, i) => (
                                <img
                                    key={`photo-${i}`}
                                    src={photo}
                                    alt={service.title}
                                    className={css.modalPhoto}
                                />
                            ))}

                            {(service.videos ?? []).length > 0 && (
                                <div className={css.videosRow}>
                                    {(service.videos ?? []).map((video, i) => (
                                        <VideoPlayer
                                            key={`video-${i}`}
                                            src={video}
                                            poster={service.videoPosters?.[i]}
                                            index={i}
                                            activeIndex={activeVideo}
                                            onPlay={setActiveVideo}
                                            wrapClassName={css.modalVideoWrap}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export {ServiceModalParty};