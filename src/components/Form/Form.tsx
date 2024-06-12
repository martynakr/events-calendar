import { ReactNode } from "react";
import styles from "./Form.module.scss";
import { useFormContext } from "react-hook-form";

interface FormProps {
    children: ReactNode;
    onSubmit: (data: any) => Promise<unknown>;
}

const Form = ({ children, onSubmit }: FormProps) => {
    const { handleSubmit } = useFormContext();

    const handleFormSubmit = async (data: any) => {
        await onSubmit(data);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className={styles.Form}
            >
                {children}
            </form>
        </>
    );
};

export default Form;
