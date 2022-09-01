import React, { useState } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';

enum InputTypes {
    "text",
    "number",
    "color",
    "date",
    "datetime",
    "email",
    "month",
    "password",
    "search",
    "tel", //Create special component
    "time",
    "url",
    "week"
}

const Input = (props: any) => {
    const {
        formState,
        label,
        name,
        placeholder,
        register,
        rules,
        type
    }:
    {
        formState: any,
        label: string,
        name: string,
        placeholder: string,
        required: boolean,
        register: UseFormRegister<any>,
        rules: any,
        type: InputTypes
    } = props;

    const { errors } = formState;

    const inputType = InputTypes[type] ? InputTypes[type] : InputTypes[0];

    const outputCfg: any = {};

    if(type===InputTypes.number){
        outputCfg["valueAsNumber"] = true;
    }


    const configRegister = {
        required: rules && rules.required,
        min: rules && rules.min,
        max: rules && rules.max,
        minLength:  rules?.minLength,
        maxLength: rules && rules.maxLength,
        pattern: rules && rules.pattern,
        ...outputCfg
    }

    console.log("config register", configRegister);
    

    return <div className="flex flex-col w-full text-left my-3">
        <label
            className="block uppercase text-gray-600 text-xs font-bold mb-2"
            htmlFor={name}
        >
            {label} {errors[name]?.type === 'required' && <span className="text-red-500 text-sm text-right">*</span>}
        </label>
        <input
            type={inputType}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder={placeholder}
            {
                ...register(
                    name,
                    configRegister
                )
            }
        />
        { errors[name]?.type === 'required' && <span className="text-red-500 text-sm text-right w-full mt-2">{rules?.required?.message ? rules.required.message : "Este campo es requerido"}.</span> }
        { errors[name]?.type === 'min' && <span className="text-red-500 text-sm text-right w-full mt-2">{rules?.min?.message ? rules.min.message : "Debe cumplir el valor numérico minimo admitido para este campo"}.</span> }
        { errors[name]?.type === 'max' && <span className="text-red-500 text-sm text-right w-full mt-2">{rules?.max?.message ? rules.max.message : "Debe cumplir el valor numerico máximo admitido para este campo"}.</span> }
        { errors[name]?.type === 'minLength' && <span className="text-red-500 text-sm text-right w-full mt-2">{rules?.minLength?.message ? rules.minLength.message : "No cumple la longitud minima requerida para este campo"}.</span> }
        { errors[name]?.type === 'maxLength' && <span className="text-red-500 text-sm text-right w-full mt-2">{rules?.maxLength?.message ? rules.maxLength.message : "No cumple la longitud maxima permitida para este campo"}.</span> }
        { errors[name]?.type === 'pattern' && <span className="text-red-500 text-sm text-right w-full mt-2">{rules?.pattern?.message ? rules.pattern.message : "El valor ingresado no es valido, verifiquelo por favor"}.</span> }
    </div>
}

const Submit = (props: any) => {
    const { disabled, label }: { disabled: boolean, label: string } = props;
    return <input className="bg-green-600 my-4 px-4 rounded-full text-slate-200 shadow-sm text-md" type="submit" value={label} disabled={disabled} />
}

const ReactHookFormPractice = (props: any) => {
    const [results, setResults] = useState('');
    const { register, handleSubmit, formState } = useForm();

    const formObject = [
        {
            name: 'nombre',
            label: 'Nombre',
            placeholder: 'Ingresa el nombre completo sin apellidos',
            rules: {
                required: {
                    value: true,
                    message: "El nombre es obligatorio"
                },
                minLenght: {
                    value: 10,
                    message: "La longitud minima para este campo es de 10 caracteres.",
                }
            }
        },
        {
            name: 'app',
            label: 'Apellido paterno',
            placeholder: 'Apellido materno',
        },
        {
            name: 'apm',
            label: 'Apellido materno',
            placeholder: 'Apellido paterno',
        },
        {
            name: 'edad',
            label: 'Edad',
            placeholder: 'Edad en años',
            type: InputTypes.number
        }
    ]

    const enviarDatos = (data: any) => {
        const tmp = JSON.stringify(data, undefined, 4);
        console.log('mis datos', tmp)
        setResults(tmp)
    }

    // console.log(watch("nombre"), errors)

    return <div className="flex flex-col justify-start items-center w-2/4" style={{backgroundColor: "#e1e8f0"}}>
        <form className="flex flex-col w-3/4" onSubmit={handleSubmit(enviarDatos)}>

            {
                formObject.map((item, key) => 
                    <Input
                        formState={formState}
                        key={key}
                        label={item.label}
                        name={item.name}
                        placeholder={item.placeholder}
                        register={register}
                        rules={item.rules}
                        type={item.type}
                        />
                )
            }

            <Submit label="Registrar" />
        </form>
        <div className="w-3/4 h-40 bg-slate-800 mt-5">
            <textarea className="text-black p-2 text-sm w-full min-h-full" value={results} readOnly />
        </div>
    </div>
}

export default ReactHookFormPractice;