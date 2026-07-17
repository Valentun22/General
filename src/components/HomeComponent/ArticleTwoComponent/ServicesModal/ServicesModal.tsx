import React, {FC} from "react";
import {useScrollLock} from "../../../../hooks/useScrollLock";
import {useTranslation} from "react-i18next";
import {MdBathtub, MdHome} from "react-icons/md";
import {getItems} from "../../../../constants/servicesData";
import {GiKnifeFork, GiMountains} from "react-icons/gi";
import css from "../ArticleTwoComponent.module.css";
import {ButtonCloseComponent} from "../../../ButtonsComponents/CloseButtonComponent/ButtonCloseComponent";

interface IProps {
    open: boolean;
    onClose: () => void;
}

export const ServicesModal: FC<IProps> = ({open, onClose}) => {
    useScrollLock(open);
    const {t} = useTranslation();

    const allServices = [
        {icon: <MdHome/>, category: t('articleTwo.cards.house'), items: getItems(t, 'house')},
        {icon: <GiKnifeFork/>, category: t('articleTwo.cards.kitchen'), items: getItems(t, 'kitchen')},
        {icon: <MdBathtub/>, category: t('articleTwo.cards.bathroom'), items: getItems(t, 'bathroom')},
        {icon: <GiMountains/>, category: t('articleTwo.cards.territory'), items: getItems(t, 'territory')},
    ];

    return (
        <div className={css.modalOverlay} onClick={onClose}>
            <div className={css.modal} onClick={e => e.stopPropagation()}>
                <ButtonCloseComponent onClose={onClose}/>
                <h2 className={css.modalTitle}>{t('articleTwo.allServicesTitle')}</h2>
                <div className={css.modalCategoryGrid}>
                    {allServices.map((cat, i) => (
                        <div className={css.modalCategory} key={i}>
                            <div className={css.modalCategoryHeader}>
                                <span className={css.modalCategoryIcon}>{cat.icon}</span>
                                <h3>{cat.category}</h3>
                            </div>
                            <ul className={css.modalList}>
                                {cat.items.map((item, j) => (
                                    <li key={j}>
                                        <span className={css.modalItemIcon}>{item.icon}</span>
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};