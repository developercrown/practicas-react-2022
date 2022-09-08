import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFileArrowUp, faTrash, faXmark  } from '@fortawesome/free-solid-svg-icons'
import "./style.css";

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

const InputFile = (props: any) => {
    //TODO: add accept types
    //TODO: add size specifications
    //TODO: add in animation

    const {
        disabled,
        formState,
        hideLabel,
        label,
        multiple,
        name,
        placeholder,
        register,
        setValue,
        reset,
        rules,
        watcher,
    }: any = props;

    const { errors } = formState;

    const currentValue = watcher(name);

    const isEmpty = !currentValue ? true : currentValue?.length === 0

    let enteredFiles: any = [];

    const inputRules: any = {};

    if(currentValue){
        if(currentValue.length >= 1){
            enteredFiles = Array.from(currentValue);
        } else {
            enteredFiles = [];
        } 
    }

    if (rules) {
        if (rules.hasOwnProperty('required')) {
            inputRules["required"] = validateRuleObject(rules, 'required', 'boolean', false);
        }
    }

    const configRegister = {
        disabled,
        ...inputRules
    }

    const handleClear  = (event: any) => {
        event.preventDefault();
        reset(name)
    }

    const rejectClick  = (event: any) => {
        event.preventDefault();
    }

    const handleDeleteFileSelected = (index: number) => {
        let newFileListArray = Array.from(currentValue);
        newFileListArray.splice(index, 1);

        let newFileListObject = new DataTransfer();

        newFileListArray.forEach((element: any) => {
            newFileListObject.items.add(element);
        });

        setValue(name, newFileListObject.files);
        
    }
    
    return <div className="relative flex-wrap items-stretch flex flex-col w-full text-left my-3  pt-5">
        {
            !hideLabel
            &&
            <label
                className="block uppercase text-gray-600 text-xs font-bold mb-2 absolute top-0 z-2"
            >
                {label} {errors[name]?.type === 'required' && <span className="text-red-500 text-sm text-right">*</span>}
            </label>
        }

        <div className={
            [
                "flex flex-row border-0 placeholder-blueGray-300 text-gray-600 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150 text-center hover:bg-gray-50 focus:outline-none focus:ring-0 cursor-pointer",
                isEmpty ? "h-12" : ""
            ].join(" ")
        }>
            <label htmlFor={name} className={["w-full h-full flex flex-row", isEmpty ? "justify-center" : "justify-start", "items-center cursor-pointer"].join(" ")}>
                
                {
                    isEmpty ?
                    <>
                        <FontAwesomeIcon icon={faFileArrowUp} className="text-lg mr-2"/> Seleccionar el archivo ...
                    </>
                        :
                    <div className="text-left p-4 w-full flex flex-col">
                        <div className="flex h-8">
                            <div className="w-3/4 h-full flex justify-start items-center">
                                <span>Archivos Seleccionados:</span>
                            </div>
                            <div className=" w-1/4 h-full flex justify-end items-center cursor-pointer" onClick={handleClear}>
                                <FontAwesomeIcon icon={faTrash} className="text-xl"/>
                            </div>
                        </div>
                        <ol className="pl-4 mt-2 w-full file-list-selected">
                            {
                                enteredFiles && enteredFiles.length > 0 && enteredFiles.map((item: any, key: number) =>{
                                    return <li className="mt-1 flex justify-start items-center select-none file-list-selected-item hover:bg-gray-200 px-2 rounded py-1" key={key} onClick={rejectClick}>
                                        <FontAwesomeIcon className="text-lg mr-2" icon={faFile}/> {item.name} <span className="ml-2 file-list-selected-delete"><FontAwesomeIcon className="text-lg text-red-700 mt-1" icon={faXmark} onClick={() => handleDeleteFileSelected(key)}/></span>
                                    </li>
                                })
                            }
                        </ol>
                    </div>
                }
            </label>
            <input
                type="file"
                id={name}
                multiple={multiple ? "multiple" : null}
                className={[
                    "opacity-0 -z-2 absolute",
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
        </div>

        

        {errors[name]?.type === 'required' && <span className="text-red-500 font-bold text-sm text-right w-full mt-2">{rules?.required?.message ? rules.required.message : "Este campo es requerido"}.</span>}
    </div>
}

const InputFileDragNDrop = (props: any) => {
    return <div className="input-file">
        hola file dd
    </div>
}

export {
    InputFile,
    InputFileDragNDrop
}