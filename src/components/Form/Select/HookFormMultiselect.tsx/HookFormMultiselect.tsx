import { useFormContext } from "react-hook-form";
import Multiselect from "../Multiselect";

const HookFormMultiselect = ({ options, id }: any) => {
    const { setValue } = useFormContext();

    const onSelectedOptionsChange = (val: any) => {
        setValue(id, val);
    };

    return (
        <div>
            <Multiselect
                options={options}
                id={id}
                onNewOptionSubmit={() => {
                    console.log("");
                }}
                onSelectedOptionsChange={onSelectedOptionsChange}
            />
        </div>
    );
};

export default HookFormMultiselect;
