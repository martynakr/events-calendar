import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./Input.module.scss";

export enum InputSizes {
    FULL = "full",
    HALF = "half",
}

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    labelText: string;
    id: string;
    // inputSize: InputSizes;
}

const Input = ({ labelText, id, ...rest }: IInputProps) => {
    const { register } = useFormContext();

    // const classes =
    //     inputSize === "full"
    //         ? `${styles.Input_Input}`
    //         : `${styles.Input_Input_Half}`;
    return (
        <div className={styles.Input}>
            <label htmlFor={id} className={styles.Input_Label}>
                {labelText}
            </label>

            <input {...rest} {...register(id)} />
        </div>
    );
};

export default Input;
