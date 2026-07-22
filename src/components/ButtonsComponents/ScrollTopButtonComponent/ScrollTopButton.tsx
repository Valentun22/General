import {FC, useState} from "react";
import css from './ScrollTopButton.module.css';
import {useScrollVisible} from "../../../hooks/useScrollVisible";

const ScrollTopButton: FC = () => {
    const {visible, hasScrolled} = useScrollVisible();
    const [wasVisible, setWasVisible] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    if (visible && !wasVisible) setWasVisible(true);

    const getClass = () => {
        if (!hasScrolled) return '';
        if (visible) return css.show;
        if (!wasVisible) return '';
        return css.hide;
    };

    const press = () => setIsPressed(true);
    const release = () => setIsPressed(false);

    return (
        <button
            className={`${css.scrollTop} ${getClass()} ${isPressed ? css.scrollTopPressed : ''}`}
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            onTouchStart={press}
            onTouchEnd={release}
            onTouchCancel={release}
            onMouseDown={press}
            onMouseUp={release}
            onMouseLeave={release}
        />
    );
};

export {ScrollTopButton};