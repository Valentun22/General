import {FC} from "react";
import {NavLink} from "react-router-dom";
import css from '../RoutesDropdown.module.css';
import {usePressState} from "../../../hooks/usePressState";

interface IRouteCardProps {
    path: string;
    img: string;
    label: string;
    distance: string;
    distanceLabel: string;
}

const RouteCard: FC<IRouteCardProps> = ({path, img, label, distance, distanceLabel}) => {
    const cardPress = usePressState();

    return (
        <NavLink
            to={path}
            className={`${css.card} ${cardPress.isPressed ? css.cardPressed : ''}`}
            {...cardPress.pressHandlers}
        >
            <div className={css.cardImg}>
                <img src={img} alt={label}/>
                <span className={css.cardDistance}>
                    {distanceLabel} {distance}
                </span>
            </div>
            <span className={css.cardLabel}>{label}</span>
        </NavLink>
    );
};

export {RouteCard};