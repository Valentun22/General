import {FC, useMemo, useState} from "react";
import React from "react";
import css from "./FaqModalComponent.module.css";

import {GiMountains, GiKnifeFork} from "react-icons/gi";
import {MdHome, MdBathtub} from "react-icons/md";

import {IFaqCategoryInterface} from "../../interfaces/IFaqInterface";
import {useScrollLock} from "../../hooks/useScrollLock";
import {ButtonCloseComponent} from "../ButtonsComponents/CloseButtonComponent/ButtonCloseComponent";

import {useTranslation} from "react-i18next";
import {getFaqs} from "../../constants/servicesQuestion";

interface IProps {
    onClose: () => void;
    open: boolean;
}

const FaqModalComponent: FC<IProps> = ({open, onClose}) => {
    const {t} = useTranslation();

    const [openKey, setOpenKey] = useState<string | null>(null);

    useScrollLock(open);

    const categoriesQuestion: IFaqCategoryInterface[] = useMemo(
        () => [
            {
                icon: <MdHome/>,
                title: t("faq.categories.house"),
                items: getFaqs(t, "house"),
            },
            {
                icon: <GiMountains/>,
                title: t("faq.categories.territory"),
                items: getFaqs(t, "territory"),
            },
            {
                icon: <GiKnifeFork/>,
                title: t("faq.categories.kitchen"),
                items: getFaqs(t, "kitchen"),
            },
            {
                icon: <MdBathtub/>,
                title: t("faq.categories.bathroom"),
                items: getFaqs(t, "bathroom"),
            },
        ],
        [t]
    );

    const toggleItem = (catI: number, itemI: number) => {
        const key = `${catI}-${itemI}`;
        setOpenKey((prev) => (prev === key ? null : key));
    };

    return (
        <div className={css.overlay} onClick={onClose}>
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                <ButtonCloseComponent onClose={onClose}/>

                <div className={css.header}>
                    <span className={css.subtitle}>General's Dacha</span>
                    <h2 className={css.title}>{t("faq.title")}</h2>
                </div>

                <div className={css.categories}>
                    {categoriesQuestion.map((cat, catI) => (
                        <div key={catI} className={css.category}>
                            <div className={css.categoryHeader}>
                                <span className={css.categoryIcon}>
                                    {cat.icon}
                                </span>

                                <h3 className={css.categoryTitle}>
                                    {cat.title}
                                </h3>
                            </div>

                            <div className={css.list}>
                                {cat.items.map((faq, itemI) => {
                                    const key = `${catI}-${itemI}`;
                                    const isOpen = openKey === key;

                                    return (
                                        <div
                                            key={itemI}
                                            className={`${css.item} ${
                                                isOpen ? css.itemOpen : ""
                                            }`}
                                        >
                                            <button
                                                className={css.question}
                                                onClick={() =>
                                                    toggleItem(catI, itemI)
                                                }
                                            >
                                                <span
                                                    className={
                                                        css.questionText
                                                    }
                                                >
                                                    {faq.question}
                                                </span>

                                                <span
                                                    className={`${css.icon} ${
                                                        isOpen
                                                            ? css.iconOpen
                                                            : ""
                                                    }`}
                                                >
                                                    +
                                                </span>
                                            </button>

                                            <div
                                                className={`${css.answer} ${
                                                    isOpen
                                                        ? css.answerOpen
                                                        : ""
                                                }`}
                                            >
                                                <p className={css.answerText}>
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export {FaqModalComponent};