import {FC} from "react";
import {createPortal} from "react-dom";
import css from "./Preloader.module.css";
import logo from "../../img/logoWhite.png";

interface IProps {
    visible: boolean;
}

const Preloader: FC<IProps> = ({visible}) => {
    return createPortal(
        <div className={`${css.preloader} ${visible ? "" : css.preloaderHidden}`} aria-hidden={!visible}>
            <img src={logo} alt="General's Dacha" className={css.logo}/>
        </div>,
        document.body
    );
};

export {Preloader};
