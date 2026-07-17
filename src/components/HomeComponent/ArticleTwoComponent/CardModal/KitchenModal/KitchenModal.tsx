import {GiKnifeFork} from 'react-icons/gi';
import {FC, useState} from "react";
import React from "react";
import {useTranslation} from "react-i18next";
import css from '../CardsModal.module.css';

import kitchenOne from "../../../../../img/cardModal/kitchen/kitchenOne.jpg"
import kitchenTwo from "../../../../../img/cardModal/kitchen/kitchenTwo.jpg"
import kitchenThree from "../../../../../img/cardModal/kitchen/kitchenThree.jpg"
import kitchenFour from "../../../../../img/cardModal/kitchen/kitchenFour.jpg"
import kitchenFive from "../../../../../img/cardModal/kitchen/kitchenFive.jpg"
import kitchenSix from "../../../../../img/cardModal/kitchen/kitchenSix.jpg"
import kitchenSeven from "../../../../../img/cardModal/kitchen/kitchenSeven.jpg"

import {useAnimateOnScroll} from '../../../../../hooks/useAnimateOnScroll';
import {useScrollLock} from "../../../../../hooks/useScrollLock";
import {getItems} from "../../../../../constants/servicesData";
import {getFaqs} from "../../../../../constants/servicesQuestion";
import {ButtonCloseComponent} from "../../../../ButtonsComponents/CloseButtonComponent/ButtonCloseComponent";
import {ModalLightbox} from "../../../../ModalLightBoxComponent/ModalLightBox";
import {LazyImage} from "../../../../LazyImageComponent/LazyImage";

interface IProps {
    onClose: () => void;
    open: boolean;
}

const lightboxPhotos = [kitchenFour, kitchenFive, kitchenSix, kitchenSeven];

const KitchenModal: FC<IProps> = ({open, onClose}) => {
    const {t} = useTranslation();
    const [fullIndex, setFullIndex] = useState<number | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const items = getItems(t, 'kitchen');
    const faqs = getFaqs(t, 'kitchen');

    const block1 = useAnimateOnScroll(0);
    const listBlock = useAnimateOnScroll(150);
    const block2text = useAnimateOnScroll(0);
    const block2stack = useAnimateOnScroll(200);
    const block3 = useAnimateOnScroll(0);
    const block4 = useAnimateOnScroll(0);

    useScrollLock(open);

    return (
        <div className={css.overlay} onClick={onClose}>
            <div className={css.modal} onClick={e => e.stopPropagation()}>
                <ButtonCloseComponent onClose={onClose}/>

                <div className={css.header}>
                    <span className={css.headerIcon}><GiKnifeFork/></span>
                    <h2 className={css.title}>{t('modals.kitchen.title')}</h2>
                </div>

                <div className={css.photos}>
                    <div ref={block1.ref}
                         className={`${css.mainPhotoWrap} ${block1.visible ? css.visible : css.hidden}`}>
                        <LazyImage src={kitchenOne} alt="kitchen" wrapperClassName={css.photo}/>
                    </div>
                    <div ref={listBlock.ref}
                         className={`${css.listWrap} ${listBlock.visible ? css.visible : css.hidden}`}>
                        <ul className={css.list}>
                            {items.map((li, i) => (
                                <li key={i} className={css.item}>
                                    <span className={css.icon}>{li.icon}</span>
                                    {li.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={css.photosTwo}>
                    <div ref={block2text.ref}
                         className={`${css.description} ${block2text.visible ? css.visible : css.hidden}`}>
                        <p>{t('modals.kitchen.desc1')}</p>
                        <p>{t('modals.kitchen.desc2')}</p>
                    </div>
                    <div ref={block2stack.ref}
                         className={`${css.photosStack} ${block2stack.visible ? css.visible : css.hidden}`}>
                        <LazyImage src={kitchenTwo} alt="kitchenTwo" wrapperClassName={css.photoTwo}
                                   needsRelative={false} imgStyle={{objectPosition: 'center bottom'}}/>
                        <LazyImage src={kitchenThree} alt="kitchenThree" wrapperClassName={css.photoThree}
                                   needsRelative={false} imgStyle={{objectPosition: 'center top'}}/>
                    </div>
                </div>

                <div ref={block3.ref} className={`${css.boxThree} ${block3.visible ? css.visible : css.hidden}`}>
                    {lightboxPhotos.map((photo, i) => (
                        <LazyImage key={i} src={photo} alt="kitchen" fillMode={false}
                                   onClick={() => setFullIndex(i)} imgStyle={{cursor: 'pointer'}}/>
                    ))}
                </div>

                <div ref={block4.ref} className={`${css.faq} ${block4.visible ? css.visible : css.hidden}`}>
                    {faqs.map((faq, i) => (
                        <div key={i} className={css.faqItem}>
                            <button className={css.faqQuestion} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                {faq.question}
                                <span className={`${css.faqArrow} ${openFaq === i ? css.faqArrowOpen : ''}`}>+</span>
                            </button>
                            <div className={`${css.faqAnswer} ${openFaq === i ? css.faqAnswerOpen : ''}`}>
                                <p className={css.faqAnswerText}>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {fullIndex !== null && (
                <ModalLightbox photos={lightboxPhotos} index={fullIndex} onClose={() => setFullIndex(null)}
                               onChangeIndex={setFullIndex}/>
            )}
        </div>
    );
};

export {KitchenModal};
