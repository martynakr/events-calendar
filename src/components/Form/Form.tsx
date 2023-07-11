import { FormEventHandler, ReactNode, useContext, useEffect } from "react";
import styles from "./Form.module.scss";
import { IEvent } from "../../containers/Calendar/Calendar";
import { useFormContext } from "react-hook-form";

interface IFormProps {
    children: ReactNode;
    onSubmit: (data: IEvent) => Promise<unknown>;
}

const Form = ({ children, onSubmit }: IFormProps) => {
    const { handleSubmit } = useFormContext();

    const handleFormSubmit = async (data: any) => {
        await onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.Form}>
            {children}
        </form>
    );
};

export default Form;
