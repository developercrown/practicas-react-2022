import React, { useState } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';


const Input = (props: any) => {
    const { label, name, required, register, type }: { label: string, name: string, required: boolean, register: UseFormRegister<any>, type: 'text' } = props;

    return <div className="my-2">
        <input type={type} className="text-black p-2" {...register(name, { required })} />
    </div>
}

const Submit = (props: any) => {
    const { disabled, label }: { disabled: boolean, label: string } = props;
    return <input className="bg-green-600 my-4 px-4 rounded-full text-slate-200 shadow-sm text-md" type="submit" value={label} disabled={disabled} />
}

const ReactHookFormPractice = (props: any) => {
    const [results, setResults] = useState('');
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const formObject = [
        {
            name: 'nombre',
            label: 'Nombre de usuario',
            required: true
        },
        {
            name: 'app',
            label: 'Apellido paterno'
        },
        {
            name: 'apm',
            label: 'Apellido materno'
        }
    ]

    const enviarDatos = (data: any) => {
        const tmp = JSON.stringify(data, undefined, 4);
        console.log('mis datos', tmp)
        setResults(tmp)
    }

    console.log(watch("nombre"), errors)

    return <div>
        <form  className="flex flex-col" onSubmit={handleSubmit(enviarDatos)}>

            {
                formObject.map((item, key) => <Input key={key} name={item.name} label={item.label} register={register} required={item.required} />)
            }

            {/* <Input {...register('apellido')}/> */}

            {errors?.nombre?.type == 'required' && <span className="text-red-500 text-xl">El campo nombre es requerido</span>}

            <Submit label="Registrar"/>
        </form>
        <div className="w-full h-40 bg-slate-800">
            <textarea className="text-black p-2 text-sm w-full min-h-full" value={results} readOnly/>
        </div>
    </div>
}

export default ReactHookFormPractice;