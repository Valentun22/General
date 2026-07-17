import React, {FC, useRef, useEffect, useCallback} from "react";
import css from "./BurgerButton.module.css";

interface IProps {
    isOpen?: boolean;
    onClick?: () => void;
    onClose?: () => void;
    className?: string;
    menuTop?: number;
    menuWidth?: number;
    children?: React.ReactNode;
}

const BurgerButton: FC<IProps> = ({
                                      isOpen = false,
                                      onClick,
                                      onClose,
                                      className,
                                      menuTop = 60,
                                      menuWidth = 260,
                                      children,
                                  }) => {
    const handleClose = useCallback(() => {
        onClose?.();
    }, [onClose]);

    const menuRef = useRef<HTMLDivElement>(null);
    const burgerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!isOpen) return;
        const handleOutside = (e: MouseEvent) => {
            if (
                menuRef.current && !menuRef.current.contains(e.target as Node) &&
                burgerRef.current && !burgerRef.current.contains(e.target as Node)
            ) {
                handleClose();
            }
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, [isOpen, handleClose]);

    return (
        <div>
            <button
                ref={burgerRef}
                className={`${css.burgerBtn} ${isOpen ? css.burgerOpen : ''} ${className ?? ''}`}
                onClick={isOpen ? handleClose : onClick}
                aria-label="Меню"
            >
                <span className={css.burgerLine}/>
                <span className={css.burgerLine}/>
                <span className={css.burgerLine}/>
            </button>

            {isOpen && (
                <div className={css.drawerOverlay} onClick={handleClose}/>
            )}

            <div
                ref={menuRef}
                className={`${css.drawer} ${isOpen ? css.drawerOpen : ''}`}
                style={{top: menuTop, width: menuWidth}}
            >
                <div className={css.drawerContent}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export {BurgerButton};