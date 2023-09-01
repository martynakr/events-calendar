import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./Select.module.scss";

interface ISelectProps {
    options: string[];
    id: string;
}

const Select = ({ options, id }: ISelectProps) => {
    const { register, setValue } = useFormContext();
    // button to add new options
    const [displayAddBtn, setDisplayAddBtn] = useState(false);

    // all options selected
    const [allOptions, setAllOptions] = useState<string[]>([]);

    // new option to be created, whatever the user is typing
    const [newOption, setNewOption] = useState("");
    const [coloursArr, setColoursArr] = useState<string[]>([]);
    const [filteredOptions, setFilteredOptions] = useState<string[]>([
        ...options,
    ]);
    const [displayOptList, setDisplayOptList] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const {
        formState: { isSubmitSuccessful },
    } = useFormContext();

    const handleChange = (e: any) => {
        setNewOption(e.target.value);
        console.log(e.target.value);
        setFilteredOptions(
            options.filter((opt) => opt.includes(e.target.value))
        );

        if (
            filteredOptions.filter((opt) => opt.includes(e.target.value))
                .length === 0
        ) {
            setDisplayAddBtn(true);
            setDisplayOptList(false);
            return;
        }

        setDisplayAddBtn(false);
        return;
    };

    useEffect(() => {
        setAllOptions([]);
    }, [isSubmitSuccessful]);

    const handleClick = () => {
        setDisplayAddBtn(false);
        setAllOptions([...allOptions, newOption]);
        setNewOption("");
    };

    useEffect(() => {
        if (inputRef.current) inputRef.current.value = "";
        setColoursArr([...coloursArr, getRandomColor()]);
        setValue(id, allOptions);
    }, [allOptions]);

    const getRandomColor = () => {
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 30) + 70;
        100;
        const lightness = Math.floor(Math.random() * 20) + 70;

        const color =
            "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";
        return color;
    };

    const handleRemoveOption = (e: any) => {
        setAllOptions(allOptions.filter((opt) => opt !== e.target.id));
    };

    const handleOptionClick = (opt: string) => {
        setAllOptions([...allOptions, opt]);
        // if (inputRef.current) {
        //     inputRef.current.value = "";
        // }
    };

    const handleInputSelect = () => {
        setDisplayOptList(true);
    };

    return (
        <div className={styles.Select}>
            <label htmlFor="">Select tags: </label>
            <div className={styles.Select_Input_Wrapper}>
                <input
                    className={styles.Select_Input}
                    id="tagChoice"
                    placeholder="Label"
                    {...register(id)}
                    onChange={handleChange}
                    onSelect={handleInputSelect}
                    value={newOption}
                />
                {displayAddBtn && (
                    <button
                        className={styles.Select_CreateBtn}
                        onClick={handleClick}
                        type="button"
                    >
                        Create
                    </button>
                )}
            </div>
            {displayOptList && (
                <div className={styles.Select_List}>
                    {filteredOptions.map((opt, i) => {
                        return (
                            <p
                                className={styles.Select_List_Option}
                                key={Symbol(i).toString()}
                                onClick={() => handleOptionClick(opt)}
                            >
                                {opt}
                            </p>
                        );
                    })}
                </div>
            )}

            {/* <datalist id="tags">
                    {options.map((opt) => {
                        return (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        );
                    })}
                </datalist> */}

            <div className={styles.Select_Options}>
                {allOptions.length > 0 &&
                    allOptions.map((opt, i) => {
                        return (
                            <div
                                className={styles.Select_Option}
                                key={opt}
                                style={{ backgroundColor: coloursArr[i] }}
                            >
                                {opt}{" "}
                                <button id={opt} onClick={handleRemoveOption}>
                                    x
                                </button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Select;

// issues
// list does'nt disappear
// can still select the same label multiple times
// selected label doesn't disappear from te list
