import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import "./style.css"

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

const InputRadio = (props: any) => {
    const {
        disabled,
        formState,
        hideLabel,
        label,
        name,
        options,
        position,
        register,
        rules,
        watcher,
        value
    } = props;
    
    const currentValue = watcher(name)

    const { errors } = formState;
    const outputCfg: any = {};
    const inputRules: any = {};

    if (rules) {
        if (rules.hasOwnProperty('required')) {
            inputRules["required"] = validateRuleObject(rules, 'required', 'boolean', false);
        }
    }

    const configRegister = {
        disabled,
        ...inputRules,
        ...outputCfg,
        value: value ? value : '',
    }
    
    return <div className="flex flex-wrap flex-col justify-center items-start my-2">
        {
            !hideLabel && label && <label htmlFor={name} className="text-gray-600 font-bold text-xs uppercase mr-2 select-none cursor-pointer">{label}</label>
        }
        <div className={[
            "flex flex-wrap",
            position && position === "columns" ?"flex-col" : "flex-row",
            "items-start justify-center p-0 m-0 tailwind-radio w-full pl-6",
            disabled ?  "disabled" : ""
        ].join(" ")}>
            {
                options && options.map((item: any, key: number) => {
                    return <div className="radio-option mr-4" key={key}>
                        <label htmlFor={name+"-"+key} className="text-gray-500 text-sm mr-2 capitalize select-none cursor-pointer">{item.label}</label>
                        <input className="" key={key} type="radio" value={item.value} name={name} id={name+"-"+key} {
                            ...register(
                                name
                            )
                        }/>
                        <span className="checkmark"></span>
                    </div>
                })
            }
        </div>
    </div>
}

export {
    InputRadio
}