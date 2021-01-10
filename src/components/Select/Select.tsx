import React, {useRef, useState} from 'react';
import useClickOutsideListenerRef from "../../hooks/useClickOutsideListenerRef";
import "./Select.sass";

interface SelectProps {
    value: string
    options: string[]
    handleChange?: (value: string) => any
    placeholder?: string
    name?: string
}

const Select = (props: SelectProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>(props.value ?? "");

    const ref = useClickOutsideListenerRef(() => setOpen(false));
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (newValue: string) => {
        setValue(newValue);
        setOpen(false);

        if (props.handleChange)
            props.handleChange(newValue);
    }

    return <div className={"select " + (open ? "opened" : "closed")} ref={ref}>
        <input
            placeholder={props.placeholder ?? ""}
            value={value}
            autoComplete={"off"}
            onClick={() => setOpen(!open)}
            name={props.name ?? ""}
            ref={inputRef}
            readOnly
        />
        {open && <div className="options">
            {props.options.map(o => <div
                className="option"
                key={o}
                onClick={() => handleChange(o)}
            >
                {o}
            </div>)}
        </div>}
    </div>;
};

export default Select;
