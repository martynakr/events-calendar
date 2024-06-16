import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

export enum ButtonVariant {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    TERTIARY = "tertiary",
    ICON = "icon",
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    onClick?: () => unknown;
    variant: ButtonVariant;
}

const Button = ({ children, onClick, variant, ...rest }: IButtonProps) => {
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

    return (
        <button onClick={onClick} className={classes} {...rest}>
            {children}
        </button>
    );
};

export default Button;
