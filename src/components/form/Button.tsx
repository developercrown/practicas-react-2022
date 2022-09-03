import React from 'react';

const Submit = (props: any) => {
    const { disabled, label }: { disabled: boolean, label: string } = props;
    return <input className="bg-green-600 my-4 px-4 rounded-full text-slate-200 shadow-sm text-md" type="submit" value={label} disabled={disabled} />
}

const ButtonCopiable = (props: any) => {
    //TODO: create a buton with a value, when user touch it the value is sent to clipboard, when this process has been completed, the component send a trigger event to inform than the content has been copied in clipboard.
}

export {
    Submit
}