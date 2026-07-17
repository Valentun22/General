import React, {FC} from "react";
import css from './ButtonCloseComponent.module.css';

interface IProps {
    onClose: () => void;
}

const ButtonCloseComponent: FC<IProps> = ({onClose}) => {
    return (
        <>
            <button className={css.close} onClick={onClose}>✕</button>
        </>

    );
};

export {ButtonCloseComponent};