import { ReactNode, useEffect, useRef } from "react";
import styles from "./Modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
    children: ReactNode;
    show: boolean;
    setShow: (val: boolean) => unknown;
}

const Modal = ({ children, show, setShow }: ModalProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const classes = show
        ? `${styles.Modal}`
        : `${styles.Modal} ${styles.Modal_Hide}`;

    const handleClick = () => {
        setShow(false);
    };

    useEffect(() => {
        const closeModal = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setShow(false);
            }
        };

        document.addEventListener("mousedown", closeModal);

        return () => {
            document.removeEventListener("mousedown", closeModal);
        };
    }, [ref]);
    return (
        <div className={classes}>
            <div className={styles.Modal_Background} ref={ref}>
                <FontAwesomeIcon
                    icon={faXmark}
                    className={styles.Modal_Close}
                    onClick={handleClick}
                />
                <div className={styles.Modal_Content}>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
