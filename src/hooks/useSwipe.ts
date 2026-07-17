import React, {useRef} from "react";

const SWIPE_THRESHOLD = 50;

export const useSwipe = (onPrev: () => void, onNext: () => void) => {
    const startX = useRef<number | null>(null);
    const isDragging = useRef(false);

    const onPointerDown = (e: React.PointerEvent) => {
        startX.current = e.clientX;
        isDragging.current = false;
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (startX.current === null) return;
        if (Math.abs(e.clientX - startX.current) > 10) {
            isDragging.current = true;
        }
    };

    const onPointerUp = (e: React.PointerEvent) => {
        if (startX.current === null) return;
        const delta = e.clientX - startX.current;
        if (Math.abs(delta) >= SWIPE_THRESHOLD) {
            if (delta < 0) onNext();
            else onPrev();
        }
        startX.current = null;
    };

    const onClickCapture = (e: React.MouseEvent) => {
        if (isDragging.current) {
            e.stopPropagation();
            isDragging.current = false;
        }
    };

    return {onPointerDown, onPointerMove, onPointerUp, onClickCapture};
};