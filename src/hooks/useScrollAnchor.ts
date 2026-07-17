import { useEffect } from 'react';

export function useScrollAnchor(): void {
    useEffect(() => {
        const ANCHOR_Y_RATIO = 0.15;

        let anchorEl: Element | null = null;
        let anchorOffsetFromTop = 0;
        let rafId = 0;

        const getBlockAncestor = (el: Element | null): Element | null => {
            while (el) {
                if (
                    el !== document.documentElement &&
                    el !== document.body &&
                    el.clientHeight > 10
                ) {
                    return el;
                }
                el = el.parentElement;
            }
            return null;
        };

        const saveAnchor = (): void => {
            const x = window.innerWidth / 2;
            const y = window.innerHeight * ANCHOR_Y_RATIO;
            const hit = document.elementFromPoint(x, y);
            const el = getBlockAncestor(hit);
            if (el) {
                anchorEl = el;
                anchorOffsetFromTop = el.getBoundingClientRect().top;
            }
        };

        const restoreAnchor = (): void => {
            if (!anchorEl) return;
            const newTop = anchorEl.getBoundingClientRect().top;
            const delta = newTop - anchorOffsetFromTop;
            if (Math.abs(delta) > 1) {
                window.scrollBy({ top: delta, behavior: 'instant' as ScrollBehavior });
            }
            saveAnchor();
        };

        const onScroll = (): void => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(saveAnchor);
        };

        saveAnchor();

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', restoreAnchor);

        return (): void => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', restoreAnchor);
            cancelAnimationFrame(rafId);
        };
    }, []);
}