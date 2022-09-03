import React, { useState } from 'react';
import InputTypes from './enums/InputTypes';
import InputProperties from './interfaces/InputProperties';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faSearch  } from '@fortawesome/free-solid-svg-icons'

const createDefaultObjectValue = (value: any): any => {
    return {
        value
    }
}

const validateRuleObject = (source: any, column: string, type: string, defaultValue: any = null): any => {
    if (source && source.hasOwnProperty(column)) {
        if (typeof source[column] === type) {
            return createDefaultObjectValue(source[column])
        }
        return source[column]
    }
    return defaultValue
}

const Input = (props: any) => {
    const {
        disabled,
        formState,
        hideLabel,
        label,
        leftIcon,
        leftIconAction,
        name,
        placeholder,
        register,
        rightIcon,
        rightIconAction,
        rules,
        type,
        value
    }: InputProperties = props;


    const { errors } = formState;

    const inputType: string = InputTypes[type] ? InputTypes[type] : InputTypes['text'];

    const outputCfg: any = {};

    if (type === InputTypes.number) {
        outputCfg["valueAsNumber"] = true;
    }

    if (type === InputTypes.date) {
        outputCfg["valueADate"] = true;
    }

    const inputRules: any = {};

    if (rules) {
        if (rules.hasOwnProperty('required')) {
            inputRules["required"] = validateRuleObject(rules, 'required', 'boolean', false);
        }

        if (rules.hasOwnProperty('min')) {
            inputRules["min"] = validateRuleObject(rules, 'min', 'number');
        }

        if (rules.hasOwnProperty('max')) {
            inputRules["max"] = validateRuleObject(rules, 'max', 'number');
        }

        if (rules.hasOwnProperty('minLength')) {
            inputRules["minLength"] = validateRuleObject(rules, 'minLength', 'number');
        }

        if (rules.hasOwnProperty('maxLength')) {
            inputRules["maxLength"] = validateRuleObject(rules, 'maxLength', 'number');
        }

        if (rules.hasOwnProperty('pattern')) {
            inputRules["pattern"] = validateRuleObject(rules, 'pattern', 'string');
        }
    }

    const configRegister = {
        disabled,
        ...inputRules,
        ...outputCfg,
        value: value ? value : '',
    }

    return <div className="relative flex-wrap items-stretch flex flex-col w-full text-left my-3  pt-5">
        {
            !hideLabel
            &&
            <label
                className="block uppercase text-gray-600 text-xs font-bold mb-2 absolute top-0 z-2"
                htmlFor={name}
            >
                {label} {errors[name]?.type === 'required' && <span className="text-red-500 text-sm text-right">*</span>}
            </label>
        }
        {
            leftIcon && <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-400 active:text-blueGray-500 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <FontAwesomeIcon icon={leftIcon} onClick={leftIconAction ? leftIconAction : () => {}}/>
            </span>
        }
        <input
            type={inputType}
            className={[
                "border-0 px-3 py-3 placeholder-blueGray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150",
                leftIcon ? 'pl-10' : '',
                rightIcon ? 'pr-10' : '',
                disabled ? "opacity-50" : ""
            ].join(" ")}
            placeholder={placeholder}
            {
            ...register(
                name,
                configRegister
            )
            }
        />
        {
            rightIcon && <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-400 active:text-blueGray-500 bg-transparent rounded text-base items-center justify-center w-8 pr-3 py-3 right-0">
                <FontAwesomeIcon icon={rightIcon} onClick={rightIconAction ? rightIconAction : () => {}}/>
            </span>
        }
        {errors[name]?.type === 'required' && <span className="text-red-500 text-sm text-right w-full mt-2">{rules?.required?.message ? rules.required.message : "Este campo es requerido"}.</span>}
        {errors[name]?.type === 'min' && <span className="text-red-500 text-sm text-right w-full mt-2">{rules?.min?.message ? rules.min.message : `El valor minimo permitido es ${rules.min.value}`}.</span>}
        {errors[name]?.type === 'max' && <span className="text-red-500 text-sm text-right w-full mt-2">{rules?.max?.message ? rules.max.message : `El valor máximo permitido es ${rules.max.value}`}.</span>}
        {errors[name]?.type === 'minLength' && <span className="text-red-500 text-sm text-right w-full mt-2">{rules?.minLength?.message ? rules.minLength.message : "No cumple la longitud minima requerida para este campo"}.</span>}
        {errors[name]?.type === 'maxLength' && <span className="text-red-500 text-sm text-right w-full mt-2">{rules?.maxLength?.message ? rules.maxLength.message : `El numero máximo de caracteres debe ser de ${rules?.maxLength?.value}`}.</span>}
        {errors[name]?.type === 'pattern' && <span className="text-red-500 text-sm text-right w-full mt-2">{rules?.pattern?.message ? rules.pattern.message : "El valor ingresado no es valido, verifiquelo por favor"}.</span>}
    </div>
}

const InputSearch = (props: any) => {
    const {onSearch} = props
    return <Input leftIcon={faSearch} leftIconAction={onSearch} type="text" {...props} />
}

const InputPassword = (props: any) => {
    const [visible, setVisible] = useState(false)
    const toggle = () => {
        setVisible(prevState => {
            return !prevState
        })
    }
    //TODO: (optional) Add a bar with an indicator to level of security password entered
    return <Input leftIcon={faLock} rightIcon={visible ? faEye : faEyeSlash} rightIconAction={toggle} type={visible ? "text" : "password"} {...props} />
}

const InputText = (props: any) => {
    return <Input type="text" {...props} />
}

const InputNumber = (props: any) => {
    return <Input type="number" {...props} />
}

const InputDate = (props: any) => {
    return <Input type="date" {...props} />
}

const InputDatetime = (props: any) => {
    return <Input type="datetime-local" {...props} />
}

const InputFile = (props: any) => {
    //TODO: create component to upload files with drag and drop option
    return <Input type="file" {...props} />
}

//TODO: input year, month, email, color, telephone, url, time

export {
    Input,
    InputDate,
    InputDatetime,
    InputFile,
    InputNumber,
    InputText,
    InputPassword,
    InputSearch
}

export default Input;