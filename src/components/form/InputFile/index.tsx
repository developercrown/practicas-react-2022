import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCloudArrowDown, faCloudArrowUp, faDownLong, faFile, faFileArrowUp, faFileAudio, faFileCsv, faFileExcel, faFileImage, faFileLines, faFilePdf, faFilePowerpoint, faFileVideo, faFileWord, faFileZipper, faLaptop, faTrash } from '@fortawesome/free-solid-svg-icons'
import "./style.css";

const inputTypesObject: any = {
    audio: 'audio/mp3,audio/wav,audio/raw,audio/ogg',
    csv: 'text/csv',
    video: 'video/mp4,video/avi,video/mpg,video/mpeg',
    image: 'image/jpg,image/jpeg,image/gif,image/svg,image/svg+xml,image/png',
    text: 'text/plain',
    word: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    excel: 'text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel.sheet.macroEnabled.12',
    powerpoint: 'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation',
    rar: 'application/x-rar-compressed',
    zip: 'application/zip',
    json: 'application/json',
    pdf: 'application/pdf',
    xml: 'application/xml'
}

const formatBytes = (bytes: any, decimals: number = 2) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const trimFilename = (name: string, limit: number = 15) => {
    let filenameTmp = name.split('.');
    const extension = filenameTmp[filenameTmp.length - 1];
    let filename = filenameTmp.slice(0, filenameTmp.length - 1).join(" ");
    if (filename.length >= limit) {
        filename = (filename.split("")).splice(0, limit).join("") + "...";
    }
    return {
        filename,
        extension
    }
}

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

const rejectClick = (event: any) => {
    event.preventDefault();
}


const allowClick = (event: any) => {
    event.stopPropagation();
    return true
}



const InputFile = (props: any) => {
    //TODO: max file size available

    const {
        disabled,
        errorTrigger,
        formState,
        hideLabel,
        itemsRemovables,
        label,
        multiple,
        name,
        placeholder,
        register,
        setValue,
        reset,
        rules,
        type,
        watcher,
    }: any = props;

    const { errors } = formState;
    const currentValue = watcher(name);
    const inputRules: any = {};

    const [isEmpty, setIsEmpty] = useState<boolean>(true);
    const [acceptedFileTypes, setAcceptedFileTypes] = useState<string>("*")
    const [enteredFiles, setEnteredFiles] = useState<any[]>([])


    useEffect(() => {
        if (!type) {
            setAcceptedFileTypes('*');
        } else {
            switch (type) {
                case 'audio':
                case 'video':
                case 'image':
                case 'text':
                case 'word':
                case 'excel':
                case 'powerpoint':
                case 'rar':
                case 'zip':
                case 'json':
                case 'pdf':
                case 'xml':
                    setAcceptedFileTypes(inputTypesObject[type]);
                    break;
                default:
                    setAcceptedFileTypes(type);
                    break;
            }
        }
    }, [type]);

    useEffect(() => {
        if (currentValue) {
            if (currentValue.length >= 1) {
                let newFileListObject = new DataTransfer();

                for (let index = 0; index < currentValue.length; index++) {
                    const element = currentValue[index];
                    if (element.type === acceptedFileTypes || acceptedFileTypes == "*") {
                        newFileListObject.items.add(element);
                    }
                }
                const tmp = Array.from(newFileListObject.files);

                if (tmp.length === 0 && errorTrigger) {
                    errorTrigger()
                }

                if (tmp.length === currentValue.length) {
                    setIsEmpty(!tmp ? true : tmp?.length === 0)
                    setEnteredFiles(tmp)
                    return
                }
                setValue(name, newFileListObject.files);
            } else {
                setEnteredFiles([])
                setIsEmpty(true)
            }
        } else {
            if (!isEmpty) {
                setIsEmpty(true)
            }
        }
    }, [currentValue]);

    if (rules) {
        if (rules.hasOwnProperty('required')) {
            inputRules["required"] = validateRuleObject(rules, 'required', 'boolean', false);
        }
    }

    const configRegister = {
        disabled,
        ...inputRules
    }

    const handleClear = (event: any) => {
        event.preventDefault();
        reset(name)
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

    return <div className={["relative flex-wrap items-stretch flex flex-col w-full text-left my-3 pt-5 overflow-hidden input-file-container shadow-sm"].join(" ")} onContextMenu={rejectClick}>
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
            <label htmlFor={name} className={[
                "w-full h-full flex flex-row",
                isEmpty ? "justify-center cursor-pointer" : "justify-start",
                "items-center"].join(" ")}>

                {
                    isEmpty ?
                        <div className={"file-input-menu-item"}>
                            <FontAwesomeIcon icon={faFileArrowUp} className="text-lg mr-2" /> Cargar archivos
                        </div>
                        :
                        <div className="text-left w-full flex flex-col" onClick={rejectClick}>

                            <div className="flex h-14 file-list-header border-b-2">

                                <div className="w-3/4 h-full flex justify-start items-center bg-white">
                                    <div className="file-input-menu-item flex flex-col justify-center items-center w-32 h-full border-b-2 border-blue-400">
                                        <FontAwesomeIcon icon={faLaptop} className="text-lg mb-1 text-blue-500" />
                                        <span className="block uppercase text-xs font-bold mb-0 z-2 text-blue-400" style={{ textShadow: 'rgba(0, 0, 0 , .1) 0px 1px 2px' }}>{enteredFiles && enteredFiles.length > 1 ? "Mis archivos" : "Mi archivo"}:</span>
                                    </div>
                                </div>

                                <div className=" w-1/4 h-full flex justify-end items-center cursor-pointer">

                                    <div className="menu-item flex flex-col justify-center items-center w-32 h-full bg-gray-100 text-gray-600  hover:text-red-500" onClick={handleClear}>
                                        <FontAwesomeIcon icon={faTrash} className="text-xl" />
                                        <span className="block uppercase text-xs font-bold mb-0 z-2" style={{ textShadow: 'rgba(0, 0, 0 , .1) 0px 1px 2px' }}>Limpiar</span>
                                    </div>
                                </div>
                            </div>

                            <ol className="px-4 py-2 w-full file-list-selected border-gray-300">
                                {
                                    enteredFiles && enteredFiles.length > 0 && enteredFiles.map((item: any, key: number) => {
                                        const file = trimFilename(item.name, 30);
                                        const filename = `${file.filename + "." + file.extension} - ${formatBytes(item.size)}`;

                                        return <li className="mt-1 flex justify-between items-center select-none file-list-selected-item hover:bg-gray-200 px-3 rounded py-2" key={key} onClick={rejectClick}>
                                            <div className="file-item flex justify-center items-center">
                                                <FontAwesomeIcon className="text-lg mr-2" icon={faFile} />
                                                <span className="text-gray-600 m-0 p-0">{filename}</span>
                                            </div>
                                            {
                                                itemsRemovables && <span className="ml-2 file-list-selected-delete text-red-700 font-bold flex flex-row justify-center items-center float-right" title="Eliminar archivo">
                                                    <FontAwesomeIcon className="text-lg" icon={faTrash} onClick={() => handleDeleteFileSelected(key)} />
                                                </span>
                                            }
                                        </li>
                                    })
                                }
                            </ol>
                        </div>
                }
            </label>
            <input
                accept={acceptedFileTypes}
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
    const {
        disabled,
        errorTrigger,
        hideLabel,
        label,
        multiple,
        name,
        type
    }: any = props;


    const [files, setFiles] = useState<Array<any>>([]);
    const [iconType, setIconType] = useState<any>(null);
    const [isEmpty, setIsEmpty] = useState<boolean>(true);
    const [isOver, setIsOver] = useState<boolean>(false);
    const [acceptedFileTypes, setAcceptedFileTypes] = useState<string>("*")
    const [enteredFiles, setEnteredFiles] = useState<any[]>([]);


    const handleClear = (event: any) => {
        event.preventDefault();
        setFiles([])
        setIsEmpty(true)
        setEnteredFiles([])
    }

    useEffect(() => {
        if (!type) {
            setAcceptedFileTypes('*');
        } else {
            switch (type) {
                case 'audio':
                case 'video':
                case 'image':
                case 'text':
                case 'word':
                case 'excel':
                case 'csv':
                case 'powerpoint':
                case 'rar':
                case 'zip':
                case 'json':
                case 'pdf':
                case 'xml':
                    setAcceptedFileTypes(inputTypesObject[type]);
                    break;
                default:
                    setAcceptedFileTypes(type);
                    break;
            }
        }
    }, [type]);

    useEffect(() => {
        if (!type) {
            setIconType(<FontAwesomeIcon className="text-lg mr-2" icon={faFile} />)
        } else {
            switch (type) {
                case 'audio':
                    setIconType(<FontAwesomeIcon className="text-3xl text-yellow-600 shadow-sm mr-2" icon={faFileAudio} />)
                    break;
                case 'video':
                    setIconType(<FontAwesomeIcon className="text-3xl text-blue-400 shadow-sm mr-2" icon={faFileVideo} />)
                    break;
                case 'image':
                    setIconType(<FontAwesomeIcon className="text-3xl text-orange-600 shadow-sm mr-2" icon={faFileImage} />)
                    break;
                case 'text':
                    setIconType(<FontAwesomeIcon className="text-3xl text-gray-400 shadow-sm mr-2" icon={faFileLines} />)
                    break;
                case 'word':
                    setIconType(<FontAwesomeIcon className="text-3xl text-blue-600 shadow-sm mr-2" icon={faFileWord} />)
                    break;
                case 'excel':
                    setIconType(<FontAwesomeIcon className="text-3xl text-green-600 shadow-sm mr-2" icon={faFileExcel} />)
                    break;
                case 'csv':
                    setIconType(<FontAwesomeIcon className="text-3xl text-green-600 shadow-sm mr-2" icon={faFileCsv} />)
                    break;
                case 'powerpoint':
                    setIconType(<FontAwesomeIcon className="text-3xl text-orange-600 shadow-sm mr-2" icon={faFilePowerpoint} />)
                    break;
                case 'rar':
                case 'zip':
                    setIconType(<FontAwesomeIcon className="text-3xl text-purple-600 shadow-sm mr-2" icon={faFileZipper} />)
                    break;
                case 'json':
                case 'pdf':
                    setIconType(<FontAwesomeIcon className="text-3xl text-red-600 shadow-sm mr-2" icon={faFilePdf} />)
                    break;
                case 'xml':
                default:
                    setIconType(<FontAwesomeIcon className="text-3xl mr-2" icon={faFile} />)
                    break;
            }
        }
    }, [type]);

    const validateFileInput = (data: any) => {
        let newFileListObject = new DataTransfer();
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if ((element.type === acceptedFileTypes || acceptedFileTypes == "*") && element.size > 0) {
                newFileListObject.items.add(element);
            }
        }
        const tmp = Array.from(newFileListObject.files);
        if (tmp.length === 0 && errorTrigger) {
            errorTrigger()
        }
        setIsEmpty(!tmp ? true : tmp?.length === 0)
        setEnteredFiles(tmp)
        setFiles(tmp);
    }

    const handleDeleteFileSelected = (index: number) => {
        let newFileListArray = Array.from(files);
        newFileListArray.splice(index, 1);
        validateFileInput(newFileListArray);
    }

    const handleChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            validateFileInput(event.target.files)
        }
    }

    const handleDragEnter = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        const { type } = event
        if (type === 'dragenter' || type === 'dragover') {
            if (!isOver) {
                setIsOver(true)
            }
        } else if (type == "dragleave") {
            if (isOver) {
                setIsOver(false)
            }
        }
    }

    const handleDrop = function (event: any) {
        event.preventDefault();
        event.stopPropagation();
        setIsOver(false);
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            validateFileInput(event.dataTransfer.files)
        }
    };

    return <div className={["relative flex-wrap items-stretch flex flex-col w-full text-left my-3 pt-5 overflow-hidden input-file-container shadow-sm select-none"].join(" ")} onContextMenu={rejectClick}>
        {
            !hideLabel
            &&
            <label
                className="block uppercase text-gray-600 text-xs font-bold mb-2 absolute top-0 z-2"
            >
                {label}
                {/* {errors[name]?.type === 'required' && <span className="text-red-500 text-sm text-right">*</span>} */}
            </label>
        }

        <div className={
            [
                "flex flex-row border-0 placeholder-blueGray-300 text-gray-600 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150 text-center hover:bg-gray-50 focus:outline-none focus:ring-0 cursor-pointer h-72 align-start justify-start"
            ].join(" ")
        }>
            <label
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter}
                onDragLeave={handleDragEnter}
                htmlFor={name}
                className={[
                    "w-full h-full flex flex-col",
                    "justify-start cursor-pointer",
                    "items-center"].join(" ")}>
                <div className="text-left w-full flex flex-col">
                    <div className="flex h-14 file-list-header border-b-2" onClick={rejectClick}>

                        <div className="w-2/4 h-full flex justify-start items-center bg-white">
                            <div className="file-input-menu-item flex flex-col justify-center items-center w-28 h-full border-b-2 border-blue-400">
                                <FontAwesomeIcon icon={faLaptop} className="text-lg mb-1 text-blue-500" />
                                <span className="block uppercase text-xs font-bold mb-0 z-2 text-blue-400" style={{ textShadow: 'rgba(0, 0, 0 , .1) 0px 1px 2px' }}>{enteredFiles && enteredFiles.length > 1 ? "Mis archivos" : "Mi archivo"}:</span>
                            </div>
                        </div>

                        <div className=" w-full h-full flex justify-center items-center cursor-pointer">
                            <div className="menu-item flex flex-col justify-center items-center w-full h-full bg-gray-100 text-gray-600" onClick={rejectClick}>
                                <span className="block uppercase text-xs font-bold mb-0 z-2" style={{ textShadow: 'rgba(0, 0, 0 , .1) 0px 1px 2px' }}>Tipo: <span className="text-blue-600">{type}</span></span>
                            </div>
                        </div>

                        <div className=" w-1/4 h-full flex justify-end items-center cursor-pointer">
                            <div className="menu-item flex flex-col justify-center items-center w-32 h-full bg-gray-100 text-gray-600  hover:text-red-500" onClick={handleClear}>
                                <FontAwesomeIcon icon={faTrash} className="text-xl" />
                                <span className="block uppercase text-xs font-bold mb-0 z-2" style={{ textShadow: 'rgba(0, 0, 0 , .1) 0px 1px 2px' }}>Limpiar</span>
                            </div>
                        </div>

                    </div>
                    <div className="file-container w-full h-56 p-4" onClick={rejectClick}>
                        {
                            isEmpty ? <div className={[
                                "file-container-wrapper empty h-52 border-2 border-blue-500 border-dashed flex flex-row flex-wrap justify-center items-center",
                                isOver ? "file-container-drop-zone-over" : ""
                            ].join(" ")}
                                onDrop={handleDrop}
                                onClick={allowClick}
                                onDoubleClick={rejectClick}
                            >
                                <div
                                    className={
                                        [
                                            "file-container-drop-zone flex flex-col flex-wrap justify-center items-center w-full h-full z-2",
                                        ].join(" ")
                                    }
                                >
                                    {
                                        !isOver ?
                                            <div className="bg-sred-600 flex flex-col flex-wrap justify-center content-center w-full h-full z-2">
                                                <FontAwesomeIcon icon={faCloudArrowUp} className="text-gray-300 icon" style={{ fontSize: "5rem" }} />
                                                <h2 className="text-md text-gray-600 mt-2 text-center">Arrastra y suelta tus archivos aqui <br /> <span className="font-bold">O</span> <br />Haz clic aquí para seleccionar tus archivos</h2>
                                            </div>
                                            :
                                            <div
                                                className="flex flex-col justify-center items-center content-center w-full h-full z-2"

                                            >
                                                <div className="front w-full h-full top-0 block absolute z-10">

                                                </div>
                                                <div
                                                    className="flex flex-col justify-center items-center z-2"

                                                >
                                                    <FontAwesomeIcon icon={faDownLong} className="text-gray-500 icon icon-over absolute m-0 p-0" style={{ fontSize: "3rem" }} />
                                                    <FontAwesomeIcon icon={faCloud} className="text-gray-300 icon" style={{ fontSize: "5rem" }} />
                                                </div>
                                                <h2 className="text-md text-gray-600 mt-2 text-center font-bold text-sm icon-over">Suelta tus archivos aquí</h2>
                                            </div>
                                    }

                                </div>
                            </div>
                                :
                                <div
                                    className={[
                                        "file-container-wrapper h-52 border-2 border-blue-500 border-dashed flex flex-col flex-wrap justify-start items-center overflow-auto",
                                        isOver ? "file-container-drop-zone-over" : ""
                                    ].join(" ")}
                                    onDragEnter={handleDragEnter}
                                    onDragOver={handleDragEnter}
                                    onDragLeave={handleDragEnter}
                                    onDrop={handleDrop}
                                >
                                    <ol className="px-4 py-2 w-full file-list-selected border-gray-300 flex flex-col items-center justify-center">
                                        {
                                            enteredFiles && enteredFiles.length > 0 && enteredFiles.map((item: any, key: number) => {
                                                const file = trimFilename(item.name, 30);
                                                const filename = `${file.filename + "." + file.extension}`;
                                                return <li className="mt-1 flex justify-between items-center select-none file-list-selected-item hover:bg-gray-200 px-3 rounded py-2 w-full" key={key} onClick={rejectClick}>
                                                    <div className="file-item flex justify-center items-center text-xs lg:text-sm">
                                                        {iconType}
                                                        <p className="flex flex-col text-gray-600 m-0 p-0">
                                                            <span>{filename}</span>
                                                            <span>{formatBytes(item.size)}</span>
                                                        </p>
                                                    </div>
                                                    {
                                                        <span className="ml-2 file-list-selected-delete text-red-700 font-bold flex flex-row justify-center items-center float-right" title="Eliminar archivo">
                                                            <FontAwesomeIcon className="text-lg" icon={faTrash} onClick={() => handleDeleteFileSelected(key)} />
                                                        </span>
                                                    }
                                                </li>
                                            })
                                        }
                                    </ol>
                                </div>
                        }
                    </div>
                </div>
            </label>
            <input
                accept={acceptedFileTypes}
                type="file"
                id={name}
                multiple={multiple ? true : false}
                onChange={handleChange}
                className={[
                    "opacity-0 -z-2 absolute",
                    disabled ? "opacity-50" : ""
                ].join(" ")}
            />
        </div>
    </div>
}

export {
    InputFile,
    InputFileDragNDrop
}