import {CSSProperties, FC, MouseEventHandler, useState} from "react";
import css from "./LazyImage.module.css";
import logo from "../../img/logo.png";

interface IProps {
    src: string;
    alt?: string;
    /** клас, який раніше висів на <img> (розмір/позиція/border) — тепер на обгортці */
    wrapperClassName?: string;
    /** true (за замовч.) — картинка заповнює обгортку на 100% (width/height/object-fit) */
    fillMode?: boolean;
    /** true (за замовч.) — обгортці ставиться position:relative.
     *  Постав false, якщо wrapperClassName вже має свій position (absolute/relative/fixed/sticky) */
    needsRelative?: boolean;
    imgStyle?: CSSProperties;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const LazyImage: FC<IProps> = ({
    src,
    alt = "",
    wrapperClassName,
    fillMode = true,
    needsRelative = true,
    imgStyle,
    onClick,
}) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            className={wrapperClassName}
            onClick={onClick}
            style={{
                ...(needsRelative ? {position: "relative"} : {}),
                overflow: "hidden",
            }}
        >
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                style={
                    fillMode
                        ? {width: "100%", height: "100%", display: "block", objectFit: "cover", ...imgStyle}
                        : imgStyle
                }
            />
            <div className={`${css.placeholder} ${loaded ? css.placeholderHidden : ""}`} aria-hidden={loaded}>
                <img src={logo} alt="" className={css.placeholderLogo}/>
            </div>
        </div>
    );
};

export {LazyImage};
