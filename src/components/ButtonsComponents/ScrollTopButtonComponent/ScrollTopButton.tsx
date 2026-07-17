import { FC, useState } from "react";
import css from './ScrollTopButton.module.css';
import { useScrollVisible } from "../../../hooks/useScrollVisible";

const ScrollTopButton: FC = () => {
    const { visible, hasScrolled } = useScrollVisible();
    const [wasVisible, setWasVisible] = useState(false);

    if (visible && !wasVisible) setWasVisible(true);

    const getClass = () => {
        if (!hasScrolled) return '';
        if (visible) return css.show;
        if (!wasVisible) return '';
        return css.hide;
    };

    return (
        <button
            className={`${css.scrollTop} ${getClass()}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
    );
};

export { ScrollTopButton };