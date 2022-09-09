import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Submit } from '../components/form/Button';
import InputTypes from '../components/form/enums/InputTypes';
import { InputDate, InputDatetime, InputNumber, InputPassword, InputSearch, InputText } from '../components/form/Input';
import InputComponentProps from '../components/form/interfaces/InputComponentProps';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { InputCheckbox } from '../components/form/InputCheckbox/Checkbox';
import { InputRadio } from '../components/form/InputRadio/Radio';
import InputSelect from '../components/form/InputSelect';
import { InputFile, InputFileDragNDrop } from '../components/form/InputFile';

const ReactHookFormPractice = (props: any) => {
    const [results, setResults] = useState('');
    const { formState, handleSubmit, register, watch, setValue, resetField } = useForm<any>({
        defaultValues: {
            nombre: 'rene',
            app: 'corona',
            apm: 'valdes'
        }
    });

    // const formObject: Array<InputComponentProps> = [
    //     {
    //         name: 'nombre',
    //         label: 'Nombre',
    //         placeholder: 'Ingresa el nombre completo sin apellidos',
    //         rules: {
    //             required: {
    //                 value: true,
    //                 message: "El nombre es obligatorio"
    //             },
    //             maxLength: 10,
    //             minLength: 3
    //         }
    //     },
    //     {
    //         name: 'app',
    //         label: 'Apellido paterno',
    //         placeholder: 'Apellido materno',
    //     },
    //     {
    //         name: 'apm',
    //         label: 'Apellido materno',
    //         placeholder: 'Apellido paterno',
    //         rules: {
    //             required: true,
    //             maxLength: {
    //                 value: 10,
    //                 message: "La longitud maxima permitida para este campo es de 10 caracteres.",
    //             },
    //             minLength: {
    //                 value: 3,
    //                 message: "La longitud minima permitida para este campo es de 3 caracteres.",
    //             }
    //         }
    //     },
    //     {
    //         name: 'edad',
    //         label: 'Edad',
    //         placeholder: 'Edad en años',
    //         type: InputTypes.number,
    //         value: 33,
    //         rules: {
    //             required: true,
    //             maxLength: 10,
    //             minLength: 2
    //         }
    //     }
    // ]

    const enviarDatos = (data: any) => {
        const tmp = JSON.stringify(data, undefined, 4);
        console.log('mis datos', data, tmp)
        setResults(tmp)
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         setValue('nombre', 'ranaman')
    //         setFocus('nombre')
    //     }, 500);
    // }, [])

    // console.log(watch("nombre"), errors)

    const dataset = [
        {
            label: 'convenio', value: "conv"
        },
        {
            label: 'contrato', value: "contract"
        },
        {
            label: 'ninguno', value: "none"
        }
    ];


    return <form className="flex flex-row justify-start items-center w-full" style={{ backgroundColor: "#e1e8f0" }} onSubmit={handleSubmit(enviarDatos)}>
        <div className="flex flex-col w-2/4 p-4" >

            {/* {
                formObject.map((item: InputComponentProps, key: number) =>
                    <Input
                        formState={formState}
                        key={key}
                        label={item.label}
                        name={item.name}
                        placeholder={item.placeholder}
                        register={register}
                        rules={item.rules}
                        type={item.type}
                        value={item.value}
                    />
                )
            } */}

            {/* <InputSearch
                formState={formState}
                hideLabel
                label="Search"
                name="search"
                onSearch={() => { alert('Search') }}
                placeholder="Ingresa tu consulta"
                register={register}
                rules={{ required: true }}
                searchButtonPosition="right"
            />

            <InputText
                formState={formState}
                label="Nombre completo"
                leftIcon={faUser}
                name="nombre"
                placeholder="Ingresa tu nombre sin apellidos"
                register={register}
                rules={{ required: true }} />

            <InputPassword
                helperIndicator="bar"
                minLenght={10}
                formState={formState}
                label="Contraseña"
                name="password"
                placeholder="Ingresa tu nueva contraseña"
                register={register}
                rules={{ required: true }}
                watcher={watch}
            />

            <InputNumber
                formState={formState}
                label="Edad"
                name="edad"
                placeholder="Ingresa tu edad"
                register={register}
                rules={{ required: true }} />

            <InputDate
                formState={formState}
                label="Fecha de nacimiento"
                name="fnacimiento"
                placeholder="Ingresa tu fecha de nacimiento"
                register={register}
                rules={{ required: true }} />

            <InputDatetime
                formState={formState}
                label="Fecha de registro"
                name="fregistro"
                placeholder="Ingresa tu fecha de registro con hora"
                register={register} />
            <Submit label="Registrar" /> */}

            <InputCheckbox
                formState={formState}
                label="Recordar password"
                name="remember"
                register={register}
                watcher={watch}
            />

            <InputRadio
                formState={formState}
                label="Tipo de contrato"
                name="contracttype"
                options={dataset}
                // position="columns"
                register={register}
                watcher={watch}
            />

            <InputSelect
                formState={formState}
                label="Tipo de subcontrato"
                name="subcontract"
                options={dataset}
                register={register}
                watcher={watch}
            />

            {/* <InputFile
                formState={formState}
                errorTrigger={() => { alert("Por favor seleccione almenos un archivo valido") }}
                label="Comprobante PDF"
                name="comprobante"
                register={register}
                watcher={watch}
                reset={resetField}
                setValue={setValue}
                rules={{ required: true }}
                type="pdf"
                // multiple
            /> */}

            <InputFileDragNDrop
                formState={formState}
                label="Comprobante Secundario"
                name="comprobantesecundario"
                register={register}
                watcher={watch}
            />
        </div>
        <div className="w-2/4 p-4">
            <textarea className="text-black p-2 text-sm w-full min-h-full" value={results} readOnly />
        </div>
    </form>
}

export default ReactHookFormPractice;