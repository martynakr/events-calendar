import { useFormContext } from "react-hook-form";
import Multiselect, { Option } from "../Multiselect";
import { useEffect } from "react";

interface HookFormMultiselectProps {
    options: Option[];
    id: string;
    clearOnSubmit: boolean;
}

const HookFormMultiselect = ({
    options,
    id,
    clearOnSubmit,
}: HookFormMultiselectProps) => {
    const {
        setValue,
        formState: { isSubmitSuccessful },
    } = useFormContext();

    const onSelectedOptionsChange = (val: Option | Option[]) => {
        setValue(id, val);
    };

    return (
        <div>
            <Multiselect
                options={options}
                id={id}
                // make this prop optional
                onNewOptionSubmit={() => {
                    console.log("");
                }}
                onSelectedOptionsChange={onSelectedOptionsChange}
                clear={clearOnSubmit}
            />
        </div>
    );
};

export default HookFormMultiselect;
