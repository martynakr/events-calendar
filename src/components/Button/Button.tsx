import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

export enum ButtonVariant {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    TERTIARY = "tertiary",
    ICON = "icon",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    onClick?: () => unknown;
    variant: ButtonVariant;
    extraClasses?: string;
}

const Button = ({
    children,
    onClick,
    variant,
    extraClasses,
    ...rest
}: ButtonProps) => {
    let classes;

    if (variant === "primary") {
        classes = `${styles.Button} ${styles.Button_Primary}`;
    }

    if (variant === "secondary") {
        classes = `${styles.Button} ${styles.Button_Secondary}`;
    }

    if (variant === "icon") {
        classes = `${styles.Button} ${styles.Button_Icon}`;
    }

    if (extraClasses) {
        classes += ` ${extraClasses}`;
    }
    return (
        <button onClick={onClick} className={classes} {...rest}>
            {children}
        </button>
    );
};

export default Button;
