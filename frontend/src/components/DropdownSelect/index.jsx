import './style.scss'
import {useState} from 'react';

export const DropdownSelect = (props) => {
    const {array} = props;
    const [value, setValue] = useState("Select One");
    const [open, setOpen] = useState(false)

    const onOptionClicked = (string) => {
        setValue(string);
    }

    const onButton = () => {
        setOpen((prevOpen) => !prevOpen);
    }
    return (
        <div className='wrapper'>
            <div className='button' onClick={() => {onButton()}}>{value}</div>
            {open &&<div className='content'>
                {array && array.map((string) => (
                   <div onClick={() => {onOptionClicked(string)}} key={string}>{string}</div> 
                ))}
            </div>}
        </div>
    )
}