import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styles from "./Form.module.scss";

interface IDefaults {
    startDate: string;
    startHour: string;
    finishHour: string;
}

interface IFormProps {
    children: ReactNode;
    onSubmit: (data: any) => unknown;
    defaults: IDefaults;
}

const Form = ({ children, onSubmit, defaults }: IFormProps) => {
    const methods = useForm({
        defaultValues: defaults,
    });
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className={styles.Form}
            >
                {children}
            </form>
        </FormProvider>
    );
};

export default Form;
