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

const InputCheckbox = (props: any) => {
    const {
        disabled,
        formState,
        hideLabel,
        label,
        name,
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
    
    return <div className="flex flex-row justify-start items-center my-2">
        {
            !hideLabel && label && <label htmlFor={name} className="text-gray-600 text-xs uppercase font-bold mr-2 select-none cursor-pointer">{label}</label>
        }
        <div className={[
            "flex items-center justify-center h-6 w-6 text-center p-0 m-0 tailwind-checkbox",
            currentValue === true ?  "checked" : "",
            disabled ?  "disabled" : ""
        ].join(" ")}>
            {
                currentValue === true && <FontAwesomeIcon icon={faCheck} className="text-white h-5 w-5 absolute m-auto z-0"/>
            }
            <input
                id={name}
                name={name}
                type="checkbox"
                className={[
                    "h-6 w-6 shrink-0 cursor-pointer z-2 ",
                    currentValue === true ?  "" : ""
                ].join(" ")}
                {
                    ...register(
                        name,
                        configRegister
                    )
                }
                style={{
                    appearance: "none",
                    borderWidth: "1px"
                }}
                />
        </div>
    </div>
}

export {
    InputCheckbox
}