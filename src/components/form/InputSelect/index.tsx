import React from 'react';

const InputSelect = (props: any) => {
    const {
        disabled,
        hideLabel,
        label,
        name,
        options,
        position,
        register,
        value
    } = props;

    const configRegister = {
        disabled,
        value: value ? value : '',
    }

    return <div className={[
        "flex flex-wrap justify-start items-start my-2",
            position && position === "columns" ?"flex-col" : "flex-row"
        ].join(" ")}>
        {
            !hideLabel && label && <label htmlFor={name} className="text-gray-600 text-xs uppercase font-bold mr-2 select-none cursor-pointer mb-3">{label}</label>
        }
        <select
            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-4 text-sm font-medium capitalize text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-0"
            {
                ...register(
                    name,
                    configRegister
                )
            }
        >
            {
                options && options.map((item: any, key: number) => {
                    return <option className="text-gray-600" value={item.value} key={key}>{item.label}</option>
                })
            }
        </select>
    </div>
}

export default InputSelect;