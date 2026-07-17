import React, {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import css from './RulesModalComponent.module.css';
import {useScrollLock} from "../../hooks/useScrollLock";
import {getRestRules} from "../../constants/servicesRestRules";
import {ButtonCloseComponent} from "../ButtonsComponents/CloseButtonComponent/ButtonCloseComponent";

interface IProps {
    onClose: () => void;
    open: boolean;
}

const RulesModalComponent: FC<IProps> = ({open, onClose}) => {
    const {t} = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const rules = getRestRules(t);

    useScrollLock(open);

    return (
        <div className={css.overlay} onClick={onClose}>
            <div className={css.modal} onClick={e => e.stopPropagation()}>
                <ButtonCloseComponent onClose={onClose}/>

                <div className={css.header}>
                    <span className={css.subtitle}>General's Dacha</span>
                    <h2 className={css.title}>{t('rules.title')}</h2>
                </div>

                <div className={css.list}>
                    {rules.map((section, i) => (
                        <div
                            key={i}
                            className={`${css.item} ${openIndex === i ? css.itemOpen : ''}`}
                        >
                            <button
                                className={css.question}
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            >
                                <span className={css.number}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className={css.questionText}>{section.title}</span>
                                <span className={`${css.icon} ${openIndex === i ? css.iconOpen : ''}`}>
                                    +
                                </span>
                            </button>

                            <div className={`${css.answer} ${openIndex === i ? css.answerOpen : ''}`}>
                                <ul className={css.ruleList}>
                                    {section.items.map((item, j) => (
                                        <li key={j} className={css.ruleItem}>
                                            <span className={css.dot}>—</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export {RulesModalComponent};