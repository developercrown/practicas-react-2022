import InputTypes from '../enums/InputTypes';
import RulesObject from './RulesObject';

interface InputComponentProps {
    name?: string
    label?: string
    placeholder?: string
    rules?: RulesObject
    type?: InputTypes
    value?: any
}

export default InputComponentProps