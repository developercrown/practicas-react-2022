import { UseFormRegister } from "react-hook-form";
import InputTypes from "../enums/InputTypes";

interface InputProperties {
    disabled: boolean,
    formState: any,
    hideLabel: boolean,
    label: string,
    leftIcon: any,
    leftIconAction: any,
    name: string,
    placeholder: string,
    required: boolean,
    register: UseFormRegister<any>,
    rightIcon: any,
    rightIconAction: any,
    rules: any,
    type: InputTypes,
    value: any,
};

export default InputProperties;