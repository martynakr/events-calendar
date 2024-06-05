import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./Multiselect.module.scss";

interface Option {
    name: string;
}

interface ChipProps {
    option: Option;
    onClick: (option: Option) => unknown;
}

// MOVE BACKGROUND COLOUR GENERATING TO BACKEND

interface ISelectProps {
    options: Option[];
    id: string;
    // what to do when it's in a form
    onNewOptionSubmit: (option: Option) => unknown;
    onSelectedOptionsChange?: (options: Option[]) => unknown;
}

// I want new option to persist

const Chip = ({ option, onClick }: ChipProps) => {
    return (
        <div>
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
}: ISelectProps) => {
    // clean up options to only get unique values just in case
    const unique = [...new Set(options)];
    const [allOptions, setAllOptions] = useState<Option[]>(unique);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [showAddBtn, setShowAddBtn] = useState<boolean>(false);
    const [filteredOptions, setFilteredOptions] = useState<Option[]>([
        ...unique,
        ...selectedOptions,
    ]);
    const [newOption, setNewOption] = useState<string>("");

    const handleInputClick = () => {
        if (!showOptions) setShowOptions(true);
    };

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
        if (e.target.value === "" && showAddBtn) {
            setShowAddBtn(false);
        }

        const filtered = filteredOptions.filter((opt: Option) =>
            opt.name.includes(e.target.value)
        );
        setFilteredOptions(filtered);
        setNewOption(e.target.value);

        if (e.target.value.length > 0) setShowAddBtn(true);
    };

    useEffect(() => {}, [selectedOptions]);

    const handleAddBtnClick = (e: any) => {
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
            <label htmlFor="">Select tags: </label>
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
                <div className={styles.Select_List}>
                    {filteredOptions.map((option: Option) => {
                        return (
                            <p key={option.name} onClick={handleOptionClick}>
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
