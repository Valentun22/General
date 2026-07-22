import { useState, useCallback } from 'react';

export function usePressState() {
    const [isPressed, setIsPressed] = useState(false);

    const press = useCallback(() => setIsPressed(true), []);
    const release = useCallback(() => setIsPressed(false), []);

    const pressHandlers = {
        onTouchStart: press,
        onTouchEnd: release,
        onTouchCancel: release,
        onMouseDown: press,
        onMouseUp: release,
        onMouseLeave: release,
    };

    return { isPressed, press, release, pressHandlers };
}