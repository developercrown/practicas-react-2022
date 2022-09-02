import { UseFormRegister } from "react-hook-form";
import InputTypes from "../enums/InputTypes";

interface InputProperties {
    disabled: boolean,
    formState: any,
    label: string,
    name: string,
    placeholder: string,
    required: boolean,
    register: UseFormRegister<any>,
    rules: any,
    type: InputTypes,
    value: any,
};

export default InputProperties;