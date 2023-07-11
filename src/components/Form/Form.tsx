import {
    BaseSyntheticEvent,
    FormEventHandler,
    ReactNode,
    useContext,
    useEffect,
} from "react";
import styles from "./Form.module.scss";

interface IFormProps {
    children: ReactNode;
    onSubmit: (
        e?: BaseSyntheticEvent<object, any, any> | undefined
    ) => Promise<void>;
}

const Form = ({ children, onSubmit }: IFormProps) => {
    return (
        <form onSubmit={onSubmit} className={styles.Form}>
            {children}
        </form>
    );
};

export default Form;
