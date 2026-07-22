import {FC} from "react";
import css from '../PlacesDropdown/PlacesDropdown.module.css';
import {usePressState} from "../../../hooks/usePressState";

interface IPlaceCardProps {
    mainImg?: string;
    name: string;
    category: string;
    onClick: () => void;
}

const PlaceCard: FC<IPlaceCardProps> = ({mainImg, name, category, onClick}) => {
    const cardPress = usePressState();

    return (
        <div
            className={`${css.card} ${cardPress.isPressed ? css.modalHoverBtnPress : ''}`}
            onClick={onClick}
            {...cardPress.pressHandlers}
        >
            <div className={css.cardImg}>
                {mainImg && <img src={mainImg} alt={name}/>}
                <span className={css.cardCategory}>{category}</span>
            </div>
            <span className={css.cardLabel}>{name}</span>
        </div>
    );
};

export {PlaceCard};