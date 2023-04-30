import './style.scss'
import {useState} from 'react';
import { FaArrowDown } from "react-icons/fa";


export const DropdownSelect = (props) => {
    const {placeholder, array} = props;
    const [value, setValue] = useState(props.value || placeholder);
    const [open, setOpen] = useState(false)

    const onOptionClicked = (item) => {
        setValue(item.name ? item.name : item);
        props.onSelect(item);            
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
                {array && array.map((item) => (
                   <div
                    onClick={() => {onOptionClicked(item); setOpen(false)}} 
                    key={item.id ? item.id : item }>{item.name ? item.name : item}
                   </div>
                ))}
            </div>}
        </div>
    )
}