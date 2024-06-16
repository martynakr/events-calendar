import { useEffect, useState } from "react";
import styles from "./Multiselect.module.scss";

export interface Option {
    name: string;
    // colour: string;
}

interface ChipProps {
    option: Option;
    onClick: (option: Option) => unknown;
}

// MOVE BACKGROUND COLOUR GENERATING TO BACKEND?
// add more logic to not allow for creating of the same option twice

interface SelectProps {
    options: Option[];
    id: string;
    onNewOptionSubmit: (option: Option) => unknown;
    onSelectedOptionsChange?: (options: Option[]) => unknown;
}

const Chip = ({ option, onClick }: ChipProps) => {
    return (
        <div role="selected-option">
            <span>{option.name}</span>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    onClick(option);
                }}
            >
                x
            </button>
        </div>
    );
};

const Multiselect = ({
    options,
    id,
    onNewOptionSubmit,
    onSelectedOptionsChange,
}: SelectProps) => {
    // clean up options to only get unique values just in case

    const [allOptions, setAllOptions] = useState<Option[]>([]);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [showAddBtn, setShowAddBtn] = useState<boolean>(false);
    const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
    const [newOption, setNewOption] = useState<string>("");

    const handleInputClick = () => {
        if (!showOptions) setShowOptions(true);
    };

    useEffect(() => {
        const unique = [...new Set(options)];
        setAllOptions([...unique]);
        setFilteredOptions([...unique, ...selectedOptions]);
    }, [options]);

    const handleOptionClick = (e: any) => {
        const isOptionSelected = selectedOptions.some(
            (selectedOption) => selectedOption.name === e.target.innerText
        );

        if (isOptionSelected) {
            setSelectedOptions(
                selectedOptions.filter(
                    (selectedOption) =>
                        selectedOption.name !== e.target.innerText
                )
            );
        } else {
            setSelectedOptions([
                ...selectedOptions,
                { name: e.target.innerText },
            ]);
        }
    };

    useEffect(() => {
        setFilteredOptions(allOptions);
    }, [allOptions]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (
            (e.target.value === "" && showAddBtn) ||
            allOptions.filter((opt: Option) => opt.name === e.target.value)
                .length > 0
        ) {
            setShowAddBtn(false);
        }

        const filtered = allOptions.filter((opt: Option) =>
            opt.name.includes(e.target.value)
        );
        setFilteredOptions(filtered);
        setNewOption(e.target.value);

        if (
            e.target.value.length > 0 &&
            allOptions.filter((opt: Option) => opt.name === e.target.value)
                .length === 0
        )
            setShowAddBtn(true);
    };

    const handleAddBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowAddBtn(false);
        setAllOptions([...allOptions, { name: newOption }]);
        setSelectedOptions([...selectedOptions, { name: newOption }]);
        onNewOptionSubmit({ name: newOption });
        setNewOption("");
    };

    useEffect(() => {
        if (onSelectedOptionsChange) onSelectedOptionsChange(selectedOptions);
    }, [selectedOptions]);

    const handleRemoveOptionBtnClick = (option: Option) => {
        setSelectedOptions(
            selectedOptions.filter((opt: Option) => opt.name !== option.name)
        );
    };

    return (
        <div className={styles.Select}>
            <label htmlFor={id}>Select tags: </label>
            <div className={styles.Select_Input_Wrapper}>
                {selectedOptions.length > 0 && (
                    <>
                        {selectedOptions.map((opt: Option) => (
                            <Chip
                                key={opt.name}
                                option={opt}
                                onClick={handleRemoveOptionBtnClick}
                            />
                        ))}
                    </>
                )}
                <input
                    className={styles.Select_Input}
                    id={id}
                    // replace with a prop for placeholder
                    placeholder="Label"
                    onClick={handleInputClick}
                    onChange={handleInputChange}
                    value={newOption}
                />
                {showAddBtn && <button onClick={handleAddBtnClick}>Add</button>}
            </div>
            {/* move to OptionsList element */}
            {showOptions && (
                <div className={styles.Select_List} role="filtered-options">
                    {filteredOptions.map((option: Option) => {
                        console.log(option, "option");
                        return (
                            <p
                                key={option.name}
                                onClick={handleOptionClick}
                                role="option"
                                className={styles.Select_List_Option}
                            >
                                {option.name}
                            </p>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Multiselect;
