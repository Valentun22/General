import {FC, RefCallback} from "react";
import css from '../ArticleTwoComponent.module.css';
import {usePressState} from "../../../../hooks/usePressState";

interface ICardTileProps {
    img: string;
    title: string;
    btnLabel: string;
    delay: number;
    isVisible: boolean;
    onClick: () => void;
    innerRef: RefCallback<HTMLDivElement>;
}

const CardTile: FC<ICardTileProps> = ({img, title, btnLabel, delay, isVisible, onClick, innerRef}) => {
    const cardPress = usePressState();

    return (
        <div
            className={`${css.card} ${css.cardAnimate} ${isVisible ? css.cardVisible : ''} ${cardPress.isPressed ? css.cardPressed : ''}`}
            ref={innerRef}
            style={{transitionDelay: `${delay}s`}}
            onClick={onClick}
            {...cardPress.pressHandlers}
        >
            <div className={css.cardBg} style={{backgroundImage: `url(${img})`}}/>
            <div className={css.cardText}>
                <h3>{title}</h3>
                <button
                    className={css.btn}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                    }}
                >
                    {btnLabel}
                </button>
            </div>
        </div>
    );
};

export {CardTile};