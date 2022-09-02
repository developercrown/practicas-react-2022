import React from 'react';
import InputTypes from './enums/InputTypes';
import InputProperties from './interfaces/InputProperties';

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
        label,
        name,
        placeholder,
        register,
        rules,
        type,
        value
    }: InputProperties = props;
    

    const { errors } = formState;

    const inputType: string = InputTypes[type] ? InputTypes[type] : InputTypes['text'];

    console.log('test', name, InputTypes[type]);

    const outputCfg: any = {};

    if (type === InputTypes.number) {
        outputCfg["valueAsNumber"] = true;
    }

    if (type === InputTypes.date) {
        outputCfg["valueADate"] = true;
    }

    const inputRules: any = {};

    if(rules){
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

    return <div className="flex flex-col w-full text-left my-3">
        <label
            className="block uppercase text-gray-600 text-xs font-bold mb-2"
            htmlFor={name}
        >
            {label} {errors[name]?.type === 'required' && <span className="text-red-500 text-sm text-right">*</span>}
        </label>
        <input
            type={inputType}
            className={[
                "border-0 px-3 py-3 placeholder-blueGray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150",
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
        {errors[name]?.type === 'required' && <span className="text-red-500 text-sm text-right w-full mt-2">{rules?.required?.message ? rules.required.message : "Este campo es requerido"}.</span>}
        {errors[name]?.type === 'min' && <span className="text-red-500 text-sm text-right w-full mt-2">{rules?.min?.message ? rules.min.message : `El valor minimo permitido es ${rules.min.value}`}.</span>}
        {errors[name]?.type === 'max' && <span className="text-red-500 text-sm text-right w-full mt-2">{rules?.max?.message ? rules.max.message : `El valor máximo permitido es ${rules.max.value}`}.</span>}
        {errors[name]?.type === 'minLength' && <span className="text-red-500 text-sm text-right w-full mt-2">{rules?.minLength?.message ? rules.minLength.message : "No cumple la longitud minima requerida para este campo"}.</span>}
        {errors[name]?.type === 'maxLength' && <span className="text-red-500 text-sm text-right w-full mt-2">{rules?.maxLength?.message ? rules.maxLength.message : `El numero máximo de caracteres debe ser de ${rules?.maxLength?.value}`}.</span>}
        {errors[name]?.type === 'pattern' && <span className="text-red-500 text-sm text-right w-full mt-2">{rules?.pattern?.message ? rules.pattern.message : "El valor ingresado no es valido, verifiquelo por favor"}.</span>}
    </div>
}

const InputPassword = (props: any) => {
    //TODO: add icon to toggle
    return <Input type="password" {...props}/>
}

const InputText = (props: any) => {
    return <Input type="text" {...props}/>
}

const InputNumber = (props: any) => {
    return <Input type="number" {...props}/>
}

const InputDate = (props: any) => {
    return <Input type="date" {...props}/>
}

const InputDatetime = (props: any) => {
    return <Input type="datetime-local" {...props}/>
}

//TODO: input year, month, email, color, telephone, url, time

export {
    Input,
    InputText,
    InputPassword,
    InputNumber,
    InputDate,
    InputDatetime
}

export default Input;