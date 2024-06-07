import { useFormContext } from "react-hook-form";
import Multiselect, { Option } from "../Multiselect";

interface HookFormMultiselectProps {
    options: Option[];
    id: string;
}

const HookFormMultiselect = ({ options, id }: HookFormMultiselectProps) => {
    const { setValue } = useFormContext();

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
            />
        </div>
    );
};

export default HookFormMultiselect;
