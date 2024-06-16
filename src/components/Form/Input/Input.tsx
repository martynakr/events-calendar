import { InputHTMLAttributes, ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    labelText: string;
    id: string;
    validation?: any;
}

const Input = ({ labelText, id, validation, ...rest }: InputProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className={styles.Input}>
            <label htmlFor={id} className={styles.Input_Label}>
                {labelText}
            </label>

            <input
                {...rest}
                {...register(id, validation)}
                className={styles.Input_Field}
            />
            {errors[id] && (
                <p className={styles.Input_Error}>
                    {errors[id]?.message as ReactNode}
                </p>
            )}
        </div>
    );
};

export default Input;
