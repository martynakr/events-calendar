import { InputHTMLAttributes, ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./Input.module.scss";

export enum InputSizes {
    FULL = "full",
    HALF = "half",
}

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    labelText: string;
    id: string;
    validation?: any;
    // inputSize: InputSizes;
}

const Input = ({ labelText, id, validation, ...rest }: IInputProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    // const classes =
    //     inputSize === "full"
    //         ? `${styles.Input_Input}`
    //         : `${styles.Input_Input_Half}`;

    return (
        <div className={styles.Input}>
            <label htmlFor={id} className={styles.Input_Label}>
                {labelText}
            </label>

            <input {...rest} {...register(id, validation)} />
            {errors[id] && (
                <p className={styles.Input_Input_Error}>
                    {errors[id]?.message as ReactNode}
                </p>
            )}
        </div>
    );
};

export default Input;
