import {FC, useState} from "react";
import React from "react";
import css from './PhotoGallery.module.css';
import {ModalLightbox} from "../../ModalLightBoxComponent/ModalLightBox";
import {useScrollLock} from "../../../hooks/useScrollLock";
import {useKeyboardNav} from "../../../hooks/useKeyboardNav";

interface IProps {
    photos: string[][];
}

const PhotoGallery: FC<IProps> = ({photos}) => {
    const [fullIndex, setFullIndex] = useState<number | null>(null);
    const flat = photos.flat();

    const closeLightbox = () => setFullIndex(null);

    useScrollLock(fullIndex !== null);
    useKeyboardNav(fullIndex !== null, () => {
    }, () => {
    }, closeLightbox);

    return (
        <>
            <div className={css.photoGrid}>
                {photos.map((row, ri) => (
                    <div key={ri} className={css.photoRow}>
                        {row.map((p, i) => (
                            <img
                                key={i}
                                src={p}
                                alt={`photo ${ri}-${i}`}
                                className={css.photoItem}
                                onClick={() => setFullIndex(ri * row.length + i)}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {fullIndex !== null && (
                <ModalLightbox
                    photos={flat}
                    index={fullIndex}
                    onClose={closeLightbox}
                    onChangeIndex={setFullIndex}
                />
            )}
        </>
    );
};

export {PhotoGallery};