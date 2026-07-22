import { useState, useCallback } from 'react';

export function usePressState() {
    const [isPressed, setIsPressed] = useState(false);

    const press = useCallback(() => setIsPressed(true), []);
    const release = useCallback(() => setIsPressed(false), []);

    const pressHandlers = {
        onPointerDown: press,
        onPointerUp: release,
        onPointerCancel: release,
        onPointerLeave: release,
    };

    return { isPressed, press, release, pressHandlers };
}