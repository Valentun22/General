import {useCallback, useRef, useState} from "react";

export function useHoverDropdown(closeDelay = 200) {
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const clearPendingClose = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    const scheduleClose = useCallback(() => {
        timeoutRef.current = setTimeout(() => setOpen(false), closeDelay);
    }, [closeDelay]);

    const cancelClose = useCallback(() => {
        clearPendingClose();
    }, [clearPendingClose]);

    const close = useCallback(() => {
        clearPendingClose();
        setOpen(false);
    }, [clearPendingClose]);

    const toggle = useCallback((onToggle?: () => void) => {
        clearPendingClose();
        onToggle?.();
        setOpen(prev => !prev);
    }, [clearPendingClose]);

    return {open, setOpen, triggerRef, scheduleClose, cancelClose, close, toggle};
}