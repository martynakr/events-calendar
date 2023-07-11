import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./Select.module.scss";

interface ISelectProps {
    options: string[];
    id: string;
}

const Select = ({ options, id }: ISelectProps) => {
    const { register, setValue } = useFormContext();
    const [displayAddBtn, setDisplayAddBtn] = useState(false);
    const [allOptions, setAllOptions] = useState<string[]>([]);
    const [newOption, setNewOption] = useState("");
    const [coloursArr, setColoursArr] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: any) => {
        if (
            options.filter((opt) => opt.includes(e.target.value)).length === 0
        ) {
            setDisplayAddBtn(true);
            setNewOption(e.target.value);
            return;
        }

        if (
            options.filter((opt) => opt === e.target.value).length &&
            !allOptions.find((o) => o === e.target.value)
        ) {
            setAllOptions([...allOptions, e.target.value]);
        }

        setDisplayAddBtn(false);
        return;
    };

    const handleSelect = (event: any) => {
        console.log("selected from a list");
        // setAllOptions([...allOptions, event?.target.value]);
    };
    const handleClick = () => {
        setDisplayAddBtn(false);
        setAllOptions([...allOptions, newOption]);
    };

    useEffect(() => {
        if (inputRef.current) inputRef.current.value = "";
        setColoursArr([...coloursArr, getRandomColor()]);
        setValue(id, allOptions);
    }, [allOptions]);
    function getRandomColor(): string {
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 30) + 70;
        100;
        const lightness = Math.floor(Math.random() * 20) + 70;

        const color =
            "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";
        return color;
    }

    const handleRemoveOption = (e: any) => {
        setAllOptions(allOptions.filter((opt) => opt !== e.target.id));
    };

    return (
        <div>
            <label htmlFor="">Select tags: </label>
            <div className={styles.Select_Input_Wrapper}>
                {allOptions.length > 0 &&
                    allOptions.map((opt, i) => {
                        return (
                            <span
                                className={styles.Select_Option}
                                key={opt}
                                style={{ backgroundColor: coloursArr[i] }}
                            >
                                {opt}{" "}
                                <button id={opt} onClick={handleRemoveOption}>
                                    x
                                </button>
                            </span>
                        );
                    })}
                <input
                    className={styles.Select_Input}
                    list="tags"
                    id="tagChoice"
                    placeholder="Label"
                    onSelect={handleChange}
                    {...register(id)}
                    multiple
                    ref={inputRef}
                />
                {displayAddBtn && (
                    <button onClick={handleClick} type="button">
                        Create
                    </button>
                )}
                <datalist id="tags">
                    {options.map((opt) => {
                        return (
                            <option
                                key={opt}
                                value={opt}
                                // onClick={handleOptionClick}
                            >
                                {opt}
                            </option>
                        );
                    })}
                </datalist>
            </div>
        </div>
    );
};

export default Select;
