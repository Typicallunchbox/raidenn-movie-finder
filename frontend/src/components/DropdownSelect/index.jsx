import './style.scss'
import {useState} from 'react';
import { FaArrowDown } from "react-icons/fa";


export const DropdownSelect = (props) => {
    const {placeholder, array} = props;
    const [value, setValue] = useState(placeholder);
    const [open, setOpen] = useState(false)

    const onOptionClicked = (string) => {
        setValue(string);
        props.onSelect(string);            
    }

    const onButton = () => {
        setOpen((prevOpen) => !prevOpen);
    }

    return (
        <div className='wrapper text-left'>
            <div className='flex relative'  onClick={() => {onButton()}}>
                <div className={`select ${value === placeholder ? 'text-neutral-400': 'text-slate-50'}`}>{value}</div>
                <p className='b-text-colour absolute right-4 top-2/4 -translate-y-2/4 hover:cursor-pointer '>
                            <FaArrowDown />
                </p>
            </div>

            {open &&<div className='content' onMouseLeave={() => setOpen(false)}>
                {array && array.map((string) => (
                   <div
                    onClick={() => {onOptionClicked(string); setOpen(false)}} 
                    key={string}>{string}
                   </div>
                ))}
            </div>}
        </div>
    )
}