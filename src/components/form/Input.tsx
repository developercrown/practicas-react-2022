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
        children,
        disabled,
        formState,
        hideLabel,
        label,
        leftIcon,
        leftIconAction,
        name,
        outlineColor,
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
                "border-0 px-3 py-3 placeholder-blueGray-300 text-gray-600 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150",
                outlineColor ? "focus:outline-none focus:ring ring-"+outlineColor+"-500" : "focus:outline-none focus:ring",
                leftIcon ? 'pl-10' : '',
                rightIcon ? 'pr-10' : '',
                children ? "mb-0" : "",
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
        {errors[name]?.type === 'required' && <span className="text-red-500 font-bold text-sm text-right w-full mt-2">{rules?.required?.message ? rules.required.message : "Este campo es requerido"}.</span>}
        {errors[name]?.type === 'min' && <span className="text-red-500 font-bold text-sm text-right w-full mt-2">{rules?.min?.message ? rules.min.message : `El valor minimo permitido es ${rules.min.value}`}.</span>}
        {errors[name]?.type === 'max' && <span className="text-red-500 font-bold text-sm text-right w-full mt-2">{rules?.max?.message ? rules.max.message : `El valor máximo permitido es ${rules.max.value}`}.</span>}
        {errors[name]?.type === 'minLength' && <span className="text-red-500 font-bold text-sm text-right w-full mt-2">{rules?.minLength?.message ? rules.minLength.message : "No cumple la longitud minima requerida para este campo"}.</span>}
        {errors[name]?.type === 'maxLength' && <span className="text-red-500 font-bold text-sm text-right w-full mt-2">{rules?.maxLength?.message ? rules.maxLength.message : `El numero máximo de caracteres debe ser de ${rules?.maxLength?.value}`}.</span>}
        {errors[name]?.type === 'pattern' && <span className="text-red-500 font-bold text-sm text-right w-full mt-2">{rules?.pattern?.message ? rules.pattern.message : "El valor ingresado no es valido, verifiquelo por favor"}.</span>}
        {
            children
        }
    </div>
}

const InputSearch = (props: any) => {
    const {onSearch, searchButtonPosition} = props
    if(searchButtonPosition && searchButtonPosition == "right"){
        return <Input rightIcon={faSearch} rightIconAction={onSearch} type="text" {...props} />
    }
    return <Input leftIcon={faSearch} leftIconAction={onSearch} type="text" {...props} />
}

const SecurityLevels = [
    [
        "bg-red-400",
        "w-0",
        "h-1",
    ].join(" "),
    [
        "bg-red-400",
        "w-1/3",
        "h-1",
    ].join(" "),
    [
        "bg-orange-400",
        "w-2/3",
        "h-1",
    ].join(" "),
    [
        "bg-green-500",
        "w-100",
        "h-1",
    ].join(" ")
]

const InputPassword = (props: any) => {
    const {name, helperIndicator, minLenght, watcher} = props
    const [visible, setVisible] = useState(false)
    const [levelSecurity, setLevelSecurity] = useState(0);
    const [levelSecurityMessage, setLevelSecurityMessage] = useState("");

    let currentLength = watcher(name);
    // currentLength = currentLength.length;

    const toggle = () => {
        setVisible(prevState => {
            return !prevState
        })
    }

    if(watcher && currentLength !== undefined && currentLength.length >= 1){
        if(minLenght){
            if (levelSecurity !== 0 && currentLength.length <= 0){
                setLevelSecurity(0)
                setLevelSecurityMessage("")
            } else if(levelSecurity !== 1 && currentLength.length < minLenght){
                setLevelSecurity(1)
                setLevelSecurityMessage("Incompleta")
            } else if(levelSecurity !== 3 && currentLength.length >= minLenght){
                setLevelSecurity(3)
                setLevelSecurityMessage("Correcto")
            }
        } else {
            if(levelSecurity !== 1 && currentLength.length <= 3){
                setLevelSecurity(1)
                if(helperIndicator === "bar"){
                    setLevelSecurityMessage("Incompleta")
                } else {
                    setLevelSecurityMessage("No cumple el tamaño minimo")
                }
                
            } else if(levelSecurity !== 2 && currentLength.length > 3 && currentLength.length < 6){
                setLevelSecurity(2)
                if(helperIndicator === "bar"){
                    setLevelSecurityMessage("Demasiado corta")
                } else {
                    setLevelSecurityMessage("Aún falta, sigue asi...")
                }
                
            } else if(levelSecurity !== 3 && currentLength.length > 6){
                setLevelSecurity(3)
                if(helperIndicator === "bar"){
                    setLevelSecurityMessage("Correcto")
                } else {
                    setLevelSecurityMessage("La contraseña es valida")
                }
                
            }
        }
    } else {
        if(levelSecurity !== 0 && currentLength.length === 0){
            setLevelSecurity(0)
            setLevelSecurityMessage("")
        }
    }

    let StatusBar = null;
    if(helperIndicator === "bar" && watcher){
        StatusBar = <div className="w-full mt-2 mb-3 flex flex-row justify-start items-center">
            <div className={[
                levelSecurity === 0 ? "bg-gray-0" : "bg-gray-300",
                "h-1 w-3/4"
            ].join(" ")}>
                <div className={
                    SecurityLevels[levelSecurity]
                }></div>
            </div>
            <span className={[
                "text-gray-500 text-xs ml-2",
                levelSecurity === 0 ? "opacity-0" : ""
            ].join(" ")}>{levelSecurityMessage + "."}</span>
        </div>;
    } else if(helperIndicator !== "bar" && watcher) {
        StatusBar = <div className="w-full mt-2 mb-3 flex flex-row justify-start items-center">
            <span className={[
                "text-gray-500 text-xs ml-2 font-bold",
                levelSecurity === 0 ? null : (levelSecurity === 1 ? "text-pink-600" : (levelSecurity === 2 ? "text-yellow-600" : (levelSecurity === 3 ? "text-green-600" : null)))
            ].join(" ")}>{levelSecurityMessage}</span>
        </div>;
    }

    return <Input outlineColor={levelSecurity === 0 ? null : (levelSecurity === 1 ? "pink" : (levelSecurity === 2 ? "yellow" : (levelSecurity === 3 ? "green" : null)))} children={StatusBar} leftIcon={faLock} rightIcon={visible ? faEye : faEyeSlash} rightIconAction={toggle} type={visible ? "text" : "password"} {...props} />
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